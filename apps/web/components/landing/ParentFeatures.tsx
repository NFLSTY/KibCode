"use client";

import React from "react";
import { ShieldCheck, Brain, Trophy, Palette, Smile, TrendingUp } from "lucide-react";

const PILLARS = [
  {
    icon: Brain,
    title: "Mengasah Computational Thinking",
    description:
      "Melatih anak SD memecahkan tantangan besar menjadi langkah-langkah terstruktur, mengenali pola, dan berpikir analitis sejak dini.",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    icon: ShieldCheck,
    title: "100% Aman & Bebas Iklan",
    description:
      "Ruang belajar ramah anak tanpa pelacak berbahaya, tanpa konten pihak ketiga, dan dirancang khusus melindungi privasi anak secara ketat.",
    iconColor: "text-emerald-600 bg-emerald-100",
  },
  {
    icon: Trophy,
    title: "Gamifikasi & Bimbingan AI Positif",
    description:
      "Setiap baris kode yang diselesaikan memberikan XP, bintang prestasi, dan pujian semangat dari Kibo untuk membangun kepercayaan diri anak.",
    iconColor: "text-amber-600 bg-amber-100",
  },
  {
    icon: Palette,
    title: "Memicu Daya Cipta & Kreativitas",
    description:
      "Anak tidak sekadar menjadi konsumen teknologi, tetapi aktif merancang animasi, puzzle logika, dan karya imajinatif digital mereka sendiri.",
    iconColor: "text-rose-600 bg-rose-100",
  },
  {
    icon: Smile,
    title: "Antarmuka Ramah Anak Usia SD",
    description:
      "Tombol besar, kontras warna yang nyaman, bahasa sederhana, dan bebas distraksi yang dirancang khusus bagi kenyamanan motorik anak 7–12 tahun.",
    iconColor: "text-purple-600 bg-purple-100",
  },
  {
    icon: TrendingUp,
    title: "Pantauan Progres Belajar Nyata",
    description:
      "Tiap pencapaian logika terekam rapi, memudahkan orang tua dan guru melihat perkembangan daya nalar dan rasa percaya diri anak.",
    iconColor: "text-teal-600 bg-teal-100",
  },
];

import { LandingSection, SectionHeader } from "./shared";

export function ParentFeatures() {
  return (
    <LandingSection id="fitur">
      {/* Section Header */}
      <SectionHeader
        eyebrow="Investasi Masa Depan Juara"
        title="Mengapa Belajar Coding & AI Sejak SD?"
        description="Bukan sekadar mencetak programmer, tetapi menumbuhkan rasa ingin tahu, kreativitas, dan daya juang anak dalam memecahkan masalah kehidupan nyata."
      />

      {/* 6 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
    </LandingSection>
  );
}
