"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Flame, Star, Calculator, BookOpen, SpellCheck } from "lucide-react";
import type { GameCategory } from "@edukids/types";

interface QuizHeaderProps {
  gameTitle: string;
  category: GameCategory;
  grade?: number;
  streak: number;
  starsCollected: number;
  onExit?: () => void;
}

export function QuizHeader({
  gameTitle,
  category,
  grade = 3,
  streak,
  starsCollected,
  onExit,
}: QuizHeaderProps) {
  const getCategoryDetails = () => {
    switch (category) {
      case "math":
        return { name: "Matematika", icon: Calculator, badgeBg: "bg-blue-100 text-blue-900 border-blue-200" };
      case "reading":
        return { name: "Membaca", icon: BookOpen, badgeBg: "bg-amber-100 text-amber-950 border-amber-300" };
      case "spelling":
        return { name: "Mengeja", icon: SpellCheck, badgeBg: "bg-rose-100 text-rose-950 border-rose-200" };
      default:
        return { name: "Belajar", icon: Calculator, badgeBg: "bg-slate-100 text-slate-800 border-slate-200" };
    }
  };

  const cat = getCategoryDetails();
  const CategoryIcon = cat.icon;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      {/* Back / Exit Quiz Button */}
      {onExit ? (
        <button
          type="button"
          onClick={onExit}
          className="group inline-flex items-center gap-2 bg-white text-slate-700 px-4 py-2.5 rounded-full border border-slate-200 shadow-[0_4px_0_#CBD5E1] hover:shadow-[0_2px_0_#CBD5E1] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all cursor-pointer font-heading text-sm font-bold min-h-[48px]"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
          <span>Keluar Kuis</span>
        </button>
      ) : (
        <Link
          href="/games"
          className="group inline-flex items-center gap-2 bg-white text-slate-700 px-4 py-2.5 rounded-full border border-slate-200 shadow-[0_4px_0_#CBD5E1] hover:shadow-[0_2px_0_#CBD5E1] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all cursor-pointer font-heading text-sm font-bold min-h-[48px]"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
          <span>Keluar Kuis</span>
        </Link>
      )}

      {/* Badge Context & Subject */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm font-heading text-xs sm:text-sm font-bold ${cat.badgeBg}`}
      >
        <CategoryIcon className="w-4 h-4" />
        <span>
          {cat.name} Kelas {grade} SD • {gameTitle}
        </span>
      </div>

      {/* Gamification Counters (Streak & Stars) */}
      <div className="flex items-center gap-2.5">
        {/* Streak Chip */}
        <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-900 border border-rose-300 px-3 py-1 rounded-full shadow-[0_2px_0_#FDA4AF] font-heading text-xs sm:text-sm font-bold">
          <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Streak {streak}x 🔥</span>
        </div>

        {/* Stars Counter */}
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 border border-amber-300 px-3.5 py-1 rounded-full shadow-[0_2px_0_#FCD34D] font-heading text-xs sm:text-sm font-bold">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{starsCollected} Bintang</span>
        </div>
      </div>
    </div>
  );
}
