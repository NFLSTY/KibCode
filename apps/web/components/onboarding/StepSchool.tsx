"use client";

import React from "react";
import { School, MapPin } from "lucide-react";

interface StepSchoolProps {
  schoolName: string;
  onChangeSchool: (name: string) => void;
}

const QUICK_PREFIXES = [
  "SD Negeri ",
  "SDIT ",
  "SD Swasta ",
  "MI ",
  "Homeschooling",
];

export function StepSchool({ schoolName, onChangeSchool }: StepSchoolProps) {
  const handlePrefixClick = (prefix: string) => {
    if (!schoolName) {
      onChangeSchool(prefix);
    } else {
      // If already starts with a prefix, replace it or prepend
      const alreadyHasPrefix = QUICK_PREFIXES.some((p) => schoolName.startsWith(p));
      if (!alreadyHasPrefix) {
        onChangeSchool(prefix + schoolName);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-800">
          Apa Nama Sekolahmu?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Biar Kibo bisa tahu asal sekolah jagoan koding yang satu ini!
        </p>
      </div>

      <div className="flex flex-col gap-3 max-w-lg mx-auto w-full pt-2">
        {/* Input Box */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="schoolNameInput"
            className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2"
          >
            <School className="w-4 h-4 text-blue-600" />
            <span>Nama Sekolah / Madrasah</span>
          </label>

          <div className="relative flex items-center">
            <input
              id="schoolNameInput"
              type="text"
              value={schoolName}
              onChange={(e) => onChangeSchool(e.target.value)}
              placeholder="Contoh: SD Negeri 1 Bintang Harapan"
              autoComplete="off"
              className="w-full min-h-[52px] px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 font-bold focus:border-blue-500 focus:outline-none transition-all shadow-[0_3px_0_#CBD5E1] text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Quick Prefix Buttons */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Pilihan cepat awalan:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_PREFIXES.map((prefix) => (
              <button
                key={prefix}
                type="button"
                onClick={() => handlePrefixClick(prefix)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors cursor-pointer active:scale-95 shadow-xs"
              >
                + {prefix.trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Info card */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 mt-2 flex items-start gap-3">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-xs text-amber-900 leading-relaxed font-semibold">
            Informasi ini hanya digunakan untuk menampilkan nama sekolahmu di kartu petualang dan sertifikat prestasi. Aman & terlindungi!
          </p>
        </div>
      </div>
    </div>
  );
}
