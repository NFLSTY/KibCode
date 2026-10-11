"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Flag } from "lucide-react";

export function MissionBanner() {
  return (
    <section className="mt-8 rounded-3xl bg-blue-50 border-2 border-blue-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute -right-16 -bottom-16 w-52 h-52 rounded-full bg-amber-300/30 pointer-events-none blur-2xl" />

      <div className="flex items-center gap-5 z-10 text-center md:text-left flex-col md:flex-row">
        <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-[0_4px_0_#D97706] shrink-0">
          <Trophy className="w-8 h-8 fill-amber-950" />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
            Mau buka game baru lebih cepat?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl font-medium">
            Selesaikan misi harian di Dasbor, raih bonus bintang 3x lipat, dan
            buka game tantangan baru sebelum teman sekelasmu!
          </p>
        </div>
      </div>

      <Link
        href="/dashboard"
        className="z-10 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-heading text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_0_#1D4ED8] active:translate-y-1 active:shadow-[0_1px_0_#1D4ED8] transition-all shrink-0 min-h-[48px]"
      >
        <span>Lihat Misi Harian</span>
        <Flag className="w-4 h-4" />
      </Link>
    </section>
  );
}
