"use client";

import React, { useState } from "react";
import { Sparkles, Gamepad2, Award, Wand2, Star, X, CheckCircle2, Trophy } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";

export interface StarMasteryCategory {
  completed: number;
  total: number;
}

export interface StarMasteryBreakdown {
  star1: StarMasteryCategory;
  star2: StarMasteryCategory;
  star3: StarMasteryCategory;
}

interface CatalogHeroProps {
  totalGames: number;
  grade?: number;
  onOpenAIGenerator?: () => void;
  starMastery?: StarMasteryBreakdown;
}

export function CatalogHero({
  totalGames,
  grade = 3,
  onOpenAIGenerator,
  starMastery = {
    star1: { completed: 0, total: 0 },
    star2: { completed: 0, total: 0 },
    star3: { completed: 0, total: 0 },
  },
}: CatalogHeroProps) {
  const [isMasteryOpen, setIsMasteryOpen] = useState(false);

  const totalCompleted =
    starMastery.star1.completed +
    starMastery.star2.completed +
    starMastery.star3.completed;

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-10 text-white shadow-xl">
        {/* Decorative Blur Spheres */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-44 h-44 rounded-full bg-amber-400/20 pointer-events-none blur-xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Text & Badges */}
          <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md self-center md:self-start w-fit border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-blue-100">
                Arena Petualangan Koding SD
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-3 flex-wrap">
              Game Edukasi Koding
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
              Tantangan logika koding terstruktur untuk melatih computational thinking siswa SD.
            </p>

            {/* Quick Stats Ribbon & AI Trigger */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold border border-white/10">
                <Gamepad2 className="w-4 h-4" />
                <span>{totalGames} Game Edukasi Aktif</span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs sm:text-sm font-bold shadow-sm">
                <Award className="w-4 h-4" />
                <span>Target: Kelas {grade} SD</span>
              </div>

              {onOpenAIGenerator && (
                <button
                  type="button"
                  onClick={onOpenAIGenerator}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-heading text-xs sm:text-sm font-black shadow-[0_3px_0_#B45309] active:translate-y-1 transition-all cursor-pointer"
                >
                  <Wand2 className="w-4 h-4 fill-amber-950" />
                  <span>Rakit Game Baru dengan AI</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Interactive Kibo Button (No text, clickable star mastery viewer) */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsMasteryOpen(true)}
              title="Lihat pencapaian bintang game edukasi"
              aria-label="Lihat pencapaian bintang game edukasi"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center p-2 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/40 focus:outline-none focus:ring-4 focus:ring-amber-300 group"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-300 to-amber-400 flex items-center justify-center shadow-[0_5px_0_#D97706] relative overflow-hidden">
                <KiboLogo size={76} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Star Mastery Modal */}
      {isMasteryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-slate-100 relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsMasteryOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Pencapaian Bintang Game
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {totalCompleted} dari {totalGames} game telah diselesaikan
                </p>
              </div>
            </div>

            {/* Star Levels List */}
            <div className="flex flex-col gap-3 mb-6">
              {/* 1 Star: Mudah */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="font-heading text-sm font-bold text-slate-800">
                      Level 1: Mudah
                    </span>
                  </div>
                  <span className="font-heading text-xs font-bold text-slate-600">
                    {starMastery.star1.completed} / {starMastery.star1.total} Selesai
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        starMastery.star1.total > 0
                          ? Math.round(
                              (starMastery.star1.completed / starMastery.star1.total) * 100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* 2 Stars: Sedang */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500 gap-0.5">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="font-heading text-sm font-bold text-slate-800">
                      Level 2: Sedang
                    </span>
                  </div>
                  <span className="font-heading text-xs font-bold text-slate-600">
                    {starMastery.star2.completed} / {starMastery.star2.total} Selesai
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        starMastery.star2.total > 0
                          ? Math.round(
                              (starMastery.star2.completed / starMastery.star2.total) * 100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* 3 Stars: Tantangan */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500 gap-0.5">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="font-heading text-sm font-bold text-slate-800">
                      Level 3: Tantangan
                    </span>
                  </div>
                  <span className="font-heading text-xs font-bold text-slate-600">
                    {starMastery.star3.completed} / {starMastery.star3.total} Selesai
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        starMastery.star3.total > 0
                          ? Math.round(
                              (starMastery.star3.completed / starMastery.star3.total) * 100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Dismiss Button */}
            <button
              type="button"
              onClick={() => setIsMasteryOpen(false)}
              className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading text-sm font-bold shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
