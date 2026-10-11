"use client";

import React, { useState } from "react";
import { Brain, HelpCircle, Pencil, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/constants/quiz-questions";

interface QuestionBoardProps {
  question: QuizQuestion;
}

export function QuestionBoard({ question }: QuestionBoardProps) {
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchNotes, setScratchNotes] = useState("");

  return (
    <div className="flex-1 text-center md:text-left">
      {/* Motivational Prompt Pill */}
      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full mb-3 font-heading text-xs sm:text-sm font-bold border border-blue-100">
        <Brain className="w-4 h-4 text-blue-600" />
        <span>Ayo kamu pasti bisa! Pahami soalnya ya:</span>
      </div>

      {/* Story / Context Scenario */}
      {question.storyPrompt && (
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-snug">
          {question.storyPrompt}
        </h2>
      )}

      {/* Direct Question */}
      <p className="text-slate-600 text-base sm:text-lg font-medium mb-5">
        {question.question}
      </p>

      {/* Visual Equation / Graphic Board */}
      {question.equationVisual && (
        <div className="inline-flex items-center justify-center gap-3 sm:gap-4 bg-slate-50 border-2 border-slate-200/80 px-6 py-3.5 rounded-2xl shadow-inner mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">{question.equationVisual.icon || "⭐"}</span>
            <span className="font-heading text-2xl sm:text-3xl font-black text-blue-600">
              {question.equationVisual.num1}
            </span>
          </div>

          <span className="font-heading text-2xl sm:text-3xl font-black text-slate-500">
            {question.equationVisual.operator}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-2xl">{question.equationVisual.icon || "⭐"}</span>
            <span className="font-heading text-2xl sm:text-3xl font-black text-blue-600">
              {question.equationVisual.num2}
            </span>
          </div>

          <span className="font-heading text-2xl sm:text-3xl font-black text-slate-500">
            =
          </span>

          <span className="w-12 h-11 flex items-center justify-center bg-amber-400 text-amber-950 font-heading text-2xl font-black rounded-xl shadow-[0_3px_0_#D97706] animate-bounce">
            ?
          </span>
        </div>
      )}

      {/* Instruction & Scratchpad Helper Button */}
      <div className="flex items-center justify-between gap-3 mb-4 px-1">
        <p className="font-heading text-xs sm:text-sm font-bold text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Pilih satu jawaban yang paling tepat di bawah ini!</span>
        </p>

        <button
          type="button"
          onClick={() => setShowScratchpad(!showScratchpad)}
          className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3.5 py-1 rounded-full font-heading text-xs font-bold transition-colors cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5 text-amber-700" />
          <span>Bantuan Coretan ✏️</span>
        </button>
      </div>

      {/* Interactive Scratchpad Sheet Modal */}
      {showScratchpad && (
        <div className="p-4 bg-amber-50/90 border-2 border-amber-300 rounded-2xl mb-5 text-left shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading text-xs font-bold text-amber-900 flex items-center gap-1">
              <Pencil className="w-3.5 h-3.5" /> Papan Coret-Coret Siswa
            </span>
            <button
              type="button"
              onClick={() => setShowScratchpad(false)}
              className="text-amber-800 hover:text-amber-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={scratchNotes}
            onChange={(e) => setScratchNotes(e.target.value)}
            placeholder="Ketik hitungan atau catatan kecilmu di sini, misal: 24 + 10 = 34..."
            className="w-full h-20 p-2.5 rounded-xl bg-white border border-amber-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono resize-none"
          />
        </div>
      )}
    </div>
  );
}
