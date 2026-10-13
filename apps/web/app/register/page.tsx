"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { showToast } from "nextjs-toast-notify";
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";

export default function RegisterPage() {
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
        grade: 1, // Default elementary grade level
        password,
      });

      showToast.success("Akun berhasil dibuat! Selamat datang di EduKids 🌟", {
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
          : "Gagal mendaftar. Pastikan semua data diisi dengan benar.";

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
    <div className="h-screen max-h-screen w-screen overflow-hidden bg-[#FFFBEB] flex items-center justify-center p-4">
      {/* Centered Form Card */}
      <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-[0_20px_50px_-10px_rgba(30,41,59,0.08)] border-2 border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Visual companion */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-b from-amber-50 to-orange-100/60 p-6 md:p-8 flex-col justify-between relative overflow-hidden">
          {/* Header pill */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-amber-800 text-xs font-bold w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Petualangan Baru</span>
            </div>
            <div className="relative bg-white p-4 rounded-2xl shadow-[0_4px_0_#FEF3C7]">
              <p className="text-slate-800 text-sm md:text-base font-semibold leading-relaxed">
                Ayo bergabung! Buat akunmu dan mulai kumpulkan bintang emas setiap hari! 🌟
              </p>
              <div className="absolute -bottom-2.5 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white" />
            </div>
          </div>

          {/* Mascot Visual Artwork */}
          <div className="my-auto flex justify-center items-center py-4">
            <div className="w-44 h-44 rounded-3xl bg-white p-4 flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(251,191,36,0.2)] border-4 border-amber-300">
              <div className="text-6xl mb-2 animate-bounce">🎒</div>
              <span className="font-heading font-bold text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                Siap Belajar &amp; Juara! 🏆
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          {/* Header Inside Form */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-[0_3px_0_#1D4ED8]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-blue-600">
                Edu<span className="text-amber-500">Kids</span>
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Beranda</span>
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Field 1: Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="nameInput"
                className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-blue-500" />
                <span>Nama Lengkap</span>
              </label>
              <input
                id="nameInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Pratama"
                required
                className="w-full min-h-[48px] px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* Field 2: Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="emailInput"
                className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                <span>Email</span>
              </label>
              <input
                id="emailInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="budi@contoh.com"
                required
                className="w-full min-h-[48px] px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* Field 3: Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="passwordInput"
                className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
              >
                <Lock className="w-4 h-4 text-blue-500" />
                <span>Kata Sandi (Minimal 6 karakter)</span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="passwordInput"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ketik kata sandi..."
                  required
                  minLength={6}
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

            {/* Submit Button (Only 1 icon: UserPlus) */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={isSubmitting}
                className="w-full gap-2 text-base font-bold shadow-[0_5px_0_#D97706] min-h-[48px]"
              >
                <UserPlus className="w-5 h-5" />
                <span>{isSubmitting ? "Menyiapkan Akun..." : "Daftar Akun"}</span>
              </Button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-center">
            <span className="text-slate-600">Sudah punya akun?</span>
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-700 underline transition-colors"
            >
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
