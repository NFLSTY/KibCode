"use client";

import React from "react";
import { X, Check } from "lucide-react";
import type { AvatarOption } from "./types";

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: "kibo_bot",
    name: "Kibo Klasik",
    tagline: "Sahabat Robot AI",
    icon: "🤖",
    bgGradient: "from-blue-400 via-sky-300 to-amber-300",
    borderColor: "border-blue-400",
  },
  {
    id: "astronaut",
    name: "Astronot Cilik",
    tagline: "Penjelajah Galaksi",
    icon: "🚀",
    bgGradient: "from-indigo-500 via-purple-400 to-sky-300",
    borderColor: "border-indigo-400",
  },
  {
    id: "coder_detective",
    name: "Detektif Kode",
    tagline: "Pemecah Bug Cerdik",
    icon: "🔍",
    bgGradient: "from-amber-400 via-yellow-300 to-emerald-300",
    borderColor: "border-amber-400",
  },
  {
    id: "gamer_pro",
    name: "Gamer Juara",
    tagline: "Ahli Logika Game",
    icon: "🎮",
    bgGradient: "from-rose-400 via-pink-400 to-purple-400",
    borderColor: "border-rose-400",
  },
  {
    id: "little_scientist",
    name: "Ilmuwan AI",
    tagline: "Eksplorasi Algoritma",
    icon: "🔬",
    bgGradient: "from-emerald-400 via-teal-300 to-cyan-300",
    borderColor: "border-emerald-400",
  },
  {
    id: "brave_lion",
    name: "Singa Pemberani",
    tagline: "Pantang Menyerah",
    icon: "🦁",
    bgGradient: "from-amber-500 via-orange-400 to-rose-300",
    borderColor: "border-amber-500",
  },
];

interface AvatarPickerModalProps {
  isOpen: boolean;
  selectedAvatarId: string;
  onSelect: (avatar: AvatarOption) => void;
  onClose: () => void;
}

export function AvatarPickerModal({
  isOpen,
  selectedAvatarId,
  onSelect,
  onClose,
}: AvatarPickerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(30,41,59,0.3)] border-4 border-amber-300 flex flex-col items-center max-h-[92vh] overflow-y-auto overscroll-contain animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2
            id="avatar-modal-title"
            className="font-heading text-xl sm:text-2xl font-black text-slate-800 tracking-tight"
          >
            Pilih Karakter Petualangmu!
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 font-semibold">
            Pilih avatar seru yang paling cocok dengan gaya belajarmu bersama Kibo.
          </p>
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 w-full">
          {AVATAR_OPTIONS.map((opt) => {
            const isSelected = opt.id === selectedAvatarId;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onSelect(opt);
                  onClose();
                }}
                className={`relative flex flex-col items-center p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-center group ${
                  isSelected
                    ? "bg-amber-50/80 border-amber-400 shadow-[0_4px_0_#F59E0B] scale-102"
                    : "bg-slate-50 hover:bg-white border-slate-200 hover:border-blue-300 hover:scale-103 shadow-xs"
                }`}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}

                {/* Avatar Circle with Vibrant Gradient */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-tr ${opt.bgGradient} p-1 shadow-md mb-2 flex items-center justify-center group-hover:scale-108 transition-transform`}
                >
                  <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center text-3xl select-none">
                    {opt.icon}
                  </div>
                </div>

                <span className="font-heading text-xs sm:text-sm font-black text-slate-800 leading-tight">
                  {opt.name}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5 leading-tight">
                  {opt.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="w-full mt-6 pt-4 border-t border-slate-100 flex items-center justify-center text-center">
          <p className="text-slate-400 text-xs font-medium">
            Karakter ini akan tampil di Kartu Siswa dan Papan Skor Kibo! 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
