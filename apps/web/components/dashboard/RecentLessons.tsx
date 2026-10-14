"use client";

import React from "react";
import Link from "next/link";
import { History, ArrowRight, RotateCcw, Code2, Cpu, Sparkles } from "lucide-react";
import type { GameProgressDTO } from "@kibcode/types";

interface RecentLessonsProps {
  progressList?: GameProgressDTO[];
}

export function RecentLessons({ progressList = [] }: RecentLessonsProps) {
  const hasLessons = progressList && progressList.length > 0;

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-6 h-6 text-blue-600" />
          <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
            Riwayat Tantangan Koding
          </h2>
        </div>

        <Link
          href="/games"
          className="font-heading text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
        >
          <span>Buka Semua Game</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* If no progress yet, show motivating empty state */}
      {!hasLessons ? (
        <div className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border-2 border-dashed border-slate-200 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm shrink-0 animate-slow-bounce">
              🎮
            </div>
            <div className="flex flex-col">
              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900">
                Belum ada tantangan yang kamu mainkan
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-1 max-w-lg">
                Kibo sudah menyiapkan game blok koding dan teka-teki logika seru. Mulai modul pertamamu dan kumpulkan bintang pertamamu!
              </p>
            </div>
          </div>

          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-black text-xs sm:text-sm shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all shrink-0 cursor-pointer"
          >
            <span>Mulai Main Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Real Recent Lessons from Database */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {progressList.slice(0, 3).map((progress, idx) => (
            <div
              key={progress.id || idx}
              className="bg-white rounded-3xl p-5 flex flex-col justify-between shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100 hover:-translate-y-1 transition-all"
            >
              <div className="flex flex-col gap-3">
                {/* Visual Banner */}
                <div className="relative h-28 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-inner">
                  <Code2 className="w-12 h-12 text-white/90 drop-shadow-sm" />
                  <span className="absolute top-2.5 left-2.5 px-3 py-0.5 rounded-full font-heading text-[10px] font-bold shadow-sm bg-blue-700 text-white">
                    Modul #{idx + 1}
                  </span>
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-black text-slate-900 leading-tight">
                    Tantangan Koding #{idx + 1}
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold mt-1">
                    ID Permainan: {progress.gameId}
                  </p>
                </div>

                {/* Score Pill */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
                  <span className="font-heading font-bold text-slate-400">
                    Skor Akhir:
                  </span>
                  <span className="font-heading font-black text-blue-600 flex items-center gap-1">
                    <span>{progress.score} Poin</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-2">
                <Link
                  href={`/games/${progress.gameId}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full font-heading text-xs sm:text-sm font-bold bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all min-h-[46px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
