"use client";

import React from "react";
import Link from "next/link";
import {
  Blocks,
  Repeat,
  Bot,
  Check,
  Star,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const CODING_TRACKS = [
  {
    id: "block-coding",
    title: "Algoritma & Blok Visual",
    subtitle: "Dasar Logika Tanpa Koding Rumit",
    badge: "Kelas 1 - 3 SD",
    description:
      "Belajar menyusun urutan perintah gerak karakter, melewati rintangan labirin, dan memahami konsep aksi sekuensial lewat balok warna-warni yang ramah anak.",
    reward: "+150 XP / Level Selesai",
    rewardIcon: Star,
    buttonText: "Jelajahi Blok Visual",
    href: "/register",
    icon: Blocks,
    tags: ["Urutan Langkah", "Labirin Ceria", "Navigasi Arah"],
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
    id: "loops-logic",
    title: "Loop & Percabangan Cerdas",
    subtitle: "Efisiensi Kode & Pola Pikir Kritis",
    badge: "Kelas 3 - 5 SD",
    description:
      "Tingkatkan kemampuan memecahkan masalah dengan perulangan aksi (Loops) dan logika 'JIKA-MAKA' (If-Else) agar kode lebih ringkas dan pintar.",
    reward: "+200 XP / Level Selesai",
    rewardIcon: Sparkles,
    buttonText: "Pelajari Logika Loop",
    href: "/register",
    icon: Repeat,
    tags: ["Perulangan (Loop)", "Logika Jika-Maka", "Pencegah Bug"],
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
    id: "ai-robotics",
    title: "Eksplorasi AI & Robotika Cilik",
    subtitle: "Mengenal Cara Berpikir Kecerdasan Buatan",
    badge: "Kelas 5 - 6 SD",
    description:
      "Pahami cara robot dan AI mengenali suara dan gambar, berinteraksi dengan chatbot pintar Kibo, serta belajar melatih aturan logika digital masa depan.",
    reward: "+250 XP / Level Selesai",
    rewardIcon: Bot,
    buttonText: "Mulai Petualangan AI",
    href: "/register",
    icon: Bot,
    tags: ["Pengenalan Pola", "Sahabat AI Kibo", "Etika Digital Cilik"],
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

import { LandingSection, SectionHeader } from "./shared";

export function CategoryCards() {
  return (
    <LandingSection id="kurikulum">
      {/* Section Header */}
      <SectionHeader
        eyebrow="Kurikulum Bertingkat SD"
        title="3 Jalur Petualangan Coding Juara!"
        description="Disesuaikan dengan tahap perkembangan kognitif anak usia 7-12 tahun, mengubah anak dari sekadar pengguna teknologi menjadi pencipta karya digital."
      />

      {/* 3 Bento Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CODING_TRACKS.map((track) => {
          const Icon = track.icon;
          const RewardIcon = track.rewardIcon;

          return (
            <div
              key={track.id}
              className={`group flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.06)] border-2 ${track.styles.cardBorder} hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="flex flex-col gap-5">
                {/* Top: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${track.styles.iconBg} group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    <Icon className="w-9 h-9" />
                  </div>
                  <span
                    className={`font-heading text-xs font-bold px-3 py-1 rounded-full shadow-sm ${track.styles.badgeBg}`}
                  >
                    {track.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {track.subtitle}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed font-medium">
                    {track.description}
                  </p>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${track.styles.tagBg}`}
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit ${track.styles.rewardBg}`}
                >
                  <RewardIcon className="w-3.5 h-3.5" />
                  <span>{track.reward}</span>
                </div>

                <Link
                  href={track.href}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-heading font-black text-base active:translate-y-1 transition-all min-h-[48px] ${track.styles.btnBg}`}
                >
                  <span>{track.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </LandingSection>
  );
}
