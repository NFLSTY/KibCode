"use client";

import { useState, useEffect, useCallback } from "react";
import type { StudentDTO, LoginStudentDTO, RegisterStudentDTO, UpdateOnboardingDTO } from "@kibcode/types";
import {
  api,
  getStoredToken,
  setStoredToken,
  getStoredRefreshToken,
  setStoredRefreshToken,
} from "@/lib/api-client";

export function useAuth() {
  const [student, setStudent] = useState<StudentDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    const savedToken = getStoredToken();
    const savedRefreshToken = getStoredRefreshToken();

    // 1. If we have a saved access token, try fetching profile
    if (savedToken) {
      try {
        setToken(savedToken);
        const res = await api.students.getMe();
        setStudent(res.student);
        setIsLoading(false);
        return;
      } catch {
        // Access token might be expired. Continue to try refresh token rotation below.
      }
    }

    // 2. If access token was missing or expired, attempt token rotation via persistent refresh token
    if (savedRefreshToken) {
      try {
        const res = await api.auth.refresh({ refreshToken: savedRefreshToken });
        setStoredToken(res.token);
        setToken(res.token);
        if (res.refreshToken) {
          setStoredRefreshToken(res.refreshToken);
        }
        setStudent(res.student);
        setIsLoading(false);
        return;
      } catch {
        // Refresh token failed (e.g., expired > 7 days, revoked, or device mismatch)
        setStoredToken(null);
        setStoredRefreshToken(null);
        setStudent(null);
        setToken(null);
      }
    } else {
      setStoredToken(null);
      setStudent(null);
      setToken(null);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const savedToken = getStoredToken();
      if (!savedToken) {
        if (isMounted) {
          setStudent(null);
          setToken(null);
          setIsLoading(false);
        }
        return;
      }
      try {
        if (isMounted) setToken(savedToken);
        const res = await api.students.getMe();
        if (isMounted) setStudent(res.student);
      } catch {
        if (isMounted) {
          setStoredToken(null);
          setStudent(null);
          setToken(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: LoginStudentDTO) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await api.auth.login(credentials);
      setStoredToken(res.token);
      setToken(res.token);
      setStudent(res.student);
      if (res.refreshToken) {
        setStoredRefreshToken(res.refreshToken);
      } else {
        setStoredRefreshToken(null);
      }
      return res.student;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal masuk. Periksa email dan kata sandi.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterStudentDTO) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await api.auth.register(data);
      setStoredToken(res.token);
      setToken(res.token);
      setStudent(res.student);
      setStoredRefreshToken(null);
      return res.student;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mendaftar. Silakan coba lagi.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (data: UpdateOnboardingDTO) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await api.students.updateOnboarding(data);
      setStudent(res.student);
      return res.student;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan data awal. Silakan coba lagi.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (allDevices: boolean = true) => {
    const savedRefreshToken = getStoredRefreshToken();
    try {
      await api.auth.logout({
        refreshToken: savedRefreshToken || undefined,
        allDevices,
      });
    } catch {
      // Invalidate locally regardless of network outcome
    } finally {
      setStoredToken(null);
      setStoredRefreshToken(null);
      setStudent(null);
      setToken(null);
    }
  };

  return {
    student,
    token,
    isLoading,
    error,
    login,
    register,
    completeOnboarding,
    logout,
    refreshProfile: fetchProfile,
  };
}
