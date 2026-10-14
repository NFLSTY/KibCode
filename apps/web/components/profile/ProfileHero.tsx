"use client";

import React from "react";
import { School, Calendar, Zap, Camera } from "lucide-react";
import type { AvatarOption } from "./types";

interface ProfileHeroProps {
  studentName: string;
  studentGrade: number;
  schoolName?: string | null;
  joinDate?: string;
  currentAvatar: AvatarOption;
  onOpenAvatarPicker: () => void;
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
}

export function ProfileHero({
  studentName,
  studentGrade,
  schoolName,
  joinDate,
  currentAvatar,
  onOpenAvatarPicker,
  level = 1,
  currentXp = 0,
  nextLevelXp = 200,
}: ProfileHeroProps) {
  const xpPercent = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  return (
    <section className="relative w-full rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-[0_12px_32px_-6px_rgba(30,41,59,0.08)] border-2 border-slate-100 overflow-hidden">
      {/* Decorative Warm Background Blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-12 w-72 h-72 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
        {/* Large Avatar with Floating Edit Button */}
        <div className="relative shrink-0 group">
          <div
            className={`w-36 h-36 md:w-44 md:h-44 rounded-full p-2 bg-gradient-to-tr ${currentAvatar.bgGradient} shadow-md flex items-center justify-center transition-transform group-hover:scale-102`}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-6xl md:text-7xl select-none shadow-inner border-2 border-white">
              {currentAvatar.icon}
            </div>
          </div>

          {/* Edit Avatar Floating Button */}
          <button
            type="button"
            onClick={onOpenAvatarPicker}
            aria-label="Ganti Avatar Karakter"
            title="Ganti Avatar Karakter"
            className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-[0_4px_0_#1D4ED8] hover:scale-110 active:translate-y-1 active:shadow-none transition-all cursor-pointer ring-3 ring-white"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Student Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
          {/* Main Name */}
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            {studentName}
          </h1>

          {/* Metadata Chips (School & Join Date) */}
          <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs sm:text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full font-semibold">
              <School className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{schoolName || "Belum mengisi nama sekolah"}</span>
            </span>
            {joinDate && (
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full font-semibold">
                <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Bergabung sejak {joinDate}</span>
              </span>
            )}
          </div>

          {/* Level Progress Gauge */}
          <div className="w-full mt-5 pt-3 max-w-lg">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-heading text-xs sm:text-sm text-blue-600 font-black flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Level Petualang {level}</span>
              </span>
              <span className="font-heading text-xs font-bold text-slate-500">
                {currentXp} / {nextLevelXp} XP Menuju Level {level + 1}
              </span>
            </div>

            {/* Tactile Striped Progress Bar */}
            <div className="w-full h-5 rounded-full bg-slate-100 p-1 relative overflow-hidden shadow-inner border border-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400 transition-all duration-700 relative shadow-sm"
                style={{ width: `${xpPercent}%` }}
              >
                {/* Diagonal Highlight Striping */}
                <div className="absolute inset-0 bg-white/20 [background-image:linear-gradient(45deg,rgba(255,255,255,0.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.25)_75%,transparent_75%,transparent)] [background-size:16px_16px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Student Class Card (Desktop Right) */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-blue-50/70 border-2 border-blue-200 p-5 rounded-3xl text-center min-w-[150px] shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-[0_3px_0_#1D4ED8] mb-2.5">
            <School className="w-6 h-6" />
          </div>
          <span className="font-heading text-base font-black text-slate-800">
            Kelas {studentGrade} SD
          </span>
          <span className="text-[11px] font-bold text-blue-600 mt-0.5">
            Kurikulum Merdeka
          </span>
        </div>
      </div>
    </section>
  );
}
