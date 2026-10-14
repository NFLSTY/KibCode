"use client";

import React from "react";
import Link from "next/link";
import { Blocks, Repeat, Bot, ArrowRight, Sparkles, Check } from "lucide-react";

interface LearningTracksProps {
  grade?: number;
}

export function LearningTracks({ grade = 3 }: LearningTracksProps) {
  const tracks = [
    {
      id: "track-1",
      title: "Algoritma & Blok Visual",
      subtitle: "Dasar Logika Tanpa Koding Rumit",
      gradeRange: "Kelas 1 - 3 SD",
      isRecommended: grade <= 3,
      description:
        "Susun balok perintah gerak robot Kibo, selesaikan teka-teki labirin, dan pahami urutan langkah sekuensial.",
      tags: ["Urutan Gerak", "Labirin Ceria", "Navigasi Arah"],
      href: "/games",
      btnText: "Buka Arena Blok",
      icon: Blocks,
      color: {
        border: "border-blue-100 hover:border-blue-300",
        iconBg: "bg-blue-100 text-blue-600",
        badgeBg: "bg-blue-500 text-white",
        tagBg: "bg-blue-50 text-blue-700 border-blue-200",
        btn: "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_0_#1D4ED8]",
      },
    },
    {
      id: "track-2",
      title: "Loop & Percabangan Cerdas",
      subtitle: "Efisiensi Kode & Pola Pikir Kritis",
      gradeRange: "Kelas 3 - 5 SD",
      isRecommended: grade === 4 || grade === 5,
      description:
        "Gunakan blok perulangan (Loops) dan kondisi JIKA-MAKA (If-Else) agar robot Kibo bertindak otomatis dan pintar.",
      tags: ["Perulangan (Loop)", "Logika Jika-Maka", "Debug Kode"],
      href: "/coding",
      btnText: "Buka Arena Koding",
      icon: Repeat,
      color: {
        border: "border-amber-100 hover:border-amber-300",
        iconBg: "bg-amber-100 text-amber-600",
        badgeBg: "bg-amber-400 text-amber-950",
        tagBg: "bg-amber-50 text-amber-800 border-amber-200",
        btn: "bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-[0_4px_0_#D97706]",
      },
    },
    {
      id: "track-3",
      title: "Eksplorasi AI & Robotika Cilik",
      subtitle: "Mengenal Kecerdasan Buatan Bersama Kibo",
      gradeRange: "Kelas 5 - 6 SD",
      isRecommended: grade >= 6,
      description:
        "Pelajari cara AI mengenali pola suara dan gambar, berdiskusi dengan Kibo AI Tutor, serta eksplorasi etika digital.",
      tags: ["Pola & Data", "Sahabat AI Kibo", "Etika Digital"],
      href: "/ai-tutor",
      btnText: "Tanya AI Tutor",
      icon: Bot,
      color: {
        border: "border-rose-100 hover:border-rose-300",
        iconBg: "bg-rose-100 text-rose-600",
        badgeBg: "bg-rose-500 text-white",
        tagBg: "bg-rose-50 text-rose-700 border-rose-200",
        btn: "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_4px_0_#BE123C]",
      },
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurikulum Koding Bertingkat</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            3 Jalur Petualangan Koding
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
            Pilih jalur petualangan koding yang ingin kamu kuasai hari ini
          </p>
        </div>

        <Link
          href="/kurikulum"
          className="font-heading text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Lihat Silabus Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tracks.map((track) => {
          const Icon = track.icon;

          return (
            <div
              key={track.id}
              className={`relative flex flex-col justify-between bg-white rounded-3xl p-6 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.06)] border-2 ${track.color.border} hover:-translate-y-1.5 transition-all duration-300 group`}
            >
              {/* Highlight if recommended for student's grade */}
              {track.isRecommended && (
                <div className="absolute -top-3 right-6 bg-amber-400 text-amber-950 px-3 py-0.5 rounded-full font-heading text-[10px] font-black border border-amber-300 shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-amber-950" />
                  <span>Sesuai Kelasmu</span>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {/* Icon & Grade Badge */}
                <div className="flex items-center justify-between pt-1">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${track.color.iconBg} group-hover:scale-108 transition-transform shadow-xs`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span
                    className={`font-heading text-xs font-bold px-3 py-1 rounded-full ${track.color.badgeBg} shadow-xs`}
                  >
                    {track.gradeRange}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {track.subtitle}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed font-semibold">
                    {track.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${track.color.tagBg}`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={track.href}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-heading text-xs sm:text-sm font-black active:translate-y-1 transition-all ${track.color.btn}`}
                >
                  <span>{track.btnText}</span>
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
