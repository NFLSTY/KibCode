"use client";

import React from "react";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";

interface ProfileMascotBannerProps {
  studentName?: string;
}

export function ProfileMascotBanner({ studentName = "Petualang Cilik" }: ProfileMascotBannerProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-100 via-sky-50 to-amber-100/80 border-2 border-blue-200 p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center shadow-[0_4px_0_#F59E0B] shrink-0 animate-slow-bounce">
          <KiboLogo size={44} />
        </div>
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1.5 self-center sm:self-start mb-0.5">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <h3 className="font-heading text-base sm:text-lg font-black text-slate-800">
              Hebat sekali, {studentName}!
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-xl">
            Selesaikan 1 tantangan koding atau kuis kilat hari ini untuk mempertahankan api streak belajarmu bersama Kibo.
          </p>
        </div>
      </div>

      <Link
        href="/games"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading text-xs sm:text-sm font-bold shadow-[0_4px_0_#1D4ED8] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all whitespace-nowrap cursor-pointer shrink-0"
      >
        <span>Lanjutkan Petualangan</span>
        <Play className="w-4 h-4 fill-white" />
      </Link>
    </div>
  );
}
