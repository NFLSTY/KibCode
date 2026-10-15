"use client";

import React from "react";
import { Check, X, CheckCircle2 } from "lucide-react";
import type { QuizQuestion } from "@/lib/constants/quiz-questions";

interface AnswerGridProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string, isCorrect: boolean) => void;
}

export function AnswerGrid({
  question,
  selectedOptionId,
  onSelectOption,
}: AnswerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {question.options.map((opt) => {
        const isSelected = selectedOptionId === opt.id;
        const hasAnswered = selectedOptionId !== null;

        let cardStyle =
          "bg-white border-2 border-slate-100 shadow-[0_6px_0_#DEE8FF] hover:shadow-[0_2px_0_#DEE8FF] hover:translate-y-1 active:translate-y-1.5 active:shadow-none";
        let letterBadge =
          "bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700";

        if (hasAnswered) {
          if (isSelected) {
            if (opt.isCorrect) {
              cardStyle =
                "bg-emerald-50/80 border-2 border-emerald-400 shadow-[0_6px_0_#059669] translate-y-0.5";
              letterBadge = "bg-emerald-500 text-white shadow-sm";
            } else {
              cardStyle =
                "bg-rose-50/80 border-2 border-rose-300 shadow-[0_4px_0_#FCA5A5] opacity-95";
              letterBadge = "bg-rose-500 text-white shadow-sm";
            }
          } else if (opt.isCorrect) {
            // Highlight the correct answer if the student made a mistake
            cardStyle =
              "bg-emerald-50/50 border-2 border-dashed border-emerald-300 opacity-90";
            letterBadge = "bg-emerald-200 text-emerald-900";
          } else {
            cardStyle = "bg-slate-50 border border-slate-200 opacity-50";
          }
        }

        return (
          <button
            key={opt.id}
            type="button"
            disabled={hasAnswered}
            onClick={() => onSelectOption(opt.id, opt.isCorrect)}
            className={`group relative flex items-center justify-between min-h-[72px] px-6 py-4 rounded-2xl transition-all text-left cursor-pointer ${cardStyle}`}
          >
            <div className="flex items-center gap-4">
              {/* Option Letter (A, B, C, D) */}
              <span
                className={`w-11 h-11 flex items-center justify-center rounded-xl font-heading text-lg font-bold shrink-0 transition-colors ${letterBadge}`}
              >
                {opt.label}
              </span>

              {/* Text & Feedback Subtext */}
              <div className="flex flex-col">
                <span
                  className={`font-heading text-xl sm:text-2xl font-black ${
                    isSelected && opt.isCorrect
                      ? "text-emerald-700 flex items-center gap-2"
                      : isSelected && !opt.isCorrect
                      ? "text-rose-700"
                      : "text-slate-900"
                  }`}
                >
                  {opt.text}
                  {isSelected && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 inline" />
                  )}
                </span>

                {isSelected && (
                  <span
                    className={`font-heading text-xs font-bold mt-0.5 ${
                      opt.isCorrect ? "text-emerald-700" : "text-rose-600"
                    }`}
                  >
                    {opt.isCorrect
                      ? "Jawaban tepat!"
                      : "Hampir tepat, coba pelajari ya"}
                  </span>
                )}
              </div>
            </div>

            {/* Stamp Badge */}
            {hasAnswered && isSelected && (
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md animate-bounce shrink-0 ${
                  opt.isCorrect
                    ? "bg-emerald-500 text-white"
                    : "bg-rose-500 text-white"
                }`}
              >
                {opt.isCorrect ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <X className="w-5 h-5 stroke-[3]" />
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
