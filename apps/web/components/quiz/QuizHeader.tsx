"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Flame, Star } from "lucide-react";
import type { GameCategory } from "@kibcode/types";

interface QuizHeaderProps {
  gameTitle: string;
  category: GameCategory;
  grade?: number;
  streak: number;
  starsCollected: number;
  onExit?: () => void;
}

export function QuizHeader({
  streak,
  starsCollected,
  onExit,
}: QuizHeaderProps) {
  // Same button style as "Kembali ke Dashboard" from profile page
  const exitButtonClasses =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all cursor-pointer";

  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      {/* Back / Exit Quiz Button */}
      {onExit ? (
        <button type="button" onClick={onExit} className={exitButtonClasses}>
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar Kuis</span>
        </button>
      ) : (
        <Link href="/games" className={exitButtonClasses}>
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar Kuis</span>
        </Link>
      )}

      {/* Gamification Counters (Streak & Stars) filling the position */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Chip */}
        <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3.5 sm:px-4 py-2 rounded-full shadow-2xs font-heading text-xs sm:text-sm font-black">
          <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Streak {streak}x</span>
        </div>

        {/* Stars Counter */}
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3.5 sm:px-4 py-2 rounded-full shadow-2xs font-heading text-xs sm:text-sm font-black">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{starsCollected} Bintang</span>
        </div>
      </div>
    </div>
  );
}
