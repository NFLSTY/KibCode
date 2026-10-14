"use client";

import React, { useEffect } from "react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { CTAButton } from "@/components/ui/CTAButton";
import { ConfettiOverlay } from "./ConfettiOverlay";
import {
  Sparkles,
  Award,
  School,
  BookOpen,
  Code2,
  Heart,
  Rocket,
} from "lucide-react";

interface StepCongratulationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  isSubmitting?: boolean;
  studentName?: string;
  grade: number | null;
  schoolName: string;
  hasCodingExp: boolean;
  codingExpLevel: string;
  favoriteInterest: string;
  learningGoal?: string;
}

const INTEREST_LABELS: Record<string, { title: string; icon: string }> = {
  games: { title: "Bikin Game Seru", icon: "🎮" },
  animation: { title: "Animasi & Cerita", icon: "🎨" },
  puzzles: { title: "Teka-Teki Logika", icon: "🧠" },
  ai_robotics: { title: "Robotika & AI", icon: "🤖" },
};

const EXP_LABELS: Record<string, string> = {
  block_coding: "Block / Visual Coding 🧩",
  game_maker: "Bikin Game Sendiri 🎮",
  robotics: "Robotika & Alat 🤖",
  text_coding: "Ketik Kode Dasar 💻",
};

export function StepCongratulationModal({
  isOpen,
  onConfirm,
  isSubmitting = false,
  studentName = "Teman",
  grade,
  schoolName,
  hasCodingExp,
  codingExpLevel,
  favoriteInterest,
}: StepCongratulationModalProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !isOpen) return;

    const doc = window.document;
    const originalOverflow = doc.body.style.overflow;
    const originalTouchAction = doc.body.style.touchAction;
    doc.body.style.overflow = "hidden";
    doc.body.style.touchAction = "none";

    return () => {
      doc.body.style.overflow = originalOverflow;
      doc.body.style.touchAction = originalTouchAction;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const interestInfo = INTEREST_LABELS[favoriteInterest] || {
    title: "Petualangan Koding",
    icon: "🌟",
  };
  const expLabel = hasCodingExp
    ? EXP_LABELS[codingExpLevel] || "Sudah Pernah Coba"
    : "Mulai dari Awal (Pemula Cilik) 🌱";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Backdrop: inactive and locked */}
      <div
        className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Confetti Celebration Rain */}
      <ConfettiOverlay />

      {/* Modal Dialog Pop-up Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(30,41,59,0.35)] border-4 border-amber-300 z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center text-center my-auto">
        {/* Mascot Avatar with celebratory glow */}
        <div className="relative mt-1 mb-3">
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center shadow-[0_6px_0_#F59E0B] animate-slow-bounce">
            <KiboLogo size={52} />
          </div>
          <span className="absolute -top-2 -right-2 text-2xl select-none animate-pulse">
            🎉
          </span>
          <span className="absolute -bottom-1 -left-2 text-2xl select-none animate-pulse">
            ⭐
          </span>
        </div>

        {/* Heading & Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-heading text-xs font-bold shadow-xs mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
          <span>Selamat, {studentName}!</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Profil Petualangmu Siap!
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed font-semibold max-w-sm">
          Semua pertanyaan sudah 100% terjawab. Kibo sudah menyiapkan materi dan tantangan seru buat kamu!
        </p>

        {/* Summary Chips */}
        <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 sm:p-4 my-4 text-left flex flex-col gap-2.5 shadow-inner">
          <div className="flex items-center gap-2 border-b border-slate-200/80 pb-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Kartu Rangkuman Belajar
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Grade */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">
                  Tingkatan
                </span>
                <span className="font-heading text-xs font-black text-slate-800 truncate block">
                  Kelas {grade || 1} SD
                </span>
              </div>
            </div>

            {/* School */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <School className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">
                  Sekolah
                </span>
                <span className="font-heading text-xs font-black text-slate-800 truncate block">
                  {schoolName || "Belum diisi"}
                </span>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">
                  Pengalaman
                </span>
                <span className="font-heading text-xs font-black text-slate-800 truncate block">
                  {expLabel}
                </span>
              </div>
            </div>

            {/* Interest */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm">
                {interestInfo.icon}
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">
                  Fokus Minat
                </span>
                <span className="font-heading text-xs font-black text-slate-800 truncate block">
                  {interestInfo.title}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-amber-900 text-[11px] font-semibold">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
            <span>Kumpulkan bintang emas dan jadilah programmer cilik hebat!</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full pt-2">
          <CTAButton
            type="button"
            variant="primary"
            size="full"
            onClick={onConfirm}
            disabled={isSubmitting}
            icon={<Rocket className="w-5 h-5" />}
          >
            {isSubmitting ? "Menyiapkan Petualangan..." : "Mulai Belajar Sekarang! 🚀"}
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
