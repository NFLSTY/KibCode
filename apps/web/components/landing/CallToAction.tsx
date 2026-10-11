"use client";

import React from "react";
import Link from "next/link";
import { Star, Sparkles } from "lucide-react";

export function CallToAction() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden border-4 border-blue-400/30">
        {/* Floating playful decorations */}
        <div className="absolute top-6 left-8 text-3xl opacity-40 select-none animate-pulse">
          ✨
        </div>
        <div className="absolute bottom-6 right-10 text-4xl opacity-40 select-none animate-bounce">
          🌟
        </div>
        <div className="absolute top-1/2 left-10 text-2xl opacity-25 select-none hidden md:block">
          🎈
        </div>
        <div className="absolute top-1/3 right-12 text-2xl opacity-25 select-none hidden md:block">
          🚀
        </div>

        {/* Highlight Tag */}
        <span className="bg-white/20 backdrop-blur-md text-white px-5 py-1.5 rounded-full font-heading text-xs sm:text-sm font-bold tracking-widest uppercase border border-white/30">
          100% Akses Edukasi Gratis
        </span>

        {/* Title */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-2xl leading-tight">
          Siapkah Si Juara Memulai Petualangan Barunya?
        </h2>

        {/* Description */}
        <p className="text-blue-100 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
          Daftar akun murid dalam 1 menit tanpa kartu kredit. Dukung prestasi
          belajar anak dengan keseruan tanpa batas!
        </p>

        {/* Button */}
        <div className="pt-2">
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-lg sm:text-xl font-black px-9 py-4 rounded-full shadow-[0_5px_0_#D97706] active:translate-y-1 active:shadow-[0_2px_0_#D97706] transition-all min-h-[52px]"
          >
            <Star className="w-5 h-5 fill-amber-950" />
            <span>Daftar Akun Belajar Gratis</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
