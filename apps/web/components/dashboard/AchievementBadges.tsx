"use client";

import React from "react";
import Link from "next/link";
import { Award, Rocket, PlayCircle } from "lucide-react";

interface AchievementBadgesProps {
  completedCount?: number;
  totalScore?: number;
}

export function AchievementBadges({
  completedCount = 0,
  totalScore = 0,
}: AchievementBadgesProps) {
  const badges = [
    {
      id: "b-1",
      icon: "🌱",
      name: "Langkah Pertama",
      achieved: completedCount >= 1,
      statusText: completedCount >= 1 ? "Tercapai" : "Terkunci",
      description: "Selesaikan 1 game koding",
      badgeBg:
        completedCount >= 1
          ? "bg-emerald-50 border border-emerald-300"
          : "bg-slate-100/80 border border-slate-200 opacity-70",
    },
    {
      id: "b-2",
      icon: "⭐",
      name: "Bintang Cilik",
      achieved: totalScore >= 50,
      statusText: totalScore >= 50 ? "Tercapai" : "Terkunci",
      description: "Kumpulkan 50 poin skor",
      badgeBg:
        totalScore >= 50
          ? "bg-amber-100 border border-amber-300"
          : "bg-slate-100/80 border border-slate-200 opacity-70",
    },
    {
      id: "b-3",
      icon: "🧮",
      name: "Jago Hitung",
      achieved: totalScore >= 150,
      statusText: totalScore >= 150 ? "Tercapai" : "Terkunci",
      description: "Kumpulkan 150 poin skor",
      badgeBg:
        totalScore >= 150
          ? "bg-blue-100 border border-blue-300"
          : "bg-slate-100/80 border border-slate-200 opacity-70",
    },
    {
      id: "b-4",
      icon: "🚀",
      name: "Petualang Koding",
      achieved: completedCount >= 5,
      statusText: completedCount >= 5 ? "Tercapai" : "Terkunci",
      description: "Selesaikan 5 game koding",
      badgeBg:
        completedCount >= 5
          ? "bg-purple-100 border border-purple-300"
          : "bg-slate-100/80 border border-slate-200 opacity-70",
    },
    {
      id: "b-5",
      icon: "⚡",
      name: "Kilat Juara",
      achieved: totalScore >= 300,
      statusText: totalScore >= 300 ? "Tercapai" : "Terkunci",
      description: "Kumpulkan 300 poin skor",
      badgeBg:
        totalScore >= 300
          ? "bg-amber-100 border border-amber-300"
          : "bg-slate-100/80 border border-slate-200 opacity-70",
    },
  ];

  const achievedCount = badges.filter((b) => b.achieved).length;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100 flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
            Koleksi Lencana Prestasi
          </h2>
        </div>
        <span className="font-heading text-xs sm:text-sm font-bold text-slate-500">
          Terkumpul:{" "}
          <strong className="text-blue-600 font-black">
            {achievedCount} dari {badges.length}
          </strong>{" "}
          Lencana
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className={`flex flex-col items-center text-center p-4 rounded-2xl transition-transform hover:scale-105 cursor-pointer ${b.badgeBg}`}
          >
            <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md text-3xl mb-2.5">
              {b.achieved ? b.icon : "🔒"}
            </div>

            <span className="font-heading text-xs sm:text-sm font-black text-slate-900">
              {b.name}
            </span>

            <span
              className={`font-heading text-[11px] font-bold mt-0.5 ${
                b.achieved ? "text-emerald-700" : "text-slate-400"
              }`}
            >
              {b.statusText}
            </span>

            <span className="text-[11px] font-semibold text-slate-500 mt-1">
              {b.description}
            </span>
          </div>
        ))}
      </div>

      {/* Motivational CTA Banner */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-base sm:text-lg font-black text-slate-900">
              Selesaikan tantangan koding untuk membuka lencana baru!
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Semua pencapaian dan skor kodingmu tersimpan otomatis di akunmu.
            </p>
          </div>
        </div>

        <Link
          href="/games"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-950 px-7 py-3 rounded-full font-heading text-sm sm:text-base font-black shadow-[0_4px_0_#D97706] active:translate-y-1 active:shadow-[0_1px_0_#D97706] transition-all whitespace-nowrap min-h-[48px]"
        >
          <PlayCircle className="w-5 h-5" />
          <span>Mulai Belajar Sekarang</span>
        </Link>
      </div>
    </section>
  );
}
