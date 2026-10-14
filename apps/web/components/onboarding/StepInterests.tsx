"use client";

import React from "react";
import { Check, Target, Compass } from "lucide-react";

interface StepInterestsProps {
  favoriteInterest: string;
  learningGoal: string;
  onSelectInterest: (interest: string) => void;
  onSelectGoal: (goal: string) => void;
}

const INTERESTS = [
  {
    id: "games",
    title: "Bikin Game & Petualangan",
    desc: "Membuat game labirin, kuis lompat, dan arcade",
    icon: "🎮",
    color: "border-amber-300 bg-amber-50/70 hover:bg-amber-100/70",
    activeColor: "border-amber-500 bg-amber-100 shadow-[0_4px_0_#D97706]",
  },
  {
    id: "animation",
    title: "Animasi & Cerita Visual",
    desc: "Menggambar karakter bergerak dan komik interaktif",
    icon: "🎨",
    color: "border-pink-300 bg-pink-50/70 hover:bg-pink-100/70",
    activeColor: "border-pink-500 bg-pink-100 shadow-[0_4px_0_#DB2777]",
  },
  {
    id: "puzzles",
    title: "Teka-Teki & Logika Asah Otak",
    desc: "Tantangan teka-teki pola, angka, dan algoritma cerdas",
    icon: "🧠",
    color: "border-blue-300 bg-blue-50/70 hover:bg-blue-100/70",
    activeColor: "border-blue-500 bg-blue-100 shadow-[0_4px_0_#2563EB]",
  },
  {
    id: "ai_robotics",
    title: "Robotika & Sahabat AI",
    desc: "Belajar bagaimana komputer dan robot berpikir",
    icon: "🤖",
    color: "border-purple-300 bg-purple-50/70 hover:bg-purple-100/70",
    activeColor: "border-purple-500 bg-purple-100 shadow-[0_4px_0_#7C3AED]",
  },
];

const GOALS = [
  {
    id: "game_creator",
    title: "Bisa bikin game sendiri untuk dimainkan teman!",
    icon: "🕹️",
  },
  {
    id: "problem_solver",
    title: "Melatih cara berpikir logis dan problem-solving",
    icon: "💡",
  },
  {
    id: "future_coder",
    title: "Mempersiapkan masa depan jadi programmer hebat",
    icon: "🚀",
  },
  {
    id: "fun_explorer",
    title: "Ingin coba hal baru yang seru dan menantang",
    icon: "🌈",
  },
];

export function StepInterests({
  favoriteInterest,
  learningGoal,
  onSelectInterest,
  onSelectGoal,
}: StepInterestsProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-center">
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-800">
          Tentukan Minat & Misi Belajarmu
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Kibo akan menyiapkan modul dan game seru yang paling pas buat kamu!
        </p>
      </div>

      {/* Part 1: Favorite Topic */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-blue-600" />
          <h3 className="font-heading text-sm sm:text-base font-black text-slate-800">
            Topik mana yang paling bikin kamu penasaran?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INTERESTS.map((item) => {
            const isSelected = favoriteInterest === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectInterest(item.id)}
                className={`tactile-btn p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? `${item.activeColor} translate-y-[-2px]`
                    : `${item.color} shadow-[0_3px_0_#CBD5E1]`
                }`}
              >
                <span className="text-2xl select-none shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-heading text-xs sm:text-sm font-black text-slate-900 block truncate">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Part 2: Main Learning Goal */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-600" />
          <h3 className="font-heading text-sm sm:text-base font-black text-slate-800">
            Apa target impianmu bersama KibCode?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {GOALS.map((goal) => {
            const isSelected = learningGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => onSelectGoal(goal.id)}
                className={`p-3 rounded-2xl border-2 text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 border-blue-500 shadow-[0_3px_0_#2563EB] translate-y-[-1px]"
                    : "bg-white border-slate-200 hover:border-blue-200 shadow-xs"
                }`}
              >
                <span className="text-lg select-none shrink-0">{goal.icon}</span>
                <span className="font-heading text-xs sm:text-sm font-bold text-slate-800 flex-1">
                  {goal.title}
                </span>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
