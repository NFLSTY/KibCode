"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  studentName?: string;
  isCompleted?: boolean;
}

export function OnboardingHeader({
  currentStep,
  totalSteps,
  studentName = "Teman Baru",
  isCompleted = false,
}: OnboardingHeaderProps) {
  const isOutro = currentStep > totalSteps || isCompleted;

  // Always start with 0% on step 1, progressively increase, and hit 100% when all questions are answered
  const progressPercent = isOutro
    ? 100
    : Math.round(((currentStep - 1) / totalSteps) * 100);

  const stepMessages: Record<number, string> = {
    1: `Halo ${studentName}! Kelas berapa kamu sekarang?`,
    2: "Wah keren! Apa nama sekolah tempatmu belajar?",
    3: "Pernahkah kamu mencoba koding sebelumnya?",
    4: "Pilih topik dan target yang paling seru buat kamu!",
    5: `Hore ${studentName}! Semua pertanyaan selesai, kamu siap berpetualang!`,
  };

  return (
    <div className="w-full flex flex-col items-center text-center gap-3">
      {/* Top Badge & Progress */}
      <div className="flex items-center justify-between w-full max-w-md px-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-heading text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          <span>{isOutro ? "Pertanyaan Selesai! 🎉" : `Langkah ${currentStep} dari ${totalSteps}`}</span>
        </span>
        <span className="font-heading text-xs font-black text-slate-500">
          {progressPercent}% Selesai
        </span>
      </div>

      {/* Chunky Progress Track */}
      <div className="w-full max-w-md h-3.5 bg-slate-100 rounded-full p-0.5 border-2 border-slate-200 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 rounded-full transition-all duration-500 ease-out shadow-xs"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mascot Speech Bubble */}
      <div className="relative mt-2 max-w-lg bg-white px-5 py-3.5 rounded-2xl border-2 border-blue-200 shadow-[0_4px_0_#93C5FD] flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center shrink-0 shadow-xs">
          <KiboLogo size={36} />
        </div>
        <div className="text-left flex-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            Kibo berkata:
          </span>
          <p className="font-heading text-sm sm:text-base font-black text-slate-800 leading-snug">
            {stepMessages[currentStep] || "Ayo lanjutkan petualangan belajarmu!"}
          </p>
        </div>
      </div>
    </div>
  );
}
