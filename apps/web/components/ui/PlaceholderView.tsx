"use client";

import React from "react";
import Link from "next/link";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { ArrowLeft, Sparkles, Rocket } from "lucide-react";

interface PlaceholderViewProps {
  title: string;
  categoryTag: string;
  description: string;
}

export function PlaceholderView({
  title,
  categoryTag,
  description,
}: PlaceholderViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100 flex flex-col items-center max-w-lg w-full">
          {/* Animated decorative glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Kibo Mascot Avatar */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center shadow-inner group hover:scale-105 transition-transform">
              <KiboLogo size={60} />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[11px] font-heading font-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {categoryTag}
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-6">
            {description}
          </p>

          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs sm:text-sm font-bold text-amber-950 mb-8 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Kibo sedang menyiapkan modul petualangan ini. Segera hadir!</span>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
