"use client";

import React from "react";
import { Flag, Timer, Target, FileCheck } from "lucide-react";

interface MilestoneOverviewProps {
  completedMissions: number;
  targetMissions?: number;
  totalTimeMinutes: number;
  accuracyPercent: number;
  totalQuestionsAnswered: number;
}

export function MilestoneOverview({
  completedMissions,
  targetMissions = 20,
  totalTimeMinutes,
  accuracyPercent,
  totalQuestionsAnswered,
}: MilestoneOverviewProps) {
  const percent = Math.min(
    100,
    Math.round((completedMissions / targetMissions) * 100)
  );
  const remaining = Math.max(0, targetMissions - completedMissions);

  // SVG Circular progress math: radius = 48, perimeter = 2 * PI * 48 ≈ 301.59
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  // Format hours and minutes
  const hours = (totalTimeMinutes / 60).toFixed(1);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Target Mingguan Main Card */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="w-6 h-6 text-blue-600" />
            <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
              Target Mingguan
            </h2>
          </div>
          <span className="px-3.5 py-1 bg-amber-100 text-amber-950 font-heading text-xs font-bold rounded-full border border-amber-300 shadow-sm">
            Pekan Ini
          </span>
        </div>

        {/* Circular Donut Meter & Summary */}
        <div className="my-6 flex flex-col sm:flex-row items-center gap-6 justify-center">
          {/* SVG Donut */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                className="stroke-slate-100"
                cx="60"
                cy="60"
                fill="transparent"
                r={radius}
                strokeWidth="14"
              />
              <circle
                className="stroke-blue-600 transition-all duration-1000"
                cx="60"
                cy="60"
                fill="transparent"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="14"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-heading text-3xl font-black text-blue-600 tracking-tight">
                {percent}%
              </span>
              <span className="font-heading text-xs font-bold text-slate-400">
                Tuntas
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <span className="font-heading text-lg sm:text-xl font-black text-slate-900">
              {completedMissions} dari {targetMissions} Misi Selesai
            </span>
            <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-sm leading-relaxed">
              Kamu melangkah sangat cepat! Terus mainkan game untuk membuka
              hadiah stiker mingguan.
            </p>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mt-1 p-0.5 border border-slate-200/60">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cheerful Milestone Callout Box */}
        <div className="bg-amber-50/80 rounded-2xl p-4 flex items-center gap-3.5 border border-amber-200">
          <div className="w-11 h-11 shrink-0 bg-amber-400 text-amber-950 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            🎁
          </div>
          <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug">
            Tinggal {remaining} misi lagi menuju{" "}
            <span className="underline decoration-wavy decoration-amber-500 font-black">
              Peti Harta Karun Mingguan!
            </span>{" "}
            Kumpulkan bintangmu!
          </p>
        </div>
      </div>

      {/* Mini Stats Trio Column */}
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
        {/* Stat 1: Waktu Belajar */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Timer className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xs font-bold text-slate-400">
              Waktu Belajar
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-2xl font-black text-slate-900">
                {hours}
              </span>
              <span className="text-xs font-bold text-slate-500">Jam</span>
            </div>
            <span className="font-heading text-xs font-bold text-blue-600">
              ⏱️ Tepat waktu &amp; teratur
            </span>
          </div>
        </div>

        {/* Stat 2: Akurasi Jawaban */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xs font-bold text-slate-400">
              Akurasi Jawaban
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-2xl font-black text-slate-900">
                {accuracyPercent}%
              </span>
              <span className="text-xs font-bold text-slate-500">Tepat</span>
            </div>
            <span className="font-heading text-xs font-bold text-amber-600">
              🎯 Jawaban sangat teliti
            </span>
          </div>
        </div>

        {/* Stat 3: Soal Selesai */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xs font-bold text-slate-400">
              Soal Terjawab
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-2xl font-black text-slate-900">
                {totalQuestionsAnswered}
              </span>
              <span className="text-xs font-bold text-slate-500">Soal</span>
            </div>
            <span className="font-heading text-xs font-bold text-rose-600">
              📝 Semua berhasil dicek
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
