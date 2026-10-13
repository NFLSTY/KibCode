"use client";

import React from "react";
import { Rocket, LogIn, Sparkles } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { LandingSection, SectionHeader, LandingButton } from "./shared";

export function CallToAction() {
  return (
    <LandingSection id="cta" className="pb-16 sm:pb-20">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden border-4 border-blue-400/30 text-white">
        {/* Playful Floating Glow Lights (matching Tutor AI Kibo) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Mascot Centerpiece with Kibo Logo */}
        <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md p-3.5 flex items-center justify-center border-2 border-white/30 shadow-xl drop-shadow-md hover:scale-105 transition-transform">
          <KiboLogo size={68} />
        </div>

        {/* Section Header */}
        <SectionHeader
          layout="center"
          theme="dark"
          badge={{
            icon: <Sparkles className="w-4 h-4 text-amber-300" />,
            text: "Akses Edukasi Coding Gratis & Terbuka",
          }}
          title="Siap Menjadi Programmer Cilik Bersama Kibo?"
          description="Daftar akun murid dalam 1 menit tanpa kartu kredit. Mulai petualangan logika algoritma dan eksplorasi kecerdasan buatan pertamamu sekarang juga!"
          className="relative z-10 mb-0"
        />

        {/* Action Buttons styled with shared LandingButton */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
          <LandingButton
            href="/register"
            variant="primary"
            size="lg"
            icon={<Rocket className="w-6 h-6" />}
          >
            Daftar Akun Murid Gratis
          </LandingButton>

          <LandingButton
            href="/login"
            variant="secondary"
            size="lg"
            icon={<LogIn className="w-5 h-5" />}
          >
            Sudah Punya Akun? Masuk
          </LandingButton>
        </div>
      </div>
    </LandingSection>
  );
}
