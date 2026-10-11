"use client";

import React from "react";

interface KiboMascotProps {
  mood?: "idle" | "happy" | "thinking";
}

export function KiboMascot({ mood = "idle" }: KiboMascotProps) {
  return (
    <div className="shrink-0 flex flex-col items-center">
      <div
        className={`w-24 h-24 md:w-28 md:h-28 bg-blue-50/80 rounded-3xl p-2 flex items-center justify-center shadow-[0_6px_0_#BFDBFE] transition-all ${
          mood === "happy"
            ? "scale-110 rotate-3 ring-4 ring-amber-300"
            : "hover:rotate-3"
        }`}
      >
        <svg
          className="w-full h-full drop-shadow-sm select-none"
          fill="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body / Pencil Body */}
          <rect fill="#2563EB" height="48" rx="10" width="40" x="30" y="22" />
          <rect fill="#F8FAFC" height="24" rx="6" width="32" x="34" y="26" />

          {/* Screen Eyes */}
          <circle cx="43" cy="38" fill="#0F172A" r="4.5" />
          <circle cx="57" cy="38" fill="#0F172A" r="4.5" />
          <circle cx="44.5" cy="36.5" fill="#FFFFFF" r="1.5" />
          <circle cx="58.5" cy="36.5" fill="#FFFFFF" r="1.5" />

          {/* Cheerful Smile */}
          <path
            d={
              mood === "happy"
                ? "M44 42C46 47 54 47 56 42"
                : "M46 44C47.5 46.5 52.5 46.5 54 44"
            }
            stroke="#0F172A"
            strokeLinecap="round"
            strokeWidth="2.5"
          />

          {/* Cheeks */}
          <circle cx="38" cy="42" fill="#FB7185" r="2.5" />
          <circle cx="62" cy="42" fill="#FB7185" r="2.5" />

          {/* Pencil Nib / Hat */}
          <polygon fill="#FBBF24" points="50,4 32,22 68,22" />
          <polygon fill="#1E293B" points="50,4 43,12 57,12" />

          {/* Hands */}
          <rect fill="#93C5FD" height="6" rx="3" width="10" x="20" y="40" />
          <rect
            fill="#93C5FD"
            height="6"
            rx="3"
            transform="rotate(-25 70 34)"
            width="10"
            x="70"
            y="34"
          />

          {/* Stars Orbiting */}
          <polygon
            fill="#FBBF24"
            points="22,18 24,23 29,23 25,26 27,31 22,28 17,31 19,26 15,23 20,23"
            transform="scale(0.6) translate(10,5)"
          />

          {/* Wheels / Base */}
          <circle cx="40" cy="74" fill="#64748B" r="6" />
          <circle cx="60" cy="74" fill="#64748B" r="6" />
          <circle cx="40" cy="74" fill="#FFFFFF" r="2.5" />
          <circle cx="60" cy="74" fill="#FFFFFF" r="2.5" />
        </svg>
      </div>

      <span className="mt-2 bg-amber-200 text-amber-950 text-center font-heading text-xs font-bold px-3 py-0.5 rounded-full shadow-sm border border-amber-300">
        Kibo Pensil 🚀
      </span>
    </div>
  );
}
