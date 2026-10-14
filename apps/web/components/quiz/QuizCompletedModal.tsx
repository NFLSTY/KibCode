"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Star, Clock, CheckCircle, RotateCcw, ArrowRight, LayoutDashboard, Bot } from "lucide-react";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";

interface QuizCompletedModalProps {
  gameId: string;
  gameTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  starsCollected: number;
  durationSeconds: number;
  onRestart: () => void;
}

export function QuizCompletedModal({
  gameId,
  gameTitle,
  totalQuestions,
  correctAnswers,
  starsCollected,
  durationSeconds,
  onRestart,
}: QuizCompletedModalProps) {
  const { student } = useAuth();
  const [, setIsSaved] = useState(false);
  const [aiReview, setAiReview] = useState<{ message: string; tip: string } | null>(null);

  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Automatically save progress to backend and fetch Gemini AI review
  useEffect(() => {
    let isMounted = true;

    async function recordProgressAndReview() {
      // 1. Record progress if logged in
      if (student) {
        try {
          await api.progress.save({
            studentId: student.id,
            gameId,
            score: scorePercentage,
            duration: durationSeconds,
            completed: true,
          });
          if (isMounted) setIsSaved(true);
        } catch {
          // Silent fallback
        }
      }

      // 2. Fetch Gemini AI Review (Touchpoint 3)
      try {
        const review = await api.games.getReview({
          gameTitle,
          score: scorePercentage,
          correctAnswers,
          totalQuestions,
          durationSeconds,
          grade: student?.grade || 3,
        });
        if (isMounted) setAiReview(review);
      } catch {
        if (isMounted) {
          setAiReview({
            message: "Luar biasa! Kemampuan logika kodingmu makin terasah!",
            tip: "Ingat: Kunci seorang programmer hebat adalah tidak takut mencoba lagi!",
          });
        }
      }
    }

    recordProgressAndReview();

    return () => {
      isMounted = false;
    };
  }, [student, gameId, scorePercentage, durationSeconds, gameTitle, correctAnswers, totalQuestions]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        {/* Playful Floating Emojis */}
        <div className="absolute top-4 left-6 text-3xl animate-bounce">🎈</div>
        <div className="absolute top-6 right-6 text-3xl animate-pulse">✨</div>
        <div className="absolute bottom-4 left-6 text-2xl opacity-40">🌟</div>

        {/* Big Golden Trophy Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-[0_6px_0_#D97706] mb-4">
          <Trophy className="w-12 h-12 fill-amber-950" />
        </div>

        {/* Title */}
        <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 mb-1">
          Misi Selesai! 🎉
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-semibold mb-5">
          Hebat sekali! Kamu telah menyelesaikan permainan koding{" "}
          <span className="text-blue-600 font-bold">{gameTitle}</span>.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>
            <span className="font-heading text-base font-black text-slate-900">
              +{starsCollected}
            </span>
            <span className="text-[10px] font-bold text-slate-500">Bintang</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="font-heading text-base font-black text-emerald-700">
              {scorePercentage}%
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              {correctAnswers}/{totalQuestions} Benar
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mb-1">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading text-base font-black text-slate-900">
              {durationSeconds}d
            </span>
            <span className="text-[10px] font-bold text-slate-500">Durasi</span>
          </div>
        </div>

        {/* Gemini AI Performance Review Card (Touchpoint 3) */}
        {aiReview && (
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-3.5 rounded-2xl border border-amber-200 mb-5 text-left shadow-xs">
            <div className="flex items-center gap-1.5 font-heading text-xs font-bold text-amber-900 mb-1">
              <Bot className="w-4 h-4 text-amber-600" />
              <span>Catatan Belajar Kibo AI:</span>
            </div>
            <p className="text-xs text-amber-950 font-semibold mb-0.5">
              {aiReview.message}
            </p>
            <p className="text-[11px] text-amber-800 font-medium">
              💡 {aiReview.tip}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onRestart}
            className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-sm font-black py-3 rounded-full shadow-[0_4px_0_#D97706] active:translate-y-1 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Lagi Sekali Lagi</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/games"
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-blue-600 font-heading text-xs font-bold py-2.5 rounded-full border border-blue-200 shadow-[0_3px_0_#BFDBFE] active:translate-y-1 transition-all"
            >
              <span>Katalog Game</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-heading text-xs font-bold py-2.5 rounded-full shadow-[0_3px_0_#1D4ED8] active:translate-y-1 transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Lihat Dasbor</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
