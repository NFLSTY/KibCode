"use client";

import React from "react";
import { Flame, Star, Award } from "lucide-react";

interface DashboardGreetingProps {
  name: string;
  grade: number;
  streakDays: number;
  totalStars: number;
}

export function DashboardGreeting({
  name,
  grade,
  streakDays,
  totalStars,
}: DashboardGreetingProps) {
  const currentLevel = Math.max(1, Math.floor(totalStars / 200) + 1);

  return (
    <section className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 md:p-8 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100">
      {/* Decorative Glows */}
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-10 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Student Avatar & Wrapped Greeting Text */}
        <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
          <div className="relative shrink-0">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-amber-100 flex items-center justify-center p-1.5 shadow-inner border-2 border-amber-300">
              <div className="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center font-heading text-2xl sm:text-3xl font-black shadow-sm select-none">
                {name ? name.charAt(0).toUpperCase() : "P"}
              </div>
            </div>
          </div>

          <div className="flex flex-col min-w-0 max-w-md xl:max-w-lg">
            <div className="inline-flex items-center gap-2">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate">
                Halo, {name}!
              </h1>
              <span className="text-2xl animate-bounce shrink-0">🌟</span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1 leading-relaxed">
              Selamat datang di petualangan kodingmu bersama Kibo! Siap selesaikan tantangan hari ini? 🚀
            </p>
          </div>
        </div>

        {/* Right: Gamification Stat Badges (Fixed position & balanced cards) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
          {/* Stat 1: Streak */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200/70 shadow-xs hover:scale-102 transition-transform flex-1 sm:flex-initial sm:min-w-[140px]">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-xs shrink-0">
              <Flame className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Streak Belajar
              </span>
              <span className="font-heading text-sm sm:text-base font-black text-slate-900 whitespace-nowrap">
                {streakDays > 0 ? `${streakDays} Hari 🔥` : "0 Hari 🔥"}
              </span>
            </div>
          </div>

          {/* Stat 2: Stars */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200/70 shadow-xs hover:scale-102 transition-transform flex-1 sm:flex-initial sm:min-w-[140px]">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-xs shrink-0">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Total Bintang
              </span>
              <span className="font-heading text-sm sm:text-base font-black text-slate-900 whitespace-nowrap">
                {totalStars} ⭐
              </span>
            </div>
          </div>

          {/* Stat 3: Level / Rank */}
          <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-2xl border border-blue-200 shadow-xs hover:scale-102 transition-transform flex-1 sm:flex-initial sm:min-w-[165px]">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-xs shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-[11px] font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                Pangkat Petualang
              </span>
              <span className="font-heading text-sm sm:text-base font-black text-blue-900 whitespace-nowrap">
                Level {currentLevel} • SD {grade}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
