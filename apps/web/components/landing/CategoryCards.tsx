"use client";

import React from "react";
import Link from "next/link";
import {
  Gamepad2,
  Calculator,
  BookOpen,
  SpellCheck,
  Check,
  Star,
  Headphones,
  Trophy,
  ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "math",
    title: "Tantangan Berhitung & Logika",
    subtitle: "120+ Mini Game Interaktif",
    badge: "Kelas 1 - 6 SD",
    description:
      "Kuis perkalian kilat, teka-teki pecahan pizza, dan petualangan bangun ruang yang mengasah pola pikir kritis anak.",
    reward: "Dapatkan 150 Bintang/Misi",
    rewardIcon: Star,
    buttonText: "Jelajahi Matematika",
    href: "/games?category=math",
    accentColor: "blue",
    icon: Calculator,
    tags: ["Pecahan Visual", "Operasi Cepat", "Geometri Ceria"],
    styles: {
      cardBorder: "border-blue-100 hover:border-blue-300",
      iconBg: "bg-blue-100 text-blue-600",
      badgeBg: "bg-blue-500 text-white",
      tagBg: "bg-blue-50 text-blue-700 border-blue-100",
      rewardBg: "bg-blue-50 text-blue-700 border-blue-200",
      btnBg:
        "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_0_#1D4ED8]",
    },
  },
  {
    id: "reading",
    title: "Dunia Dongeng & Literasi",
    subtitle: "Ratusan Dongeng Nusantara",
    badge: "Cerita Bergambar",
    description:
      "Cerita rakyat Nusantara dengan audio narasi ramah anak, kosa kata kontekstual, dan kuis pemahaman bacaan yang menyenangkan!",
    reward: "Dilengkapi Audio & Narasi",
    rewardIcon: Headphones,
    buttonText: "Buka Buku Cerita",
    href: "/games?category=reading",
    accentColor: "amber",
    icon: BookOpen,
    tags: ["Narasi Ramah", "Fabel Kancil", "Kuis Cerita"],
    styles: {
      cardBorder: "border-amber-100 hover:border-amber-300",
      iconBg: "bg-amber-100 text-amber-600",
      badgeBg: "bg-amber-400 text-amber-950",
      tagBg: "bg-amber-50 text-amber-800 border-amber-100",
      rewardBg: "bg-amber-50 text-amber-800 border-amber-200",
      btnBg:
        "bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-[0_4px_0_#D97706]",
    },
  },
  {
    id: "spelling",
    title: "Lab Kata & Kosakata Juara",
    subtitle: "Penguasaan Bahasa Indonesia",
    badge: "Ejaan Cerdas",
    description:
      "Susun huruf acak, tebak gambar berima, dan latihan dikte interaktif agar ejaan bahasa Indonesia semakin fasih dan percaya diri!",
    reward: "Latihan Ejaan Cepat & Seru",
    rewardIcon: Trophy,
    buttonText: "Mulai Mengeja",
    href: "/games?category=spelling",
    accentColor: "rose",
    icon: SpellCheck,
    tags: ["Susun Balok", "Dikte Mandiri", "Kata Berima"],
    styles: {
      cardBorder: "border-rose-100 hover:border-rose-300",
      iconBg: "bg-rose-100 text-rose-600",
      badgeBg: "bg-rose-500 text-white",
      tagBg: "bg-rose-50 text-rose-700 border-rose-100",
      rewardBg: "bg-rose-50 text-rose-700 border-rose-200",
      btnBg:
        "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_4px_0_#BE123C]",
    },
  },
];

export function CategoryCards() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" />
          <span>Pusat Pembelajaran Anak</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
          Pilih Petualangan Belajarmu Hari Ini! 🎮📚
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-medium">
          Materi interaktif yang disusun bertingkat dari kelas 1 sampai kelas 6
          SD dengan animasi riang dan umpan balik langsung.
        </p>
      </div>

      {/* 3 Bento Game-like Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const RewardIcon = cat.rewardIcon;

          return (
            <div
              key={cat.id}
              className={`group flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.06)] border-2 ${cat.styles.cardBorder} hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="flex flex-col gap-5">
                {/* Top: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cat.styles.iconBg} group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    <Icon className="w-9 h-9" />
                  </div>
                  <span
                    className={`font-heading text-xs font-bold px-3 py-1 rounded-full shadow-sm ${cat.styles.badgeBg}`}
                  >
                    {cat.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${cat.styles.tagBg}`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Reward & CTA */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col gap-4">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit ${cat.styles.rewardBg}`}
                >
                  <RewardIcon className="w-3.5 h-3.5" />
                  <span>{cat.reward}</span>
                </div>

                <Link
                  href={cat.href}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-heading font-black text-base active:translate-y-1 transition-all min-h-[48px] ${cat.styles.btnBg}`}
                >
                  <span>{cat.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
