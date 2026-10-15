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

// In-memory module-level session cache for instantaneous client navigation
let cachedStudent: StudentDTO | null = null;
let cachedToken: string | null = null;
let isSessionInitialized = false;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function useAuth() {
  const [student, setStudent] = useState<StudentDTO | null>(cachedStudent);
  const [token, setToken] = useState<string | null>(cachedToken);
  const [isLoading, setIsLoading] = useState<boolean>(!isSessionInitialized);
  const [error, setError] = useState<string | null>(null);

  // Sync with module-level cache
  useEffect(() => {
    const handleUpdate = () => {
      setStudent(cachedStudent);
      setToken(cachedToken);
      setIsLoading(!isSessionInitialized);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const fetchProfile = useCallback(async () => {
    const savedToken = getStoredToken();
    const savedRefreshToken = getStoredRefreshToken();

    // 1. If we have a saved access token, try fetching profile
    if (savedToken) {
      try {
        setToken(savedToken);
        cachedToken = savedToken;
        const res = await api.students.getMe();
        cachedStudent = res.student;
        isSessionInitialized = true;
        setStudent(res.student);
        setIsLoading(false);
        notifyListeners();
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
        cachedToken = res.token;
        setToken(res.token);
        if (res.refreshToken) {
          setStoredRefreshToken(res.refreshToken);
        }
        cachedStudent = res.student;
        isSessionInitialized = true;
        setStudent(res.student);
        setIsLoading(false);
        notifyListeners();
        return;
      } catch {
        // Refresh token failed (e.g., expired > 7 days, revoked, or device mismatch)
        setStoredToken(null);
        setStoredRefreshToken(null);
        cachedStudent = null;
        cachedToken = null;
        isSessionInitialized = true;
        setStudent(null);
        setToken(null);
        setIsLoading(false);
        notifyListeners();
        return;
      }
    } else {
      setStoredToken(null);
      cachedStudent = null;
      cachedToken = null;
      isSessionInitialized = true;
      setStudent(null);
      setToken(null);
    }

    setIsLoading(false);
    notifyListeners();
  }, []);

  useEffect(() => {
    let isMounted = true;

    // If session is already verified in this tab session, do not block with full loading
    if (isSessionInitialized) {
      if (isMounted) {
        setStudent(cachedStudent);
        setToken(cachedToken);
        setIsLoading(false);
      }
      return;
    }

    const run = async () => {
      const savedToken = getStoredToken();
      if (!savedToken) {
        cachedStudent = null;
        cachedToken = null;
        isSessionInitialized = true;
        if (isMounted) {
          setStudent(null);
          setToken(null);
          setIsLoading(false);
        }
        notifyListeners();
        return;
      }

      try {
        if (isMounted) setToken(savedToken);
        cachedToken = savedToken;
        const res = await api.students.getMe();
        cachedStudent = res.student;
        isSessionInitialized = true;
        if (isMounted) {
          setStudent(res.student);
          setIsLoading(false);
        }
        notifyListeners();
      } catch {
        const savedRefreshToken = getStoredRefreshToken();
        if (savedRefreshToken) {
          try {
            const refreshRes = await api.auth.refresh({ refreshToken: savedRefreshToken });
            setStoredToken(refreshRes.token);
            if (refreshRes.refreshToken) {
              setStoredRefreshToken(refreshRes.refreshToken);
            }
            cachedToken = refreshRes.token;
            cachedStudent = refreshRes.student;
            isSessionInitialized = true;
            if (isMounted) {
              setToken(refreshRes.token);
              setStudent(refreshRes.student);
              setIsLoading(false);
            }
            notifyListeners();
            return;
          } catch {
            // Refresh failed
          }
        }

        if (isMounted) {
          setStoredToken(null);
          setStoredRefreshToken(null);
          cachedStudent = null;
          cachedToken = null;
          isSessionInitialized = true;
          setStudent(null);
          setToken(null);
          setIsLoading(false);
        }
        notifyListeners();
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
      cachedToken = res.token;
      cachedStudent = res.student;
      isSessionInitialized = true;
      setToken(res.token);
      setStudent(res.student);
      if (res.refreshToken) {
        setStoredRefreshToken(res.refreshToken);
      } else {
        setStoredRefreshToken(null);
      }
      notifyListeners();
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
      cachedToken = res.token;
      cachedStudent = res.student;
      isSessionInitialized = true;
      setToken(res.token);
      setStudent(res.student);
      setStoredRefreshToken(null);
      notifyListeners();
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
      cachedStudent = res.student;
      setStudent(res.student);
      notifyListeners();
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
      cachedStudent = null;
      cachedToken = null;
      isSessionInitialized = false;
      setStudent(null);
      setToken(null);
      notifyListeners();
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
