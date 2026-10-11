"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Star, Clock, CheckCircle, RotateCcw, ArrowRight, LayoutDashboard } from "lucide-react";
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
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Automatically save progress to backend if student is logged in
  useEffect(() => {
    let isMounted = true;

    async function recordProgress() {
      if (!student) return;

      try {
        await api.progress.save({
          studentId: student.id,
          gameId,
          score: scorePercentage,
          duration: durationSeconds,
          completed: true,
        });

        if (isMounted) setIsSaved(true);
      } catch (err) {
        if (isMounted) setSaveError("Progres offline tersimpan lokal.");
      }
    }

    recordProgress();

    return () => {
      isMounted = false;
    };
  }, [student, gameId, scorePercentage, durationSeconds]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        {/* Playful Floating Emojis */}
        <div className="absolute top-4 left-6 text-3xl animate-bounce">🎈</div>
        <div className="absolute top-6 right-6 text-3xl animate-pulse">✨</div>
        <div className="absolute bottom-4 left-6 text-2xl opacity-40">🌟</div>

        {/* Big Golden Trophy Icon */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-[0_6px_0_#D97706] mb-5">
          <Trophy className="w-14 h-14 fill-amber-950" />
        </div>

        {/* Title */}
        <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 mb-1">
          Petualangan Selesai! 🎉
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-semibold mb-6">
          Hebat sekali! Kamu telah menyelesaikan permainan{" "}
          <span className="text-blue-600 font-bold">{gameTitle}</span>.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 bg-blue-50/70 p-4 rounded-2xl border border-blue-100 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mb-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <span className="font-heading text-lg font-black text-slate-900">
              +{starsCollected}
            </span>
            <span className="text-[11px] font-bold text-slate-500">Bintang</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="font-heading text-lg font-black text-emerald-700">
              {scorePercentage}%
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {correctAnswers}/{totalQuestions} Benar
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-heading text-lg font-black text-slate-900">
              {durationSeconds}d
            </span>
            <span className="text-[11px] font-bold text-slate-500">Durasi</span>
          </div>
        </div>

        {/* Save Status Notification */}
        {student ? (
          <p className="text-xs font-bold text-emerald-700 mb-6 flex items-center justify-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Skor tersimpan ke profil {student.name}!</span>
          </p>
        ) : (
          <p className="text-xs font-bold text-amber-800 mb-6">
            💡 Masuk akun agar skor &amp; bintang tersimpan permanen di Dasbor!
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-base font-black py-3.5 rounded-full shadow-[0_4px_0_#D97706] active:translate-y-1 transition-all min-h-[48px]"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Lagi Sekali Lagi</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/games"
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-blue-600 font-heading text-sm font-bold py-3 rounded-full border border-blue-200 shadow-[0_3px_0_#BFDBFE] active:translate-y-1 transition-all min-h-[48px]"
            >
              <span>Katalog Game</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-heading text-sm font-bold py-3 rounded-full shadow-[0_3px_0_#1D4ED8] active:translate-y-1 transition-all min-h-[48px]"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Lihat Dasbor</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
