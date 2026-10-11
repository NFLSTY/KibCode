"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Brain, Star, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";

export function MiniChallenge() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const options = [25, 27, 30];
  const correctAnswer = 27;

  const handleSelect = (val: number) => {
    setSelected(val);
    setIsCorrect(val === correctAnswer);
  };

  const handleReset = () => {
    setSelected(null);
    setIsCorrect(null);
  };

  return (
    <section
      id="mini-challenge"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10"
    >
      <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-3xl p-6 sm:p-10 border-2 border-blue-200/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Challenge Title & Copy */}
        <div className="flex flex-col gap-2.5 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm tracking-wide justify-center md:justify-start">
            <Brain className="w-5 h-5 text-blue-500" />
            <span>Uji Coba Mini Cepat</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900">
            Tebak Hitungan Kilat:{" "}
            <span className="text-blue-600">12 + 15 = ?</span>
          </h3>

          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Pilih jawaban yang benar dan rasakan serunya mengumpulkan bintang
            belajar secara instan!
          </p>

          {/* Feedback Banner */}
          {selected !== null && (
            <div
              className={`mt-2 p-3.5 rounded-2xl flex items-center gap-3 transition-all ${
                isCorrect
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                  : "bg-rose-100 text-rose-900 border border-rose-300"
              }`}
            >
              {isCorrect ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-white" />
                  </div>
                  <div className="text-left text-xs sm:text-sm font-semibold">
                    <p className="font-bold text-emerald-900">
                      ⭐ Hebat Sekali! 12 + 15 = 27!
                    </p>
                    <p>Kamu mendapat +100 Bintang Petualang pertama! 🎉</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-rose-400 text-white flex items-center justify-center shrink-0 text-sm font-black">
                    !
                  </div>
                  <div className="text-left text-xs sm:text-sm font-semibold">
                    <p className="font-bold text-rose-900">Hampir tepat!</p>
                    <p>Yuk coba hitung lagi dengan tenang. Kamu pasti bisa! ✨</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Quiz Interactive Options */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {options.map((option) => {
              const isOptionSelected = selected === option;
              const isOptionCorrect = option === correctAnswer;

              let btnStyle =
                "bg-white hover:bg-slate-50 text-slate-800 shadow-[0_4px_0_#CBD5E1] border border-slate-200";

              if (isOptionSelected) {
                if (isOptionCorrect) {
                  btnStyle =
                    "bg-amber-400 text-amber-950 shadow-[0_4px_0_#D97706] scale-105";
                } else {
                  btnStyle =
                    "bg-rose-400 text-white shadow-[0_4px_0_#BE123C] scale-95";
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-20 sm:w-24 h-16 sm:h-20 rounded-2xl font-heading text-2xl sm:text-3xl font-black active:translate-y-1 transition-all cursor-pointer flex items-center justify-center ${btnStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Action After Answering */}
          {selected !== null && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>

              {isCorrect && (
                <Link
                  href="/games"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  <span>Main Kuis Lainnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
