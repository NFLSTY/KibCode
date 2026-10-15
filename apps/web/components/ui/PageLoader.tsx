"use client";

import React from "react";
import { KiboLogo } from "@/components/ui/KiboLogo";

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({
  message = "Menyiapkan petualangan belajarmu...",
}: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-bounce">
          <KiboLogo size={56} />
        </div>
        <span className="font-heading text-slate-700 font-bold text-sm">
          {message}
        </span>
      </div>
    </div>
  );
}
