"use client";

import React from "react";
import { ShieldCheck, LineChart, Trophy } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Bebas Iklan & 100% Aman Anak",
    description:
      "Ruang belajar tertutup tanpa konten pihak ketiga, tanpa pelacak digital berbahaya, dan tampilan ramah bagi mata anak.",
    iconColor: "text-amber-600 bg-amber-100",
  },
  {
    icon: LineChart,
    title: "Laporan Kemajuan untuk Orang Tua",
    description:
      "Pantau penguasaan topik belajar, durasi eksplorasi harian, dan materi yang memerlukan bimbingan tambahan secara transparan.",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    icon: Trophy,
    title: "Hadiah Bintang & Gamifikasi Positif",
    description:
      "Setiap kuis yang diselesaikan memberikan bintang reward untuk membangun kebiasaan belajar harian yang penuh semangat dan rasa percaya diri.",
    iconColor: "text-rose-600 bg-rose-100",
  },
];

export function ParentFeatures() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest block mb-2">
          Aman, Terpandu, &amp; Menyenangkan
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
          Mengapa Anak &amp; Guru Suka EduKids?
        </h2>
        <p className="text-slate-600 text-base sm:text-lg mt-3 font-medium leading-relaxed">
          Didesain dengan pendekatan ramah anak untuk menumbuhkan rasa ingin
          tahu dan motivasi belajar secara alami.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl flex flex-col gap-4 shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${pillar.iconColor}`}
              >
                <Icon className="w-7 h-7" />
              </div>

              <h3 className="font-heading text-xl font-black text-slate-900">
                {pillar.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
