"use client";

import React, { useState, useEffect } from "react";
import { Brain, HelpCircle, Pencil, X, Sparkles, Loader2, Code2, Bot } from "lucide-react";
import type { QuizQuestion } from "@/lib/constants/quiz-questions";
import { api } from "@/lib/api-client";

interface QuestionBoardProps {
  question: QuizQuestion;
  grade?: number;
  gameTitle?: string;
}

export function QuestionBoard({
  question,
  grade = 3,
  gameTitle,
}: QuestionBoardProps) {
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchNotes, setScratchNotes] = useState("");
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  // Reset hint when switching to another question
  useEffect(() => {
    setAiHint(null);
    setShowScratchpad(false);
  }, [question.id, question.question]);

  // Ask Gemini AI for real-time hint
  const handleAskAI = async () => {
    if (aiHint) return;
    setIsLoadingHint(true);
    try {
      const res = await api.games.getHint({
        question: question.question,
        storyPrompt: question.storyPrompt,
        codeSnippet: question.codeSnippet,
        grade,
      });
      setAiHint(res.hint);
    } catch {
      setAiHint("Coba perhatikan urutan instruksinya dari baris pertama ke baris berikutnya ya!");
    } finally {
      setIsLoadingHint(false);
    }
  };

  return (
    <div className="flex-1 text-center md:text-left">
      {/* Mission Title Pill following from game.title */}
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full mb-3 font-heading text-xs sm:text-sm font-bold border border-blue-200 shadow-2xs">
        <Brain className="w-4 h-4 text-blue-600 shrink-0" />
        <span className="truncate max-w-xl">{gameTitle || "Misi Game Edukasi Kibo"}</span>
      </div>

      {/* Story / Context Scenario */}
      {question.storyPrompt && (
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-snug">
          {question.storyPrompt}
        </h2>
      )}

      {/* Direct Question */}
      <p className="text-slate-600 text-base sm:text-lg font-medium mb-4">
        {question.question}
      </p>

      {/* Visual Code Terminal Snippet (If available) */}
      {question.codeSnippet && (
        <div className="text-left bg-slate-900 text-slate-100 rounded-2xl p-4 mb-5 border-2 border-slate-800 shadow-md overflow-x-auto font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-amber-400">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Blok Instruksi Koding</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              KibCode Studio
            </span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed text-blue-200">
            {question.codeSnippet}
          </pre>
        </div>
      )}

      {/* Gemini AI Interactive Hint Speech Bubble */}
      {aiHint && (
        <div className="relative mb-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 text-left shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 font-heading text-xs font-bold text-amber-900">
              <Bot className="w-4 h-4 text-amber-600" />
              <span>Petunjuk Pintar Kibo AI:</span>
            </div>
            <button
              type="button"
              onClick={() => setAiHint(null)}
              className="text-amber-800 hover:text-amber-950 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
            {aiHint}
          </p>
        </div>
      )}

      {/* Helper Action Buttons: Scratchpad & AI Hint */}
      <div className="flex items-center justify-between gap-3 mb-4 px-1 flex-wrap">
        <p className="font-heading text-xs sm:text-sm font-bold text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Pilih satu jawaban yang paling tepat di bawah ini!</span>
        </p>

        <div className="flex items-center gap-2">
          {/* Ask Kibo AI Hint Button (Gemini API Touchpoint 2) */}
          <button
            type="button"
            onClick={handleAskAI}
            disabled={isLoadingHint}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-indigo-900 border border-indigo-200 px-3.5 py-1.5 rounded-full font-heading text-xs font-bold transition-all shadow-xs active:translate-y-0.5 cursor-pointer disabled:opacity-75"
          >
            {isLoadingHint ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            )}
            <span>Tanya Kibo AI</span>
          </button>

          {/* Scratchpad Button */}
          <button
            type="button"
            onClick={() => setShowScratchpad(!showScratchpad)}
            className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3.5 py-1.5 rounded-full font-heading text-xs font-bold transition-colors cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-amber-700" />
            <span>Papan Coretan</span>
          </button>
        </div>
      </div>

      {/* Interactive Scratchpad Sheet */}
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
            placeholder="Tulis urutan langkah atau logika sementara kode di sini..."
            className="w-full h-20 p-2.5 rounded-xl bg-white border border-amber-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono resize-none"
          />
        </div>
      )}
    </div>
  );
}
