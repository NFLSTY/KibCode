"use client";

import React, { useState } from "react";
import { Award, Lock, Sparkles, X, ChevronRight, CheckCircle2 } from "lucide-react";
import type { BadgeData } from "./types";

interface ProfileBadgesProps {
  completedGames?: number;
  totalScore?: number;
}

export function ProfileBadges({
  completedGames = 0,
  totalScore = 0,
}: ProfileBadgesProps) {
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);

  // Dynamic badges computed strictly from student's database records
  const badges: BadgeData[] = [
    {
      id: "badge_1",
      name: "Langkah Pertama",
      description: "Lencana petualang untuk murid yang menyelesaikan game edukasi pertamanya.",
      criteria: "Selesaikan minimal 1 game edukasi",
      icon: "🌱",
      category: "adventure",
      unlocked: completedGames >= 1,
      accentColor: "emerald",
    },
    {
      id: "badge_2",
      name: "Bintang Cilik",
      description: "Berhasil mengumpulkan 50 poin pertama dari berbagai modul latihan.",
      criteria: "Kumpulkan minimal 50 poin skor",
      icon: "⭐",
      category: "math",
      unlocked: totalScore >= 50,
      accentColor: "amber",
    },
    {
      id: "badge_3",
      name: "Jago Hitung",
      description: "Logika matematika dan problem solving semakin terasah tajam.",
      criteria: "Kumpulkan minimal 150 poin skor",
      icon: "🧮",
      category: "math",
      unlocked: totalScore >= 150,
      accentColor: "blue",
    },
    {
      id: "badge_4",
      name: "Petualang Koding",
      description: "Tekun menyelesaikan modul visual block coding dan algoritma dasar.",
      criteria: "Selesaikan minimal 5 game edukasi",
      icon: "🚀",
      category: "coding",
      unlocked: completedGames >= 5,
      accentColor: "purple",
    },
    {
      id: "badge_5",
      name: "Kilat Juara",
      description: "Berpikir cepat dan tanggap dalam menyelesaikan kuis dan tantangan koding.",
      criteria: "Kumpulkan minimal 300 poin skor",
      icon: "⚡",
      category: "streak",
      unlocked: totalScore >= 300,
      accentColor: "amber",
    },
    {
      id: "badge_6",
      name: "Master Algoritma",
      description: "Tuntas menyelesaikan 10 petualangan belajar di arena koding KibCode.",
      criteria: "Selesaikan minimal 10 game edukasi",
      icon: "🧩",
      category: "coding",
      unlocked: completedGames >= 10,
      accentColor: "blue",
    },
    {
      id: "badge_7",
      name: "Juara AI Cilik",
      description: "Menguasai dasar kecerdasan buatan dan tantangan problem solving lanjutan.",
      criteria: "Selesaikan minimal 20 game edukasi",
      icon: "🤖",
      category: "adventure",
      unlocked: completedGames >= 20,
      accentColor: "emerald",
    },
    {
      id: "badge_8",
      name: "Mahkota Prestasi",
      description: "Penjelajah legendaris dengan skor fantastis melampaui 1.000 poin!",
      criteria: "Kumpulkan minimal 1.000 poin skor",
      icon: "👑",
      category: "streak",
      unlocked: totalScore >= 1000,
      accentColor: "rose",
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalCount = badges.length;

  return (
    <section className="flex flex-col gap-4 sm:gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500 fill-amber-400" />
            <span>Koleksi Lencana Prestasi</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            <strong className="text-blue-600 font-bold">{unlockedCount} dari {totalCount}</strong>{" "}
            lencana telah berhasil kamu buka!
          </p>
        </div>

        <button
          type="button"
          onClick={() => badges[0] && setSelectedBadge(badges[0])}
          className="inline-flex items-center gap-1 font-heading text-xs sm:text-sm text-blue-600 font-bold hover:underline self-start sm:self-auto py-1 cursor-pointer"
        >
          <span>Info Detail Lencana</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of 8 Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
        {badges.map((badge) => {
          if (!badge.unlocked) {
            // Locked Card
            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => setSelectedBadge(badge)}
                className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-slate-100/80 border-2 border-slate-200 opacity-80 hover:opacity-100 hover:scale-102 transition-all cursor-pointer group shadow-xs"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-200/90 flex items-center justify-center text-slate-400 mb-2.5 shadow-inner border border-slate-300/80">
                  <Lock className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-heading text-xs sm:text-sm font-black text-slate-500">
                  {badge.name}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1 line-clamp-2">
                  {badge.criteria}
                </span>
                <span className="mt-2.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 font-heading text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <span>Terkunci</span>
                  <span>🔒</span>
                </span>
              </button>
            );
          }

          // Unlocked Card
          const shadowColor = {
            amber: "shadow-[0_4px_0_#F59E0B]",
            blue: "shadow-[0_4px_0_#93C5FD]",
            purple: "shadow-[0_4px_0_#C084FC]",
            rose: "shadow-[0_4px_0_#FDA4AF]",
            emerald: "shadow-[0_4px_0_#86EFAC]",
          }[badge.accentColor];

          const bgCircle = {
            amber: "bg-amber-100 text-amber-700 border-amber-200",
            blue: "bg-blue-100 text-blue-700 border-blue-200",
            purple: "bg-purple-100 text-purple-700 border-purple-200",
            rose: "bg-rose-100 text-rose-700 border-rose-200",
            emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
          }[badge.accentColor];

          const tagBg = {
            amber: "bg-amber-100 text-amber-900 border-amber-200",
            blue: "bg-blue-100 text-blue-900 border-blue-200",
            purple: "bg-purple-100 text-purple-900 border-purple-200",
            rose: "bg-rose-100 text-rose-900 border-rose-200",
            emerald: "bg-emerald-100 text-emerald-900 border-emerald-200",
          }[badge.accentColor];

          return (
            <button
              key={badge.id}
              type="button"
              onClick={() => setSelectedBadge(badge)}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white border-2 border-slate-100 shadow-[0_4px_16px_rgba(30,41,59,0.04)] hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer group"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2.5 ${bgCircle} ${shadowColor} border transition-transform group-hover:scale-108`}
              >
                <span className="select-none">{badge.icon}</span>
              </div>
              <span className="font-heading text-xs sm:text-sm font-black text-slate-800">
                {badge.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 mt-1 line-clamp-2">
                {badge.criteria}
              </span>
              <span
                className={`mt-2.5 px-2.5 py-0.5 rounded-full font-heading text-[10px] font-bold border ${tagBg} flex items-center gap-1`}
              >
                <span>Terbuka</span>
                <Sparkles className="w-3 h-3" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Badge Detail Inspection Modal */}
      {selectedBadge && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-md mb-3">
              {selectedBadge.unlocked ? selectedBadge.icon : "🔒"}
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-heading mb-2 bg-slate-100 text-slate-700">
              {selectedBadge.unlocked ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Status: Berhasil Terbuka ✨</span>
                </>
              ) : (
                <span>Status: Masih Terkunci 🔒</span>
              )}
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-800">
              {selectedBadge.name}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              {selectedBadge.description}
            </p>

            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mt-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Syarat Membuka Lencana:
              </span>
              <p className="font-heading text-xs font-black text-slate-700">
                {selectedBadge.criteria}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="mt-6 w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading text-sm font-bold shadow-[0_4px_0_#1D4ED8] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              Keren, Mengerti! 👍
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
