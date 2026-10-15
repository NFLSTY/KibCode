"use client";

import React from "react";
import { BookOpen, CheckCircle2, Sparkles, Star } from "lucide-react";
import type { LearningModuleDTO } from "@kibcode/types";
import { getModuleCategoryTheme } from "@/lib/utils/module-category-theme";

interface ModuleCardProps {
  module: LearningModuleDTO;
  isCompleted: boolean;
  onOpen: (mod: LearningModuleDTO) => void;
}

export function ModuleCard({ module: mod, isCompleted, onOpen }: ModuleCardProps) {
  const theme = getModuleCategoryTheme(mod.category);
  const CategoryIcon = theme.icon;

  const isAdvancedAI =
    mod.difficulty >= 3 ||
    mod.category === "functions" ||
    mod.category === "events" ||
    mod.category === "game_design";

  const starsCount = mod.starsReward || 50 + mod.difficulty * 20;

  const difficultyLabels: Record<number, { label: string; stars: number }> = {
    1: { label: "Mudah", stars: 1 },
    2: { label: "Sedang", stars: 2 },
    3: { label: "Tantangan", stars: 3 },
  };

  const difficultyInfo = difficultyLabels[mod.difficulty] || {
    label: "Normal",
    stars: 1,
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-100 hover:border-blue-200 shadow-[0_8px_24px_-4px_rgba(30,41,59,0.06)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Header: Label and Order like Game Edukasi */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`p-3 rounded-2xl ${theme.bgColor} border ${theme.borderColor} group-hover:scale-110 transition-transform shadow-xs shrink-0`}
            >
              <CategoryIcon className={`w-7 h-7 ${theme.color}`} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-heading font-black text-blue-600 uppercase tracking-wider">
                Modul #{mod.order || 1}
              </span>
              <span className="text-xs font-bold text-slate-500 truncate">
                {theme.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {isAdvancedAI && (
              <span className="text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-amber-950" />
                Tingkat Lanjut AI
              </span>
            )}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200">
              {Array.from({ length: difficultyInfo.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
              <span>{difficultyInfo.label}</span>
            </div>
            {isCompleted && (
              <span className="text-[11px] font-heading font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Tuntas
              </span>
            )}
          </div>
        </div>

        <h2 className="font-heading font-black text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
          {mod.title}
        </h2>
        <p className="text-xs font-bold text-blue-600 mb-2">
          Fokus: {mod.concept}
        </p>
        <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 font-medium">
          {mod.summary}
        </p>

        {/* Meta Info: Real Star Points like Game Edukasi */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            {mod.units?.length || 3} Halaman Materi
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold shrink-0 shadow-xs flex items-center gap-1 border border-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>+{starsCount} ⭐</span>
          </span>
        </div>
      </div>

      {/* Action Button: Full-width without redundant Latihan Game button */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center">
        <button
          type="button"
          onClick={() => onOpen(mod)}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs sm:text-sm shadow-[0_3px_0_#1D4ED8] active:translate-y-0.5 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Pelajari Modul</span>
        </button>
      </div>
    </div>
  );
}
