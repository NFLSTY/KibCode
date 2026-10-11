"use client";

import React from "react";
import { Flame, Star, Award, Sparkles, User } from "lucide-react";

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
  return (
    <section className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100">
      {/* Decorative Glows */}
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-10 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Student Avatar & Greeting */}
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-100 flex items-center justify-center p-1.5 shadow-inner border-2 border-amber-300">
              <div className="w-full h-full rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
                <User className="w-10 h-10 md:w-12 md:h-12" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full font-heading text-xs font-bold shadow-sm flex items-center gap-0.5 border border-amber-300">
              <Sparkles className="w-3 h-3 fill-amber-950" /> SD {grade}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Halo, {name}!
              </h1>
              <span className="text-3xl animate-bounce">🌟</span>
            </div>
            <p className="text-slate-600 text-sm sm:text-base font-semibold mt-1">
              Hebat! Rajin belajar{" "}
              <span className="text-blue-600 font-bold">
                {streakDays} hari berturut-turut!
              </span>{" "}
              🚀
            </p>
          </div>
        </div>

        {/* Gamification Stat Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto items-center">
          {/* Stat 1: Streak */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200/70 shadow-sm hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
              <Flame className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xs font-bold text-slate-400">
                Streak Harian
              </span>
              <span className="font-heading text-base sm:text-lg font-black text-slate-900 whitespace-nowrap">
                {streakDays} Hari 🔥
              </span>
            </div>
          </div>

          {/* Stat 2: Stars */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200/70 shadow-sm hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-sm shrink-0">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xs font-bold text-slate-400">
                Total Bintang
              </span>
              <span className="font-heading text-base sm:text-lg font-black text-slate-900 whitespace-nowrap">
                {totalStars} ⭐
              </span>
            </div>
          </div>

          {/* Stat 3: Rank */}
          <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-2xl border border-blue-200 shadow-sm hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-sm shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xs font-bold text-blue-700">
                Pangkat Petualang
              </span>
              <span className="font-heading text-base sm:text-lg font-black text-blue-900 whitespace-nowrap">
                Level {grade} • Cilik
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
