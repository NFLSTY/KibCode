"use client";

import React from "react";
import Link from "next/link";
import {
  Rocket,
  Play,
  Bot,
  Blocks,
  Sparkles,
  Star,
  Terminal,
  Zap,
} from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { LandingButton, LandingSection } from "./shared";

export function Hero() {
  return (
    <LandingSection
      id="beranda"
      className="pt-20 sm:pt-30 pb-12 sm:pb-20"
    >
      {/* Announcement Banner */}
      <div className="flex justify-center mb-5">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-blue-100/80 hover:bg-blue-100 text-blue-900 px-5 py-2 rounded-full border border-blue-200/60 shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <span className="text-sm sm:text-base font-semibold">
            Programmer Cilik Semester Baru Dimulai!{" "}
            <span className="text-blue-700 font-bold underline decoration-amber-400 decoration-2">
              Dapatkan 500 XP &amp; Badge Kibo Gratis
            </span>{" "}
            ⭐
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Headline & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18] pt-1 sm:pt-2">
            Belajar Coding &amp; AI Jadi Petualangan Paling{" "}
            <span className="text-blue-600 relative inline-block">
              Seru!
              <svg
                className="absolute -bottom-2 left-0 w-full text-amber-400"
                height="10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 12 100 5"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
            Bantu anak menguasai{" "}
            <span className="text-blue-600 font-bold">Logika Algoritma</span>,{" "}
            <span className="text-amber-600 font-bold">Visual Block Coding</span>, dan{" "}
            <span className="text-rose-500 font-bold">Problem Solving</span> lewat
            tantangan game interaktif yang dipandu langsung oleh{" "}
            <span className="text-blue-600 font-bold">Kibo</span>, sahabat AI coding ramah anak!
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <LandingButton
              href="#cta"
              variant="primary"
              size="lg"
              icon={<Rocket className="w-6 h-6" />}
            >
              Mulai Belajar Coding!
            </LandingButton>

            <LandingButton
              href="#demo"
              variant="secondary"
              size="lg"
              icon={<Play className="w-5 h-5 fill-blue-600" />}
            >
              Coba Demo Teka-Teki
            </LandingButton>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-slate-500 text-sm font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-black">✓</span> 100% Bebas Iklan &amp; Aman
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-black">✓</span> Tingkat Kesulitan Kelas 1 - 6 SD
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-black">✓</span> Bimbingan AI Kibo Interaktif
            </div>
          </div>
        </div>

        {/* Right Column: Tactile Hero Preview Card (Kibo's Coding Studio) */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Ambient Glows */}
          <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-blue-400/25 blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-white ring-1 ring-slate-100">
            {/* Header Badge */}
            <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-tight">
                    Kibo Code Studio
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Lab Visual Anak SD
                  </span>
                </div>
              </div>

              <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-300 shadow-sm shrink-0">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>550 XP Coding</span>
              </div>
            </div>

            {/* Visual Code Block Stack */}
            <div className="flex flex-col gap-2.5 mt-4">
              {/* Event Block */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm shadow-sm border-b-2 border-amber-600">
                <Zap className="w-4 h-4" />
                <span>KETIKA TOMBOL MULAI DIKLIK</span>
              </div>

              {/* Movement Block */}
              <div className="ml-4 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm border-b-2 border-blue-700">
                <Blocks className="w-4 h-4" />
                <span>Kibo Maju 2 Langkah ➔</span>
              </div>

              {/* Conditional Block */}
              <div className="ml-4 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-sm border-b-2 border-rose-700">
                <Terminal className="w-4 h-4" />
                <span>JIKA ADA RINTANGAN : LOMPAT 🚀</span>
              </div>

              {/* Reward Block */}
              <div className="ml-4 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm border-b-2 border-emerald-700">
                <Star className="w-4 h-4 fill-white" />
                <span>KUMPULKAN BINTANG EMAS ⭐</span>
              </div>
            </div>

            {/* Kibo Speech Bubble */}
            <div className="mt-4 p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/60 flex items-start gap-3">
              <div className="shrink-0 pt-0.5">
                <KiboLogo size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-700">Kibo AI Mentor:</span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  &ldquo;Algoritma tersusun sempurna! Kode siap dieksekusi dengan aman.&rdquo;
                </p>
              </div>
            </div>

            {/* Execution Status */}
            <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Status Kompilasi Visual</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● 100% Bebas Bug
              </span>
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
