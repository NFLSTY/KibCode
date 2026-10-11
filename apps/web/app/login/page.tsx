"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Rocket,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal masuk. Periksa email dan kata sandi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-[0_3px_0_#CBD5E1] active:translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-blue-500" />
          <span>Kembali</span>
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-[0_3px_0_#1D4ED8]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-blue-600">
            Edu<span className="text-amber-500">Kids</span>
          </span>
        </Link>

        <div className="w-24"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_50px_-10px_rgba(30,41,59,0.08)] border-2 border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Playful Companion & Mascot */}
          <div className="lg:col-span-5 bg-gradient-to-b from-blue-50 to-sky-100/60 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Mascot Speech Bubble */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-blue-700 text-xs font-bold w-fit shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Ruang Belajar Ceria</span>
              </div>
              <div className="relative bg-white p-4 rounded-2xl shadow-[0_4px_0_#DBEAFE]">
                <p className="text-slate-800 text-sm md:text-base font-semibold leading-relaxed">
                  Halo Sahabat Juara! Siap melanjutkan petualangan belajarmu hari ini? 🌟
                </p>
                <div className="absolute -bottom-2.5 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>
            </div>

            {/* Mascot Visual Artwork */}
            <div className="my-6 flex justify-center items-center">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-3xl bg-white p-4 flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(59,130,246,0.15)] border-4 border-amber-200">
                <div className="text-6xl md:text-7xl mb-2 animate-bounce">🤖</div>
                <span className="font-heading font-bold text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Kibo si Robot Cilik 🚀
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-700 text-xs font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Aman untuk Anak</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-700 text-xs font-bold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>Tanpa Iklan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Friendly Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-bold mb-1">
                <span>👋 Selamat Datang Kembali!</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                Masuk ke <span className="text-blue-500">Edu</span>
                <span className="text-amber-500">Kids</span>
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Masukkan email dan kata sandi untuk mulai bermain dan mengumpulkan bintang! 🚀
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Field 1: Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="emailInput"
                  className="text-sm font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>Email Siswa atau Orang Tua</span>
                </label>
                <input
                  id="emailInput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi@contoh.com"
                  required
                  className="w-full min-h-[50px] px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all"
                />
              </div>

              {/* Field 2: Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="passwordInput"
                  className="text-sm font-bold text-slate-700 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-blue-500" />
                    <span>Kata Sandi</span>
                  </span>
                </label>
                <div className="relative flex items-center">
                  <input
                    id="passwordInput"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    required
                    className="w-full min-h-[50px] pl-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-400 focus:outline-none transition-all"
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
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2 text-base font-bold shadow-[0_5px_0_#1D4ED8]"
                >
                  <Rocket className="w-5 h-5" />
                  <span>
                    {isSubmitting ? "Membuka Gerbang..." : "Masuk & Mulai Belajar"}
                  </span>
                </Button>
              </div>
            </form>

            {/* Switch to Register */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-sm text-center">
              <span className="text-slate-600">Belum punya akun?</span>
              <Link
                href="/register"
                className="font-bold text-rose-500 hover:text-rose-600 underline transition-colors"
              >
                Daftar Akun Baru di Sini!
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-xs text-slate-500">
        © 2026 EduKids. Teman Belajar Seru Anak SD Indonesia.
      </footer>
    </div>
  );
}
