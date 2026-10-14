"use client";

import React from "react";
import { Gamepad2, Star, Clock } from "lucide-react";

interface ProfileStatsProps {
  completedGames?: number;
  totalStars?: number;
  totalTimeMinutes?: number;
}

export function ProfileStats({
  completedGames = 0,
  totalStars = 0,
  totalTimeMinutes = 0,
}: ProfileStatsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
      {/* Card 1: Total Game Dimainkan */}
      <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-[0_8px_20px_-4px_rgba(30,41,59,0.06)] relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-[0_4px_0_#93C5FD] border border-blue-200">
          <Gamepad2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Main
          </span>
          <span className="font-heading text-xl sm:text-2xl font-black text-blue-600 tracking-tight">
            {completedGames} Game
          </span>
          <span className="text-xs font-semibold text-slate-500 truncate">
            Selesai dengan nilai tuntas
          </span>
        </div>
        <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-blue-50 rounded-full pointer-events-none" />
      </div>

      {/* Card 2: Bintang & Skor */}
      <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-[0_8px_20px_-4px_rgba(30,41,59,0.06)] relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-[0_4px_0_#FDE68A] border border-amber-200">
          <Star className="w-8 h-8 fill-amber-500 text-amber-500 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider">
            Bintang &amp; Skor
          </span>
          <span className="font-heading text-xl sm:text-2xl font-black text-amber-600 tracking-tight">
            {totalStars.toLocaleString("id-ID")} Poin
          </span>
          <span className="text-xs font-semibold text-slate-500 truncate">
            Poin akumulasi belajar
          </span>
        </div>
        <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-50 rounded-full pointer-events-none" />
      </div>

      {/* Card 3: Waktu Belajar */}
      <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-[0_8px_20px_-4px_rgba(30,41,59,0.06)] relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0 shadow-[0_4px_0_#FECDD3] border border-rose-200">
          <Clock className="w-8 h-8 text-rose-500 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider">
            Waktu Belajar
          </span>
          <span className="font-heading text-xl sm:text-2xl font-black text-rose-600 tracking-tight">
            {totalTimeMinutes} Menit
          </span>
          <span className="text-xs font-semibold text-slate-500 truncate">
            Total waktu aktif kuis &amp; tantangan
          </span>
        </div>
        <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-rose-50 rounded-full pointer-events-none" />
      </div>
    </section>
  );
}
