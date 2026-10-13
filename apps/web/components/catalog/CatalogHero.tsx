"use client";

import React from "react";
import { Sparkles, Gamepad2, Award, Flame, Bot } from "lucide-react";

interface CatalogHeroProps {
  totalGames: number;
  grade?: number;
}

export function CatalogHero({ totalGames, grade = 3 }: CatalogHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 p-6 sm:p-10 text-white shadow-xl">
      {/* Decorative Blur Spheres */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none blur-2xl" />
      <div className="absolute bottom-0 right-1/4 w-44 h-44 rounded-full bg-amber-400/20 pointer-events-none blur-xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text & Badges */}
        <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md self-center md:self-start w-fit border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-blue-100">
              Zona Petualang KibCode SD
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-3 flex-wrap">
            Arena Permainan Seru
            <span className="inline-block animate-bounce">🎮</span>
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
            Pilih game favoritmu, kumpulkan bintang emas, dan taklukkan semua
            level petualangan bersama ribuan sahabat pintar di Indonesia!
          </p>

          {/* Quick Stats Ribbon */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold border border-white/10">
              <Gamepad2 className="w-4 h-4" />
              <span>{totalGames} Petualangan Siap Main</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs sm:text-sm font-bold shadow-sm">
              <Award className="w-4 h-4" />
              <span>Target: Kelas {grade} SD</span>
            </div>
          </div>
        </div>

        {/* Right: 3D Mascot Interactive Badge */}
        <div className="relative shrink-0 group">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center p-2.5 shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-amber-300 flex flex-col items-center justify-center shadow-[0_5px_0_#D97706] text-amber-950">
              <Bot className="w-16 h-16 md:w-20 md:h-20 text-amber-900" />
              <span className="font-heading text-xs font-bold text-amber-900 mt-1">
                Si Kibo Siap!
              </span>
            </div>
          </div>

          <div className="absolute -bottom-2 -left-2 bg-rose-500 text-white px-3 py-1 rounded-full font-heading text-xs font-bold shadow-[0_3px_0_#9F1239] flex items-center gap-1">
            <Flame className="w-4 h-4 fill-white" />
            <span>XP Ganda</span>
          </div>
        </div>
      </div>
    </section>
  );
}
