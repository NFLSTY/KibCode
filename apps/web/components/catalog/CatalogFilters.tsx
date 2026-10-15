"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  LayoutGrid,
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  Code2,
  Repeat,
  GitBranch,
  Box,
  Bug,
  PieChart,
  Zap,
  Play,
  Gamepad2,
} from "lucide-react";
import type { GameCategory } from "@kibcode/types";

export type FilterCategory = "all" | GameCategory;
export type SortOption =
  | "popular"
  | "stars"
  | "difficulty-asc"
  | "difficulty-desc"
  | "uncompleted"
  | "completed";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories: Array<{
    id: FilterCategory;
    label: string;
    icon: React.ReactNode;
    count: number;
  }> = [
    {
      id: "all",
      label: "Semua Game",
      icon: <LayoutGrid className="w-5 h-5 text-blue-600" />,
      count: counts.all || 0,
    },
    {
      id: "logic",
      label: "Logika Urutan",
      icon: <Code2 className="w-5 h-5 text-blue-600" />,
      count: counts.logic || 0,
    },
    {
      id: "loops",
      label: "Perulangan (Loop)",
      icon: <Repeat className="w-5 h-5 text-amber-500" />,
      count: counts.loops || 0,
    },
    {
      id: "conditionals",
      label: "Jika-Maka (If-Else)",
      icon: <GitBranch className="w-5 h-5 text-purple-600" />,
      count: counts.conditionals || 0,
    },
    {
      id: "variables",
      label: "Variabel & Data",
      icon: <Box className="w-5 h-5 text-teal-600" />,
      count: counts.variables || 0,
    },
    {
      id: "debugging",
      label: "Pemburu Bug",
      icon: <Bug className="w-5 h-5 text-rose-500" />,
      count: counts.debugging || 0,
    },
    {
      id: "algorithms",
      label: "Algoritma Solusi",
      icon: <PieChart className="w-5 h-5 text-emerald-600" />,
      count: counts.algorithms || 0,
    },
  ];

  if ((counts.functions || 0) > 0) {
    categories.push({
      id: "functions" as FilterCategory,
      label: "Fungsi & Blok",
      icon: <Zap className="w-5 h-5 text-indigo-600" />,
      count: counts.functions || 0,
    });
  }

  if ((counts.events || 0) > 0) {
    categories.push({
      id: "events" as FilterCategory,
      label: "Event & Sensor",
      icon: <Play className="w-5 h-5 text-orange-500" />,
      count: counts.events || 0,
    });
  }

  if ((counts.game_design || 0) > 0) {
    categories.push({
      id: "game_design" as FilterCategory,
      label: "Desain Game",
      icon: <Gamepad2 className="w-5 h-5 text-violet-600" />,
      count: counts.game_design || 0,
    });
  }

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
    }
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, counts]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const distance = 260;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 py-2">
      {/* Category Filter Pills with Left and Right Scroll Navigation */}
      <div className="flex-1 min-w-0 flex items-center gap-1.5 sm:gap-2">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          title="Geser kategori ke kiri"
          aria-label="Geser kategori ke kiri"
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-150 select-none ${
            canScrollLeft
              ? "bg-white hover:bg-blue-50 text-blue-600 border-slate-200 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
          }`}
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Scrollable Pills Container */}
        <div
          ref={scrollRef}
          className="flex-1 min-w-0 flex items-center gap-2.5 overflow-x-auto py-1 scroll-smooth scrollbar-none"
        >
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-sm sm:text-base font-bold whitespace-nowrap min-h-[48px] transition-all duration-150 active:translate-y-1 cursor-pointer shrink-0 ${
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

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          title="Geser kategori ke kanan"
          aria-label="Geser kategori ke kanan"
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-150 select-none ${
            canScrollRight
              ? "bg-white hover:bg-blue-50 text-blue-600 border-slate-200 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
          }`}
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Sorting Select */}
      <div className="flex items-center gap-3 flex-wrap self-end lg:self-auto shrink-0 z-10">
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
            <option value="popular">Rekomendasi Utama</option>
            <option value="stars">Bintang Terbanyak</option>
            <option value="difficulty-asc">Level Termudah</option>
            <option value="difficulty-desc">Level Tersulit</option>
            <option value="uncompleted">Belum Selesai</option>
            <option value="completed">Sudah Selesai</option>
          </select>
        </div>
      </div>
    </section>
  );
}
