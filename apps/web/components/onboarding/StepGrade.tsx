"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepGradeProps {
  selectedGrade: number | null;
  onSelectGrade: (grade: number) => void;
}

const GRADES = [
  {
    grade: 1,
    title: "Kelas 1 SD",
    subtitle: "Belajar logika gambar & balok awal",
    icon: "🌱",
    color: "border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-950",
    activeColor: "border-emerald-500 bg-emerald-100 shadow-[0_5px_0_#059669]",
    badge: "Pemula Cilik",
  },
  {
    grade: 2,
    title: "Kelas 2 SD",
    subtitle: "Mengenal urutan langkah & teka-teki",
    icon: "⭐",
    color: "border-teal-300 bg-teal-50/70 hover:bg-teal-100/70 text-teal-950",
    activeColor: "border-teal-500 bg-teal-100 shadow-[0_5px_0_#0D9488]",
    badge: "Eksplorasi Seru",
  },
  {
    grade: 3,
    title: "Kelas 3 SD",
    subtitle: "Mulai memecahkan teka-teki koding",
    icon: "🧩",
    color: "border-sky-300 bg-sky-50/70 hover:bg-sky-100/70 text-sky-950",
    activeColor: "border-sky-500 bg-sky-100 shadow-[0_5px_0_#0284C7]",
    badge: "Penjelajah",
  },
  {
    grade: 4,
    title: "Kelas 4 SD",
    subtitle: "Mengenal perulangan & logika seru",
    icon: "🚀",
    color: "border-blue-300 bg-blue-50/70 hover:bg-blue-100/70 text-blue-950",
    activeColor: "border-blue-500 bg-blue-100 shadow-[0_5px_0_#2563EB]",
    badge: "Kreator Game",
  },
  {
    grade: 5,
    title: "Kelas 5 SD",
    subtitle: "Membangun proyek mini & algoritma",
    icon: "👾",
    color: "border-indigo-300 bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-950",
    activeColor: "border-indigo-500 bg-indigo-100 shadow-[0_5px_0_#4F46E5]",
    badge: "Jagoan Logika",
  },
  {
    grade: 6,
    title: "Kelas 6 SD",
    subtitle: "Tantangan koding dan kreasi bebas",
    icon: "🏆",
    color: "border-purple-300 bg-purple-50/70 hover:bg-purple-100/70 text-purple-950",
    activeColor: "border-purple-500 bg-purple-100 shadow-[0_5px_0_#7C3AED]",
    badge: "Master Koding",
  },
];

export function StepGrade({ selectedGrade, onSelectGrade }: StepGradeProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-center">
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-800">
          Pilih Jenjang Kelasmu
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          KibCode akan menyesuaikan materi dan tantangan sesuai tingkatanmu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
        {GRADES.map((item) => {
          const isSelected = selectedGrade === item.grade;

          return (
            <button
              key={item.grade}
              type="button"
              onClick={() => onSelectGrade(item.grade)}
              className={`tactile-btn relative flex flex-col p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? `${item.activeColor} translate-y-[-2px]`
                  : `${item.color} shadow-[0_4px_0_#CBD5E1] hover:translate-y-[-2px]`
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl select-none" role="img" aria-label={item.title}>
                  {item.icon}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <span className="font-heading text-base sm:text-lg font-black tracking-tight">
                {item.title}
              </span>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                {item.subtitle}
              </p>

              <span className="mt-3 inline-block self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-slate-200">
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
