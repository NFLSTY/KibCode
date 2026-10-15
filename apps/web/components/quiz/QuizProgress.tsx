"use client";

import React from "react";
import { Flag } from "lucide-react";

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  isCurrentAnswered?: boolean;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  isCurrentAnswered = false,
}: QuizProgressProps) {
  // Starts with 0%, increases only after the question is answered (same logic as onboarding)
  const answeredCount = isCurrentAnswered ? currentIndex + 1 : currentIndex;
  const currentNumber = Math.min(currentIndex + 1, totalQuestions);
  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-[0_8px_20px_-4px_rgba(30,41,59,0.06)] mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-blue-600" />
          <span className="font-heading text-sm sm:text-base font-bold text-slate-800">
            Misi Petualang: Soal {currentNumber} dari {totalQuestions}
          </span>
        </div>
        <span className="font-heading text-sm sm:text-base font-bold text-blue-600">
          {progressPercent}% Selesai!
        </span>
      </div>

      {/* Pill Progress Track */}
      <div className="relative w-full h-5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-1 shadow-inner"
          style={{ width: `${progressPercent}%` }}
        >
          {progressPercent > 0 && (
            <div className="w-3.5 h-3.5 bg-white rounded-full animate-pulse shadow-sm" />
          )}
        </div>
      </div>
    </div>
  );
}
