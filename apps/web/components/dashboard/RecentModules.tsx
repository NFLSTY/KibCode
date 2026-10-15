"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import type { GameCategory } from "@kibcode/types";
import { getModuleCategoryTheme } from "@/lib/utils/module-category-theme";

export interface RecentModuleRecord {
  id: string;
  order?: number;
  category: GameCategory;
  title: string;
  concept: string;
  difficulty: number;
  starsReward: number;
  isCompleted: boolean;
  lastAccessedAt: number;
}

interface RecentModulesProps {
  recentModules?: RecentModuleRecord[];
}

export function RecentModules({ recentModules = [] }: RecentModulesProps) {
  const hasModules = recentModules && recentModules.length > 0;

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
            Riwayat Modul Belajar
          </h2>
        </div>

        <Link
          href="/kurikulum"
          className="font-heading text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
        >
          <span>Buka Semua Modul</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* If no module accessed yet, show motivating empty state */}
      {!hasModules ? (
        <div className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border-2 border-dashed border-slate-200 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-3xl shadow-sm shrink-0">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900">
                Belum ada modul yang kamu pelajari
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-1 max-w-lg">
                Robot Kibo sudah menyiapkan 18 modul belajar koding interaktif. Pelajari teori, pahami pola kode, dan buktikan pemahamanmu lewat kuis pemahaman!
              </p>
            </div>
          </div>

          <Link
            href="/kurikulum"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-black text-xs sm:text-sm shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all shrink-0 cursor-pointer"
          >
            <span>Mulai Belajar Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Real Recent Modules */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentModules.slice(0, 3).map((item, idx) => {
            const theme = getModuleCategoryTheme(item.category);
            const CategoryIcon = theme.icon;

            return (
              <div
                key={item.id || idx}
                className="bg-white rounded-3xl p-5 flex flex-col justify-between shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100 hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col gap-3">
                  {/* Visual Banner */}
                  <div
                    className="relative h-28 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-inner"
                  >
                    <CategoryIcon className="w-12 h-12 text-white/90 drop-shadow-sm" />
                    <span className="absolute top-2.5 left-2.5 px-3 py-0.5 rounded-full font-heading text-[10px] font-bold shadow-sm bg-blue-700 text-white">
                      Modul #{item.order || idx + 1}
                    </span>
                    {item.isCompleted ? (
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full font-heading text-[10px] font-bold shadow-sm bg-emerald-500 text-white flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Tuntas
                      </span>
                    ) : (
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full font-heading text-[10px] font-bold shadow-sm bg-white/20 text-white backdrop-blur-xs">
                        Level {item.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-black text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold mt-1">
                      Fokus: {item.concept}
                    </p>
                  </div>

                  {/* Status & Star Reward Pill */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
                    <span className="font-heading font-bold text-slate-400">
                      Reward:
                    </span>
                    <span className="font-heading font-black text-amber-600 flex items-center gap-1">
                      <span>+{item.starsReward}</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-4 mt-2">
                  <Link
                    href={`/kurikulum?open=${item.id}`}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full font-heading text-xs sm:text-sm font-bold active:translate-y-1 transition-all min-h-[46px] ${
                      item.isCompleted
                        ? "bg-slate-700 hover:bg-slate-800 text-white shadow-[0_4px_0_#1E293B]"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_0_#1D4ED8]"
                    }`}
                  >
                    {item.isCompleted ? (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        <span>Pelajari Lagi</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        <span>Lanjutkan Belajar</span>
                      </>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
