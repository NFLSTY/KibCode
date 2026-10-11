"use client";

import React from "react";
import Link from "next/link";
import {
  Rocket,
  Play,
  Calculator,
  BookOpen,
  SpellCheck,
  Star,
  Award,
  Sparkles,
} from "lucide-react";

export function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 sm:pb-20">
      {/* Announcement Banner */}
      <div className="flex justify-center mb-8">
        <Link
          href="/register"
          className="inline-flex items-center gap-2.5 bg-blue-100/80 hover:bg-blue-100 text-blue-900 px-5 py-2 rounded-full border border-blue-200/60 shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-xs font-bold animate-bounce">
            🎉
          </span>
          <span className="text-sm sm:text-base font-semibold">
            Petualangan Belajar Semester Baru Dimulai!{" "}
            <span className="text-blue-700 font-bold underline decoration-amber-400 decoration-2">
              Kumpulkan 500 Bintang Gratis
            </span>{" "}
            🌟
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Headline & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2 w-fit bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">
              Kurikulum Merdeka SD Terpadu
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Belajar Jadi Petualangan Paling{" "}
            <span className="text-blue-600 relative inline-block">
              Seru!
              <svg
                className="absolute -bottom-2 left-0 w-full text-amber-400"
                height="10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 12 100 5"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            🚀
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
            Temani langkah juara kecilmu menguasai{" "}
            <span className="text-blue-600 font-bold">Matematika</span>,{" "}
            <span className="text-amber-600 font-bold">Membaca</span>, dan{" "}
            <span className="text-rose-500 font-bold">Mengeja</span> dengan game
            interaktif seru, kuis berhadiah bintang, dan materi kurikulum SD
            yang mudah dipahami!
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-lg sm:text-xl font-black px-8 py-3.5 rounded-full shadow-[0_5px_0_#D97706] active:translate-y-1 active:shadow-[0_2px_0_#D97706] transition-all min-h-[52px]"
            >
              <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Mulai Belajar Sekarang!</span>
            </Link>

            <Link
              href="/games"
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-blue-600 font-heading text-lg sm:text-xl font-bold px-7 py-3.5 rounded-full border-2 border-blue-200 shadow-[0_4px_0_#BFDBFE] active:translate-y-1 active:shadow-[0_1px_0_#BFDBFE] transition-all min-h-[52px]"
            >
              <Play className="w-5 h-5 fill-blue-600" />
              <span>Coba Kuis Demo</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-slate-500 text-sm font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-black">✓</span> 100% Bebas
              Iklan
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-black">✓</span> Materi Kelas
              1 - 6 SD
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-black">✓</span> Tanpa Kartu
              Kredit
            </div>
          </div>
        </div>

        {/* Right Column: Tactile Hero Preview Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Ambient Glows */}
          <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-blue-400/25 blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-white ring-1 ring-slate-100">
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-tight">
                    EduKids Explorer
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Misi Harian Aktif
                  </span>
                </div>
              </div>

              <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-300 shadow-sm">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>450 Bintang</span>
              </div>
            </div>

            {/* Subject Quest List */}
            <div className="flex flex-col gap-3 mt-4">
              {/* Item 1 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/70 border border-blue-100 hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-sm">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-800 text-sm">
                      Matematika Seru
                    </h4>
                    <p className="text-xs text-slate-500">
                      Operasi Cepat &amp; Pecahan
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-full shadow-sm border border-blue-100">
                  Level 3
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-100 hover:bg-amber-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-800 text-sm">
                      Dunia Dongeng
                    </h4>
                    <p className="text-xs text-slate-500">
                      Fabel &amp; Dongeng Nusantara
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-full shadow-sm border border-amber-200">
                  Selesai ⭐
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50/70 border border-rose-100 hover:bg-rose-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-sm">
                    <SpellCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-800 text-sm">
                      Tantangan Kosakata
                    </h4>
                    <p className="text-xs text-slate-500">Susun Huruf Acak</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-700 bg-white px-2.5 py-1 rounded-full shadow-sm border border-rose-100">
                  Level 2
                </span>
              </div>
            </div>

            {/* Daily Target Progress Bar */}
            <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                <span className="text-slate-600">Target Bintang Harian</span>
                <span className="text-blue-600">85% Terpenuhi</span>
              </div>
              <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
