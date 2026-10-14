"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  Bot,
  Zap,
  Play,
  Calendar,
  Layers,
  Award,
  Code2,
} from "lucide-react";
import type { GameProgressDTO } from "@kibcode/types";

interface DailyMissionsSectionProps {
  progressList?: GameProgressDTO[];
  grade?: number;
  totalScore?: number;
}

export function DailyMissionsSection({
  progressList = [],
  grade = 3,
  totalScore = 0,
}: DailyMissionsSectionProps) {
  const lastGame = progressList.length > 0 ? progressList[0] : null;

  // Format today's date in Indonesian
  const todayLabel = useMemo(() => {
    return new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }, []);

  // Check quest completion statuses from real database progress
  const hasPlayedGame = progressList.length > 0;
  const hasHighScore = progressList.some((p) => p.score >= 80);

  const dailyQuests = [
    {
      id: "quest-1",
      title: "Latihan Logika Harian",
      description: "Selesaikan 1 game di Arena Koding hari ini",
      reward: "+50 Poin",
      icon: Gamepad2,
      isCompleted: hasPlayedGame,
      href: "/games",
      actionText: hasPlayedGame ? "Tuntas" : "Main",
    },
    {
      id: "quest-2",
      title: "Tanya Tutor AI Kibo",
      description: "Diskusikan 1 konsep koding bersama sahabat AI",
      reward: "+30 Poin",
      icon: Bot,
      isCompleted: false,
      href: "/ai-tutor",
      actionText: "Tanya",
    },
    {
      id: "quest-3",
      title: "Target Skor Hebat",
      description: "Raih skor minimal 80 poin pada salah satu kuis",
      reward: "+80 Poin",
      icon: Zap,
      isCompleted: hasHighScore,
      href: "/games",
      actionText: hasHighScore ? "Tuntas" : "Coba",
    },
  ];

  const completedQuestsCount = dailyQuests.filter((q) => q.isCompleted).length;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Left Column: Lanjutkan Game Terakhir / Modul Hari Ini */}
      <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-[0_10px_24px_-4px_rgba(30,41,59,0.12)] relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3.5">
          {/* Top Pill & Grade */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs font-heading text-xs font-bold text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>{lastGame ? "Lanjutkan Game Terakhir" : "Modul Hari Ini"}</span>
            </span>
            <span className="text-blue-100 text-xs font-bold">
              SD Kelas {grade}
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {lastGame ? `Tantangan Koding #${progressList.length}` : "Petualangan Logika Robot Kibo"}
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
              {lastGame
                ? `Skor sesi sebelumnya: ${lastGame.score} poin. Yuk lanjutkan untuk mempertajam logikamu!`
                : "Bantu si Kibo menyusun blok perintah gerak dasar untuk melewati labirin dan mengumpulkan bintang!"}
            </p>
          </div>

          {/* Feature Highlights Bento Chips */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3 border border-white/15 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-sm shrink-0 font-bold">
                <Layers className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">
                  {lastGame ? "Status Modul" : "Fokus Logika"}
                </span>
                <span className="font-heading text-xs font-bold text-white truncate">
                  {lastGame ? "Sesi Aktif" : "Blok Sekuensial"}
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3 border border-white/15 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center text-sm shrink-0 font-bold">
                <Award className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">
                  {lastGame ? "Skor Tercatat" : "Hadiah Modul"}
                </span>
                <span className="font-heading text-xs font-bold text-white truncate">
                  {lastGame ? `${lastGame.score}/100 Poin` : "+50 Poin Bintang"}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Step Interactive Coding Path */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-heading text-xs font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{lastGame ? "Target Sesi Ini" : "Alur Belajar Hari Ini"}</span>
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">
                {lastGame ? "Latihan Ulang" : "3 Langkah"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/15 rounded-xl p-2 text-center border border-white/10 flex flex-col items-center justify-center">
                <span className="text-base select-none">🗺️</span>
                <span className="font-heading text-[11px] font-bold text-white mt-1 leading-tight">
                  {lastGame ? "1. Pahami" : "1. Baca Peta"}
                </span>
                <span className="text-[9px] text-blue-200 font-medium leading-tight mt-0.5">
                  {lastGame ? "Cek rute kuis" : "Amati rintangan"}
                </span>
              </div>

              <div className="bg-black/15 rounded-xl p-2 text-center border border-white/10 flex flex-col items-center justify-center">
                <span className="text-base select-none">🧩</span>
                <span className="font-heading text-[11px] font-bold text-white mt-1 leading-tight">
                  {lastGame ? "2. Optimalkan" : "2. Susun Blok"}
                </span>
                <span className="text-[9px] text-blue-200 font-medium leading-tight mt-0.5">
                  {lastGame ? "Pilih jawaban" : "Rangkai logika"}
                </span>
              </div>

              <div className="bg-black/15 rounded-xl p-2 text-center border border-white/10 flex flex-col items-center justify-center">
                <span className="text-base select-none">⭐</span>
                <span className="font-heading text-[11px] font-bold text-white mt-1 leading-tight">
                  {lastGame ? "3. Rekor Baru" : "3. Raih Skor"}
                </span>
                <span className="text-[9px] text-blue-200 font-medium leading-tight mt-0.5">
                  {lastGame ? "Target 100 poin" : "Koleksi bintang"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 mt-4 pt-3 border-t border-white/15">
          <Link
            href={lastGame ? `/games/${lastGame.gameId}` : "/games"}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-sm font-black shadow-[0_4px_0_#D97706] active:translate-y-1 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-amber-950" />
            <span>{lastGame ? "Lanjutkan Sekarang" : "Mulai Petualangan Koding"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Right Column: Misi Harian Siswa */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100">
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl select-none">🎯</span>
                <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900">
                  Misi Harian Siswa
                </h3>
              </div>
              <p className="text-slate-500 text-xs font-semibold mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{todayLabel}</span>
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full self-start sm:self-auto">
              <span className="font-heading text-xs font-bold text-amber-900">
                Selesai: <strong className="text-blue-600 font-black">{completedQuestsCount} dari 3</strong>
              </span>
            </div>
          </div>

          {/* Quests List */}
          <div className="flex flex-col gap-3 mt-4">
            {dailyQuests.map((quest) => {
              const Icon = quest.icon;
              return (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    quest.isCompleted
                      ? "bg-emerald-50/60 border-emerald-200"
                      : "bg-slate-50 hover:bg-white border-slate-200/80 hover:border-blue-200 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        quest.isCompleted
                          ? "bg-emerald-500 text-white shadow-xs"
                          : "bg-blue-100 text-blue-600 border border-blue-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-xs sm:text-sm font-black text-slate-800 truncate">
                          {quest.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                          {quest.reward}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                        {quest.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {quest.isCompleted ? (
                      <span className="inline-flex items-center gap-1 font-heading text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Selesai</span>
                      </span>
                    ) : (
                      <Link
                        href={quest.href}
                        className="inline-flex items-center gap-1 font-heading text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-300 hover:border-blue-600 px-3.5 py-1 rounded-full transition-all cursor-pointer"
                      >
                        <span>{quest.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer encouragement */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold">
            ✨ Selesaikan semua misi harian untuk menambah poin bintangmu!
          </span>
        </div>
      </div>
    </section>
  );
}
