"use client";

import React from "react";
import { Check, Sparkles, Code2, Cpu, Gamepad2, Globe } from "lucide-react";

interface StepExperienceProps {
  hasCodingExp: boolean;
  codingExpLevel: string;
  onToggleExperience: (hasExp: boolean) => void;
  onSelectLevel: (level: string) => void;
}

const EXPERIENCE_LEVELS = [
  {
    id: "block_coding",
    title: "Block / Visual Coding",
    desc: "Menyusun balok warna-warni seperti Scratch atau Blockly",
    icon: <Code2 className="w-5 h-5 text-amber-500" />,
    badge: "Paling Populer",
  },
  {
    id: "game_maker",
    title: "Membuat Game Sendiri",
    desc: "Mendesain game di Roblox Studio, Minecraft, atau Game Maker",
    icon: <Gamepad2 className="w-5 h-5 text-indigo-500" />,
    badge: "Kreator",
  },
  {
    id: "robotics",
    title: "Robotika & Perangkat",
    desc: "Bermain Lego Spike, Micro:bit, atau komponen robotik",
    icon: <Cpu className="w-5 h-5 text-emerald-500" />,
    badge: "Inovator",
  },
  {
    id: "text_coding",
    title: "Ketik Kode Dasar",
    desc: "Pernah mengetik kode HTML, CSS, JavaScript, atau Python sederhana",
    icon: <Globe className="w-5 h-5 text-blue-500" />,
    badge: "Keren Banget",
  },
];

export function StepExperience({
  hasCodingExp,
  codingExpLevel,
  onToggleExperience,
  onSelectLevel,
}: StepExperienceProps) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-800">
          Sudah Pernah Belajar Koding?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Jangan khawatir, tidak perlu pengalaman sebelumnya untuk mulai bersenang-senang!
        </p>
      </div>

      {/* Primary Choices: Yes or No */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full pt-1">
        {/* Choice A: Belum Pernah */}
        <button
          type="button"
          onClick={() => onToggleExperience(false)}
          className={`tactile-btn p-5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
            !hasCodingExp
              ? "bg-amber-50 border-amber-500 shadow-[0_5px_0_#D97706] translate-y-[-2px]"
              : "bg-white border-slate-200 hover:border-amber-300 shadow-[0_4px_0_#CBD5E1]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl select-none">🌱</span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                !hasCodingExp
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {!hasCodingExp && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
          <div>
            <span className="font-heading text-base sm:text-lg font-black text-slate-900 block">
              Belum Pernah Sama Sekali
            </span>
            <p className="text-xs text-slate-600 mt-1">
              Aku baru pertama kali mau belajar koding bareng Kibo!
            </p>
          </div>
        </button>

        {/* Choice B: Sudah Pernah */}
        <button
          type="button"
          onClick={() => onToggleExperience(true)}
          className={`tactile-btn p-5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
            hasCodingExp
              ? "bg-blue-50 border-blue-500 shadow-[0_5px_0_#2563EB] translate-y-[-2px]"
              : "bg-white border-slate-200 hover:border-blue-300 shadow-[0_4px_0_#CBD5E1]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl select-none">🚀</span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                hasCodingExp
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {hasCodingExp && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
          <div>
            <span className="font-heading text-base sm:text-lg font-black text-slate-900 block">
              Sudah Pernah!
            </span>
            <p className="text-xs text-slate-600 mt-1">
              Aku sudah pernah coba sedikit atau sering utak-atik kode!
            </p>
          </div>
        </button>
      </div>

      {/* Follow-up if YES: How far? */}
      {hasCodingExp && (
        <div className="mt-2 max-w-lg mx-auto w-full bg-slate-50 border-2 border-blue-100 rounded-3xl p-5 shadow-xs flex flex-col gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="font-heading text-sm sm:text-base font-black text-slate-800">
              Seberapa jauh kamu pernah belajar?
            </h3>
          </div>
          <p className="text-xs text-slate-500 -mt-1">
            Pilih yang paling cocok dengan pengalamanmu:
          </p>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {EXPERIENCE_LEVELS.map((lvl) => {
              const isSelected = codingExpLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => onSelectLevel(lvl.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-blue-500 shadow-[0_3px_0_#2563EB] translate-y-[-1px]"
                      : "bg-white/80 border-slate-200 hover:border-blue-300 shadow-xs"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    {lvl.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {lvl.title}
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                        {lvl.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {lvl.desc}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
