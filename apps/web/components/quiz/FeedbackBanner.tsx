"use client";

import React from "react";
import { Award, ArrowRight, Sparkles, HeartHandshake } from "lucide-react";

interface FeedbackBannerProps {
  isCorrect: boolean;
  isLastQuestion: boolean;
  explanation?: string;
  onNext: () => void;
}

export function FeedbackBanner({
  isCorrect,
  isLastQuestion,
  explanation,
  onNext,
}: FeedbackBannerProps) {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border ${
        isCorrect
          ? "bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200"
          : "bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-200"
      }`}
    >
      <div className="flex items-center gap-3.5 text-center sm:text-left">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
            isCorrect
              ? "bg-amber-400 text-amber-950 shadow-[0_3px_0_#D97706] animate-bounce"
              : "bg-rose-400 text-white shadow-[0_3px_0_#BE123C]"
          }`}
        >
          {isCorrect ? (
            <Award className="w-7 h-7" />
          ) : (
            <HeartHandshake className="w-7 h-7" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-heading text-base sm:text-lg font-black text-slate-900 leading-tight">
            {isCorrect
              ? "Luar biasa, jawabanmu benar!"
              : "Tetap semangat, coba perhatikan tips berikut!"}
          </span>
          <span
            className={`font-heading text-xs sm:text-sm font-bold mt-0.5 ${
              isCorrect ? "text-blue-600" : "text-amber-800"
            }`}
          >
            {isCorrect
              ? "+50 Bintang & streak bertambah!"
              : explanation || "Ayo pelajari konsepnya dan coba lagi di soal berikutnya!"}
          </span>
        </div>
      </div>

      {/* Next Question Primary CTA */}
      <button
        type="button"
        onClick={onNext}
        className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-950 px-7 py-3 rounded-full font-heading text-base font-black shadow-[0_5px_0_#D97706] active:translate-y-1 active:shadow-[0_2px_0_#D97706] transition-all cursor-pointer"
      >
        <span>
          {isLastQuestion ? "Lihat Hasil Petualangan" : "Lanjut ke Soal Berikutnya"}
        </span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
