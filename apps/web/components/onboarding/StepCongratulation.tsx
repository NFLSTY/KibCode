"use client";

import React from "react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { Sparkles, Award, School, BookOpen, Code2, Heart } from "lucide-react";

interface StepCongratulationProps {
  studentName?: string;
  grade: number | null;
  schoolName: string;
  hasCodingExp: boolean;
  codingExpLevel: string;
  favoriteInterest: string;
  learningGoal: string;
}

const INTEREST_LABELS: Record<string, { title: string; icon: string }> = {
  games: { title: "Bikin Game Seru", icon: "🎮" },
  animation: { title: "Animasi & Cerita", icon: "🎨" },
  puzzles: { title: "Teka-Teki Logika", icon: "🧠" },
  ai_robotics: { title: "Robotika & AI", icon: "🤖" },
};

const EXP_LABELS: Record<string, string> = {
  block_coding: "Block / Visual Coding 🧩",
  game_maker: "Bikin Game Sendiri 🎮",
  robotics: "Robotika & Alat 🤖",
  text_coding: "Ketik Kode Dasar 💻",
};

export function StepCongratulation({
  studentName = "Teman",
  grade,
  schoolName,
  hasCodingExp,
  codingExpLevel,
  favoriteInterest,
}: StepCongratulationProps) {
  const interestInfo = INTEREST_LABELS[favoriteInterest] || {
    title: "Petualangan Koding",
    icon: "🌟",
  };
  const expLabel = hasCodingExp
    ? EXP_LABELS[codingExpLevel] || "Sudah Pernah Coba"
    : "Mulai dari Awal (Pemula Cilik) 🌱";

  return (
    <div className="flex flex-col items-center text-center gap-5 w-full">
      {/* Celebration Mascot Badge */}
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center shadow-[0_6px_0_#F59E0B] animate-slow-bounce">
          <KiboLogo size={56} />
        </div>
        <span className="absolute -top-2 -right-2 text-2xl select-none animate-pulse">
          🎉
        </span>
        <span className="absolute -bottom-2 -left-2 text-2xl select-none animate-pulse">
          ⭐
        </span>
      </div>

      {/* Main Congratulation Heading */}
      <div className="max-w-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-heading text-xs font-bold shadow-xs mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
          <span>Selamat, {studentName}!</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Profil Petualangmu Siap!
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-semibold">
          Kibo sudah menyesuaikan misi, game, dan materi belajar yang paling pas buat kamu.
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="w-full max-w-lg bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 shadow-inner flex flex-col gap-3 text-left">
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-600">
            Kartu Rangkuman Petualang
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Item 1: Grade */}
          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">
                Tingkatan
              </span>
              <span className="font-heading text-xs sm:text-sm font-black text-slate-800 truncate block">
                Kelas {grade || 1} SD
              </span>
            </div>
          </div>

          {/* Item 2: School */}
          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <School className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">
                Sekolah
              </span>
              <span className="font-heading text-xs sm:text-sm font-black text-slate-800 truncate block">
                {schoolName || "Belum diisi"}
              </span>
            </div>
          </div>

          {/* Item 3: Experience */}
          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">
                Pengalaman
              </span>
              <span className="font-heading text-xs sm:text-sm font-black text-slate-800 truncate block">
                {expLabel}
              </span>
            </div>
          </div>

          {/* Item 4: Interest */}
          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-base">
              {interestInfo.icon}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">
                Fokus Minat
              </span>
              <span className="font-heading text-xs sm:text-sm font-black text-slate-800 truncate block">
                {interestInfo.title}
              </span>
            </div>
          </div>
        </div>

        {/* Motivational message */}
        <div className="mt-1 bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2 text-amber-900 text-xs font-semibold">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
          <span>Siap menjelajahi coding menyenangkan bersama teman-teman se-Indonesia!</span>
        </div>
      </div>
    </div>
  );
}
