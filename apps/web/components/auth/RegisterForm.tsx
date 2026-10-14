"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { CTAButton } from "@/components/ui/CTAButton";
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";
import { showToast } from "nextjs-toast-notify";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await register({
        name,
        email,
        password,
        grade: 1, // Default elementary grade
      });

      showToast.success("Akun berhasil dibuat! Yuk lengkapi profil petualangmu 🌟", {
        duration: 3000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        sound: false,
      });

      router.push("/onboarding");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Gagal membuat akun. Silakan coba lagi.";

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
      {/* Header Inside Form */}
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

      <div className="mb-4">
        <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Daftar Akun Baru
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Isi data di bawah ini untuk memulai petualangan belajarmu!
        </p>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-3">
        {/* Field 1: Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="registerNameInput"
            className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
          >
            <User className="w-4 h-4 text-blue-500" />
            <span>Nama Lengkap</span>
          </label>
          <input
            id="registerNameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Budi Pratama"
            autoComplete="off"
            required
            className="w-full min-h-[46px] px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
          />
        </div>

        {/* Field 2: Email */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="registerEmailInput"
            className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-blue-500" />
            <span>Email</span>
          </label>
          <input
            id="registerEmailInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="budi@contoh.com"
            autoComplete="off"
            required
            className="w-full min-h-[46px] px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
          />
        </div>

        {/* Field 3: Password */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="registerPasswordInput"
            className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4 text-blue-500" />
            <span>Kata Sandi (Minimal 6 karakter)</span>
          </label>
          <div className="relative flex items-center">
            <input
              id="registerPasswordInput"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ketik kata sandi..."
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full min-h-[46px] pl-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
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

        {/* Submit Button */}
        <div className="pt-1.5">
          <CTAButton
            type="submit"
            variant="primary"
            size="full"
            disabled={isSubmitting}
            icon={<UserPlus className="w-5 h-5" />}
          >
            {isSubmitting ? "Menyiapkan Akun..." : "Daftar Akun"}
          </CTAButton>
        </div>
      </form>

      {/* Switch to Login */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-center">
        <span className="text-slate-600">Sudah punya akun?</span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-bold text-blue-600 hover:text-blue-700 underline transition-colors cursor-pointer"
        >
          Masuk di sini
        </button>
      </div>
    </div>
  );
}