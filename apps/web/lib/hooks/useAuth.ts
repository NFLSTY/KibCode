"use client";

import { useState, useEffect, useCallback } from "react";
import type { StudentDTO, LoginStudentDTO, RegisterStudentDTO } from "@edukids/types";
import { api, getStoredToken, setStoredToken } from "@/lib/api-client";

export function useAuth() {
  const [student, setStudent] = useState<StudentDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    const savedToken = getStoredToken();
    if (!savedToken) {
      setStudent(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      setToken(savedToken);
      const res = await api.students.getMe();
      setStudent(res.student);
    } catch {
      setStoredToken(null);
      setStudent(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (credentials: LoginStudentDTO) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await api.auth.login(credentials);
      setStoredToken(res.token);
      setToken(res.token);
      setStudent(res.student);
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
      return res.student;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mendaftar. Silakan coba lagi.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setStoredToken(null);
    setStudent(null);
    setToken(null);
  };

  return {
    student,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshProfile: fetchProfile,
  };
}
