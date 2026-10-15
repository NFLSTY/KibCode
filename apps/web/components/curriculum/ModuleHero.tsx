"use client";

import React from "react";
import {
  Sparkles,
  BookOpen,
  Award,
  Bot,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface ModuleHeroProps {
  totalModules: number;
  grade?: number;
  progressPercent: number;
  completedModulesCount: number;
  isGeneratingNextModule: boolean;
  hasUnlockedNext: boolean;
}

export function ModuleHero({
  totalModules,
  grade = 3,
  progressPercent,
  completedModulesCount,
  isGeneratingNextModule,
  hasUnlockedNext,
}: ModuleHeroProps) {
  const remainingModules = Math.max(0, totalModules - completedModulesCount);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-10 text-white shadow-xl">
      {/* Decorative Blur Spheres */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none blur-2xl" />
      <div className="absolute bottom-0 right-1/4 w-44 h-44 rounded-full bg-amber-400/20 pointer-events-none blur-xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text & Badges (Matching CatalogHero) */}
        <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md self-center md:self-start w-fit border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-blue-100">
              Kurikulum &amp; Modul Belajar SD
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-3 flex-wrap">
            Modul Belajar Koding
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
            Kuasai konsep penting koding untuk anak SD langkah demi langkah. Pelajari teorinya di Hal. 1, pahami pola kodenya di Hal. 2, dan buktikan pemahamanmu lewat kuis 3 soal di Hal. 3!
          </p>

          {/* Quick Stats Ribbon */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold border border-white/10">
              <BookOpen className="w-4 h-4" />
              <span>{totalModules} Modul Belajar Aktif</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs sm:text-sm font-bold shadow-sm">
              <Award className="w-4 h-4" />
              <span>Target: Kelas {grade} SD</span>
            </div>
          </div>
        </div>

        {/* Right Column: Progres Belajar Materi & Progress untuk Modul Selanjutnya */}
        <div className="w-full md:w-96 shrink-0 flex flex-col gap-4 bg-white/15 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-lg">
          {/* Card 1: Progres Belajar Materi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-blue-100 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                Progres Belajar Materi
              </span>
              <span className="text-amber-300 font-black text-sm">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-blue-100/90 font-medium">
              <span>{completedModulesCount} dari {totalModules} Modul Selesai</span>
              <span className="font-bold text-amber-300">
                {remainingModules} Modul Tersisa
              </span>
            </div>
          </div>

          <div className="h-px bg-white/15" />

          {/* Card 2: Progress untuk Modul Selanjutnya */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-blue-100 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-amber-300" />
                Target Kurikulum Koding
              </span>
              <span className="text-amber-300 font-black text-sm">
                {completedModulesCount}/{totalModules}
              </span>
            </div>

            <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isGeneratingNextModule
                    ? "bg-gradient-to-r from-amber-400 to-amber-300 animate-pulse"
                    : "bg-gradient-to-r from-emerald-400 to-teal-300"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {isGeneratingNextModule ? (
              <div className="bg-amber-400/20 border border-amber-300/40 rounded-2xl p-2.5 flex items-center gap-2.5 text-xs text-white">
                <Loader2 className="w-4 h-4 text-amber-300 animate-spin shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-amber-200 leading-tight">
                    Merakit Modul Baru dengan Gemini AI...
                  </span>
                  <span className="text-[10px] text-blue-100/90 leading-tight mt-0.5">
                    Progresmu 100%! Kibo sedang merakit materi tingkat lanjut secara otomatis.
                  </span>
                </div>
              </div>
            ) : hasUnlockedNext ? (
              <div className="bg-emerald-500/25 border border-emerald-400/40 rounded-2xl p-2.5 flex items-center justify-between gap-2 text-xs text-white">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="text-[11px] font-bold leading-tight truncate">
                    Modul Tingkat Lanjut telah dirakit oleh Gemini AI! 🚀
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 460, behavior: "smooth" });
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[10px] font-bold text-white shrink-0 cursor-pointer"
                >
                  Lihat ↓
                </button>
              </div>
            ) : progressPercent >= 100 ? (
              <div className="bg-emerald-500/25 border border-emerald-400/40 rounded-2xl p-2.5 flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-[11px] font-bold leading-tight">
                  Luar biasa! Seluruh materi tuntas. Robot Kibo siap menyusun tantangan berikutnya! 🚀
                </span>
              </div>
            ) : (
              <p className="text-[11px] text-blue-100 leading-tight">
                Selesaikan{" "}
                <strong className="text-amber-300 font-black">
                  {remainingModules}
                </strong>{" "}
                modul lagi untuk menuntaskan kurikulum koding SD!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
