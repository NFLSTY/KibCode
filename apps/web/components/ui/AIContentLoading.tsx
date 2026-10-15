"use client";

import React from "react";
import { Bot } from "lucide-react";

interface AIContentLoadingProps {
  title?: string;
  description?: string;
  className?: string;
}

export function AIContentLoading({
  title = "Robot Kibo sedang menyiapkan konten cerdas...",
  description = "Kibo sedang menyiapkan materi spesial untuk membantumu belajar. Sebentar lagi siap!",
  className = "",
}: AIContentLoadingProps) {
  return (
    <div
      className={`py-20 px-6 bg-white/90 rounded-3xl border-2 border-blue-100 flex flex-col items-center justify-center gap-4 text-center max-w-lg mx-auto shadow-sm ${className}`}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
          <Bot className="w-10 h-10 text-blue-600 animate-bounce" />
        </div>
      </div>
      <div className="space-y-1.5">
        <h3 className="font-heading font-black text-lg text-slate-900">
          {title}
        </h3>
        {description && (
          <p className="text-slate-500 text-xs sm:text-sm max-w-md">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
