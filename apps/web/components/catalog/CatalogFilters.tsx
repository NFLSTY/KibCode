"use client";

import React from "react";
import { LayoutGrid, ArrowDownUp } from "lucide-react";
import type { GameCategory } from "@kibcode/types";

export type FilterCategory = "all" | GameCategory;
export type SortOption = "popular" | "stars" | "difficulty-asc" | "difficulty-desc";

interface CatalogFiltersProps {
  currentCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  counts: Record<string, number>;
  currentSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  grade?: number;
}

export function CatalogFilters({
  currentCategory,
  onSelectCategory,
  counts,
  currentSort,
  onSelectSort,
}: CatalogFiltersProps) {
  const categories: Array<{
    id: FilterCategory;
    label: string;
    icon: React.ReactNode;
    count: number;
  }> = [
    {
      id: "all",
      label: "Semua Koding",
      icon: <LayoutGrid className="w-5 h-5" />,
      count: counts.all || 0,
    },
    {
      id: "logic",
      label: "Logika Urutan",
      icon: <span className="text-lg">🧩</span>,
      count: counts.logic || 0,
    },
    {
      id: "loops",
      label: "Perulangan (Loop)",
      icon: <span className="text-lg">🔄</span>,
      count: counts.loops || 0,
    },
    {
      id: "conditionals",
      label: "Jika-Maka (If-Else)",
      icon: <span className="text-lg">⚡</span>,
      count: counts.conditionals || 0,
    },
    {
      id: "debugging",
      label: "Pemburu Bug",
      icon: <span className="text-lg">🐛</span>,
      count: counts.debugging || 0,
    },
    {
      id: "algorithms",
      label: "Variabel & Data",
      icon: <span className="text-lg">📦</span>,
      count: counts.algorithms || 0,
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 py-2">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-sm sm:text-base font-bold whitespace-nowrap min-h-[48px] transition-all duration-150 active:translate-y-1 cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_4px_0_#1D4ED8]"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-[0_4px_0_#E2E8F0]"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sorting & Grade Badge */}
      <div className="flex items-center gap-3 flex-wrap self-end lg:self-auto">
        {/* Sort Select */}
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-slate-200 shadow-[0_2px_0_#E2E8F0] min-h-[48px]">
          <ArrowDownUp className="w-4 h-4 text-blue-600" />
          <span className="text-xs sm:text-sm font-bold text-slate-500">
            Urutan:
          </span>
          <select
            value={currentSort}
            onChange={(e) => onSelectSort(e.target.value as SortOption)}
            className="bg-transparent font-heading text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="popular">Paling Populer 🔥</option>
            <option value="stars">Bintang Tertinggi ⭐</option>
            <option value="difficulty-asc">Level Terendah</option>
            <option value="difficulty-desc">Level Tertinggi</option>
          </select>
        </div>
      </div>
    </section>
  );
}
