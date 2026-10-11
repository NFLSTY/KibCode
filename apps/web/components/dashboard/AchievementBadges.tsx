"use client";

import React from "react";
import Link from "next/link";
import { Award, Rocket, PlayCircle } from "lucide-react";

interface BadgeItem {
  id: string;
  icon: string;
  name: string;
  status: "achieved" | "in_progress" | "locked";
  statusText: string;
  description: string;
  progressTag?: string;
  badgeBg: string;
}

export function AchievementBadges() {
  const badges: BadgeItem[] = [
    {
      id: "b-1",
      icon: "🌟",
      name: "Bintang Cilik",
      status: "achieved",
      statusText: "Tercapai",
      description: "Selesaikan 10 misi",
      badgeBg: "bg-amber-100 border border-amber-300",
    },
    {
      id: "b-2",
      icon: "🔢",
      name: "Jago Hitung",
      status: "achieved",
      statusText: "Tercapai",
      description: "Skor 100 Matematika",
      badgeBg: "bg-blue-100 border border-blue-300",
    },
    {
      id: "b-3",
      icon: "📚",
      name: "Kutu Buku",
      status: "achieved",
      statusText: "Tercapai",
      description: "Membaca 5 cerita",
      badgeBg: "bg-rose-100 border border-rose-300",
    },
    {
      id: "b-4",
      icon: "⚡",
      name: "Kilat Juara",
      status: "in_progress",
      statusText: "Sedang Berjalan",
      description: "9 dari 10 kuis kilat",
      progressTag: "9/10",
      badgeBg: "bg-amber-50/80 border border-amber-200",
    },
    {
      id: "b-5",
      icon: "🔒",
      name: "Misteri",
      status: "locked",
      statusText: "Terkunci",
      description: "Buka di Level 4",
      badgeBg: "bg-slate-100 border border-slate-200 opacity-75",
    },
  ];

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
          Terkumpul: <strong className="text-blue-600 font-black">3 dari 5</strong>{" "}
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
            <div className="relative w-18 h-18 rounded-full bg-white flex items-center justify-center shadow-md text-3xl mb-2.5">
              {b.icon}
              {b.progressTag && (
                <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                  {b.progressTag}
                </span>
              )}
            </div>

            <span className="font-heading text-sm font-black text-slate-900">
              {b.name}
            </span>

            <span
              className={`font-heading text-[11px] font-bold mt-0.5 ${
                b.status === "achieved"
                  ? "text-emerald-700"
                  : b.status === "in_progress"
                  ? "text-blue-600"
                  : "text-slate-400"
              }`}
            >
              {b.statusText}
            </span>

            <span className="text-[11px] font-medium text-slate-500 mt-1">
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
              Yuk, selesaikan 1 kuis lagi untuk membuka lencana baru!
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Lencana &quot;Kilat Juara&quot; akan otomatis ditambahkan ke petimu.
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
