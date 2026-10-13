"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { CTAButton } from "@/components/ui/CTAButton";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, Check } from "lucide-react";
import { showToast } from "nextjs-toast-notify";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password, rememberMe });
      showToast.success("Berhasil masuk! Selamat belajar 🎉", {
        duration: 3000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        sound: false,
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Gagal masuk. Periksa email dan kata sandi.";

      showToast.error(message, {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        sound: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
      {/* Header Inside Form (Two column layout matching RegisterForm) */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-heading text-2xl font-bold tracking-tight text-blue-600 group-hover:opacity-90 transition-opacity">
            Kib<span className="text-amber-500">Code</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </Link>
      </div>

      <div className="mb-5">
        <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Masuk Akun
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Masukkan email dan kata sandi untuk mulai belajar!
        </p>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-3.5">
        {/* Field 1: Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="loginEmailInput"
            className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-blue-500" />
            <span>Email</span>
          </label>
          <input
            id="loginEmailInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="budi@contoh.com"
            autoComplete="off"
            required
            className="w-full min-h-[48px] px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
          />
        </div>

        {/* Field 2: Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="loginPasswordInput"
            className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4 text-blue-500" />
            <span>Kata Sandi</span>
          </label>
          <div className="relative flex items-center">
            <input
              id="loginPasswordInput"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi..."
              autoComplete="current-password"
              required
              className="w-full min-h-[48px] pl-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Lihat kata sandi"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Custom Rounded Checkbox: Biarkan saya tetap masuk */}
        <label
          htmlFor="rememberMeCheckbox"
          className="flex items-center gap-2.5 py-1 cursor-pointer select-none w-fit group"
        >
          <div className="relative flex items-center justify-center">
            <input
              id="rememberMeCheckbox"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                rememberMe
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-white border-slate-300 group-hover:border-blue-400"
              }`}
            >
              <Check
                className={`w-3.5 h-3.5 stroke-[3] transition-all duration-200 ${
                  rememberMe ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            </div>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
            Biarkan saya tetap masuk
          </span>
        </label>

        {/* Submit Button */}
        <div className="pt-1">
          <CTAButton
            type="submit"
            variant="primary"
            size="full"
            disabled={isSubmitting}
            icon={<LogIn className="w-5 h-5" />}
          >
            {isSubmitting ? "Memproses..." : "Masuk"}
          </CTAButton>
        </div>
      </form>

      {/* Switch to Register */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-center">
        <span className="text-slate-600">Belum punya akun?</span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-bold text-rose-500 hover:text-rose-600 underline transition-colors cursor-pointer"
        >
          Daftar di sini
        </button>
      </div>
    </div>
  );
}