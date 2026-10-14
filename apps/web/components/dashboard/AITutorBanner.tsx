"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";

export function AITutorBanner() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-7 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_30px_-6px_rgba(30,41,59,0.15)] relative overflow-hidden">
      {/* Decorative blurred glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10">
        <div className="w-18 h-18 rounded-3xl bg-white p-2 shadow-lg shrink-0 flex items-center justify-center animate-slow-bounce">
          <KiboLogo size={52} />
        </div>

        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1.5 self-center sm:self-start bg-blue-500/80 px-3 py-0.5 rounded-full text-xs font-bold font-heading mb-1 border border-blue-400/40">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Sahabat AI Interaktif</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-black tracking-tight">
            Bingung atau Butuh Petunjuk Koding?
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1 max-w-xl leading-relaxed">
            Kibo AI Tutor selalu siap membantumu memahami logika kode langkah demi langkah tanpa membocorkan jawaban langsung!
          </p>
        </div>
      </div>

      <Link
        href="/ai-tutor"
        className="z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-sm font-black shadow-[0_4px_0_#D97706] active:translate-y-1 transition-all whitespace-nowrap shrink-0 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Tanya Kibo AI Sekarang</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
