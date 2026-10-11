"use client";

import React from "react";
import Link from "next/link";
import { History, ArrowRight, RotateCcw, Calculator, BookOpen, SpellCheck } from "lucide-react";
import type { GameProgressDTO } from "@edukids/types";

interface RecentLessonItem {
  id: string;
  gameId: string;
  title: string;
  category: "math" | "spelling" | "reading";
  subtitle: string;
  score: number;
}

interface RecentLessonsProps {
  progressList?: GameProgressDTO[];
}

export function RecentLessons({ progressList }: RecentLessonsProps) {
  // Default sample lessons if student hasn't played yet
  const defaultLessons: RecentLessonItem[] = [
    {
      id: "rec-1",
      gameId: "math-quick-sum",
      title: "Penjumlahan Cepat",
      category: "math",
      subtitle: "Berhitung seru puluhan dan ratusan",
      score: 100,
    },
    {
      id: "rec-2",
      gameId: "reading-fabel-kancil",
      title: "Petualangan Fabel Kancil",
      category: "reading",
      subtitle: "Memahami amanat & dongeng nusantara",
      score: 90,
    },
    {
      id: "rec-3",
      gameId: "spelling-susun-kata",
      title: "Susun Kata Ceria",
      category: "spelling",
      subtitle: "Menyusun huruf vokal dan konsonan",
      score: 85,
    },
  ];

  const lessons: RecentLessonItem[] =
    progressList && progressList.length > 0
      ? progressList.slice(0, 3).map((p, idx) => ({
          id: p.id,
          gameId: p.gameId,
          title:
            p.gameId === "math-quick-sum"
              ? "Penjumlahan Cepat"
              : p.gameId === "reading-fabel-kancil"
              ? "Petualangan Fabel Kancil"
              : p.gameId === "spelling-susun-kata"
              ? "Susun Kata Ceria"
              : `Game Edukasi #${idx + 1}`,
          category: (p.gameId.includes("math")
            ? "math"
            : p.gameId.includes("reading")
            ? "reading"
            : "spelling") as "math" | "spelling" | "reading",
          subtitle: "Latihan pemahaman konsep mandiri",
          score: p.score,
        }))
      : defaultLessons;

  const getCategoryStyles = (category: "math" | "spelling" | "reading") => {
    switch (category) {
      case "math":
        return {
          name: "Matematika",
          icon: Calculator,
          bg: "bg-blue-500",
          tagBg: "bg-blue-600 text-white",
          btnBg: "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_0_#1D4ED8]",
        };
      case "reading":
        return {
          name: "Membaca",
          icon: BookOpen,
          bg: "bg-amber-400",
          tagBg: "bg-amber-500 text-amber-950",
          btnBg: "bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-[0_4px_0_#D97706]",
        };
      case "spelling":
        return {
          name: "Mengeja",
          icon: SpellCheck,
          bg: "bg-rose-500",
          tagBg: "bg-rose-600 text-white",
          btnBg: "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_4px_0_#BE123C]",
        };
    }
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-6 h-6 text-blue-600" />
          <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
            Pelajaran Terakhir
          </h2>
        </div>

        <Link
          href="/games"
          className="font-heading text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
        >
          <span>Lihat Riwayat Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {lessons.map((lesson) => {
          const cat = getCategoryStyles(lesson.category);
          const CatIcon = cat.icon;

          return (
            <div
              key={lesson.id}
              className="bg-white rounded-3xl p-5 flex flex-col justify-between shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100 hover:-translate-y-1 transition-all"
            >
              <div className="flex flex-col gap-3">
                {/* Visual Banner */}
                <div
                  className={`relative h-32 rounded-2xl overflow-hidden flex items-center justify-center ${cat.bg} shadow-inner`}
                >
                  <CatIcon className="w-14 h-14 text-white/90 drop-shadow-sm" />
                  <span
                    className={`absolute top-2.5 left-2.5 px-3 py-0.5 rounded-full font-heading text-xs font-bold shadow-sm ${cat.tagBg}`}
                  >
                    {cat.name}
                  </span>
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-heading text-lg font-black text-slate-900 leading-tight">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Score Pill */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
                  <span className="font-heading font-bold text-slate-400">
                    Nilai Kamu:
                  </span>
                  <span className="font-heading font-bold text-slate-900 flex items-center gap-1">
                    <span className="font-black text-blue-600">
                      {lesson.score}/100
                    </span>{" "}
                    ⭐ {lesson.score >= 90 ? "Sempurna!" : "Hebat!"}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-2">
                <Link
                  href={`/games/${lesson.gameId}`}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full font-heading text-sm font-bold active:translate-y-1 transition-all min-h-[46px] ${cat.btnBg}`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
