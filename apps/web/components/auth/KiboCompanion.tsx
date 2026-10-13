import React from "react";
import { Sparkles } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import type { AuthMode } from "./types";

interface KiboCompanionProps {
  mode: AuthMode;
}

export function KiboCompanion({ mode }: KiboCompanionProps) {
  const isLogin = mode === "login";

  return (
    <div
      className={`hidden lg:flex w-full h-full p-6 md:p-8 flex-col justify-center items-center gap-4 relative overflow-hidden transition-colors duration-700 ${
        isLogin
          ? "bg-gradient-to-b from-blue-50 to-sky-100/60"
          : "bg-gradient-to-b from-amber-50 to-orange-100/60"
      }`}
    >
      {/* Decorative ambient background glows */}
      <div
        className={`absolute -top-10 -left-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
          isLogin ? "bg-blue-300/30" : "bg-amber-300/30"
        }`}
      />
      <div
        className={`absolute -bottom-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
          isLogin ? "bg-sky-300/30" : "bg-orange-300/30"
        }`}
      />

      {/* Speech Bubble */}
      <div className="relative z-10 w-full max-w-[280px] flex flex-col gap-2">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-xs font-bold w-fit shadow-sm transition-colors duration-500 ${
            isLogin ? "text-blue-700" : "text-amber-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isLogin ? "Ruang Belajar Ceria" : "Petualangan Baru"}</span>
        </div>

        <div
          className={`relative bg-white p-4 rounded-2xl transition-all duration-500 ${
            isLogin
              ? "shadow-[0_4px_0_#DBEAFE]"
              : "shadow-[0_4px_0_#FEF3C7]"
          }`}
        >
          <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed">
            {isLogin
              ? "Halo Sahabat Juara! Siap melanjutkan petualangan belajarmu hari ini?"
              : "Ayo bergabung! Buat akunmu dan mulai kumpulkan bintang emas setiap hari!"}
          </p>
          {/* Centered speech bubble pointer pointing directly down to Kibo */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white" />
        </div>
      </div>

      {/* Mascot Visual Artwork */}
      <div className="relative z-10 flex justify-center items-center">
        <div
          className={`w-40 h-40 rounded-3xl bg-white p-4 flex flex-col items-center justify-center transition-all duration-500 ${
            isLogin
              ? "shadow-[0_8px_20px_rgba(59,130,246,0.15)] border-4 border-blue-200"
              : "shadow-[0_8px_20px_rgba(251,191,36,0.2)] border-4 border-amber-300"
          }`}
        >
          <div className="mb-2 animate-slow-bounce">
            <KiboLogo size={70} />
          </div>
          <span
            className={`font-heading font-bold text-xs px-3 py-1 rounded-full transition-colors duration-500 ${
              isLogin
                ? "text-blue-600 bg-blue-50"
                : "text-amber-700 bg-amber-50"
            }`}
          >
            {isLogin ? "Kibo si Robot Cilik" : "Siap Belajar Menjadi Juara!"}
          </span>
        </div>
      </div>
    </div>
  );
}