"use client";

import React from "react";
import Link from "next/link";
import {
  Calculator,
  BookOpen,
  SpellCheck,
  Star,
  Zap,
  Play,
  Lock,
  Clock,
  PieChart,
  Code2,
  Repeat,
  GitBranch,
  Bug,
  Box,
} from "lucide-react";
import type { CatalogGameItem } from "@/lib/constants/catalog-games";

interface GameCardProps {
  game: CatalogGameItem;
}

export function GameCard({ game }: GameCardProps) {
  // Category styling presets for coding tracks
  const getCategoryTheme = () => {
    switch (game.category) {
      case "logic":
        return {
          name: "Logika Urutan",
          icon: Code2,
          bannerBg: "bg-blue-600",
          tagBg: "bg-blue-700 text-white",
          btnColor:
            "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_0_#1D4ED8]",
          progressBar: "bg-blue-600",
          cardBorder: "border-blue-100 hover:border-blue-300",
        };
      case "loops":
        return {
          name: "Perulangan (Loop)",
          icon: Repeat,
          bannerBg: "bg-amber-500",
          tagBg: "bg-amber-600 text-amber-950 font-black",
          btnColor:
            "bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-[0_4px_0_#D97706]",
          progressBar: "bg-amber-500",
          cardBorder: "border-amber-100 hover:border-amber-300",
        };
      case "conditionals":
        return {
          name: "Jika-Maka (If-Else)",
          icon: GitBranch,
          bannerBg: "bg-purple-600",
          tagBg: "bg-purple-700 text-white",
          btnColor:
            "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_4px_0_#6B21A8]",
          progressBar: "bg-purple-600",
          cardBorder: "border-purple-100 hover:border-purple-300",
        };
      case "debugging":
        return {
          name: "Pemburu Bug",
          icon: Bug,
          bannerBg: "bg-rose-500",
          tagBg: "bg-rose-600 text-white",
          btnColor:
            "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_4px_0_#BE123C]",
          progressBar: "bg-rose-500",
          cardBorder: "border-rose-100 hover:border-rose-300",
        };
      case "variables":
        return {
          name: "Variabel & Data",
          icon: Box,
          bannerBg: "bg-teal-600",
          tagBg: "bg-teal-700 text-white",
          btnColor:
            "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_4px_0_#0F766E]",
          progressBar: "bg-teal-600",
          cardBorder: "border-teal-100 hover:border-teal-300",
        };
      case "algorithms":
        return {
          name: "Algoritma Solusi",
          icon: PieChart,
          bannerBg: "bg-emerald-600",
          tagBg: "bg-emerald-700 text-white",
          btnColor:
            "bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_0_#047857]",
          progressBar: "bg-emerald-600",
          cardBorder: "border-emerald-100 hover:border-emerald-300",
        };
      case "math":
        return {
          name: "Logika Hitung",
          icon: Calculator,
          bannerBg: "bg-blue-500",
          tagBg: "bg-blue-600 text-white",
          btnColor:
            "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_0_#1D4ED8]",
          progressBar: "bg-blue-500",
          cardBorder: "border-blue-100 hover:border-blue-300",
        };
      default:
        return {
          name: "Modul Koding",
          icon: Code2,
          bannerBg: "bg-indigo-600",
          tagBg: "bg-indigo-700 text-white",
          btnColor: "bg-blue-600 text-white shadow-[0_4px_0_#1D4ED8]",
          progressBar: "bg-blue-600",
          cardBorder: "border-slate-200 hover:border-blue-300",
        };
    }
  };

  const theme = getCategoryTheme();
  const CategoryIcon = theme.icon;

  const difficultyLabels: Record<number, { label: string; stars: number }> = {
    1: { label: "Mudah", stars: 1 },
    2: { label: "Sedang", stars: 2 },
    3: { label: "Tantangan", stars: 3 },
  };

  const difficultyInfo = difficultyLabels[game.difficulty] || {
    label: "Normal",
    stars: 1,
  };

  return (
    <div
      className={`group flex flex-col justify-between bg-white rounded-3xl p-5 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border-2 ${
        game.isLocked
          ? "border-slate-200 opacity-90 bg-slate-50/50"
          : `${theme.cardBorder} hover:-translate-y-1.5 transition-all duration-200`
      }`}
    >
      <div>
        {/* Visual Artwork Banner */}
        <div
          className={`relative w-full h-44 rounded-2xl overflow-hidden flex items-center justify-center mb-4 ${theme.bannerBg} shadow-inner`}
        >
          {/* Animated Themed Graphic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />

          {/* Center Playful Icon */}
          <div className="relative z-10 flex flex-col items-center gap-1 text-white select-none">
            <CategoryIcon className="w-16 h-16 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
            <span className="font-heading text-sm font-bold opacity-90 drop-shadow-sm">
              Level {game.difficulty}
            </span>
          </div>

          {/* Category Tag (Top Left) */}
          <div
            className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${theme.tagBg}`}
          >
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{theme.name}</span>
          </div>

          {/* Difficulty Rating (Top Right) */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-amber-900 text-xs font-bold shadow-sm backdrop-blur-sm">
            {Array.from({ length: difficultyInfo.stars }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
            <span>{difficultyInfo.label}</span>
          </div>

          {/* Locked State Backdrop Overlay */}
          {game.isLocked && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white gap-2 p-3 text-center z-20">
              <div className="w-12 h-12 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6" />
              </div>
              <span className="font-heading text-xs font-bold bg-slate-900/80 px-3 py-1 rounded-full">
                {game.lockedReason || "Terkunci"}
              </span>
            </div>
          )}
        </div>

        {/* Title & Star Reward Pill */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {game.title}
          </h3>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold shrink-0 shadow-sm flex items-center gap-1 border border-amber-300">
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>+{game.starsReward} ⭐</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-sm font-medium line-clamp-2 mb-4 leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Progress & CTA Area */}
      <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
        {game.isLocked ? (
          <>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {game.badgeTag === "Segera Hadir"
                  ? "Rilis otomatis hari Senin pukul 08:00 WIB"
                  : "Butuh bintang ekstra untuk membuka"}
              </span>
            </div>

            <button
              disabled
              type="button"
              className="w-full h-12 rounded-full font-heading text-sm sm:text-base font-bold bg-slate-200 text-slate-400 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{game.badgeTag || "Terkunci"}</span>
            </button>
          </>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${theme.progressBar}`}
                style={{ width: `${game.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Selesai {game.progressPercent}%</span>
              <span>Rekor: {game.recordScore} Poin</span>
            </div>

            {/* Play Button */}
            <Link
              href={`/games/${game.id}`}
              className={`w-full h-12 rounded-full font-heading text-base font-bold active:translate-y-1 transition-all flex items-center justify-center gap-2 min-h-[48px] ${theme.btnColor}`}
            >
              <span>Main Sekarang</span>
              <Play className="w-4 h-4 fill-current" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
