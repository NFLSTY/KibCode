"use client";

import React, { useState } from "react";
import { Sparkles, X, Bot, Loader2, ArrowRight, Wand2 } from "lucide-react";
import type { GameCategory, GameDTO } from "@kibcode/types";
import { api } from "@/lib/api-client";

interface AIGameGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGameCreated: (newGame: GameDTO) => void;
  grade?: number;
}

const QUICK_TOPICS = [
  { label: "Roket Antariksa", topic: "Misi Roket Menuju Bintang", category: "loops" as GameCategory },
  { label: "Robot Pembersih", topic: "Robot Kibo Membersihkan Kamar", category: "logic" as GameCategory },
  { label: "Lampu Kota Pintar", topic: "Sensor Lampu Lalu Lintas Pintar", category: "conditionals" as GameCategory },
  { label: "Detektif Bug", topic: "Menemukan Error Kode Mesin Game", category: "debugging" as GameCategory },
  { label: "Peti Harta Karun", topic: "Kotak Variabel Skor dan Koin", category: "algorithms" as GameCategory },
];

export function AIGameGeneratorModal({
  isOpen,
  onClose,
  onGameCreated,
  grade = 3,
}: AIGameGeneratorModalProps) {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState<GameCategory>("logic");
  const [difficulty, setDifficulty] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTopic = topic.trim() || "Petualangan Koding Ceria Kibo";
    setErrorMsg(null);
    setIsGenerating(true);

    try {
      const res = await api.games.generate({
        topic: finalTopic,
        category,
        grade,
        difficulty,
      });

      if (res.game) {
        onGameCreated(res.game);
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal membuat game AI. Coba lagi.";
      setErrorMsg(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-blue-100 flex flex-col gap-5 overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-md font-bold">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Kibo AI Game Generator</span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Rakit Tantangan Koding AI
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isGenerating}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Quick Ideas */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              Pilih Ide Cepat atau Tulis Topikmu Sendiri:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TOPICS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setTopic(item.topic);
                    setCategory(item.category);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    topic === item.topic
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Topik Petualangan Koding
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Robot Penjelajah Hutan, Balap Kode Mobil"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-sm text-slate-800"
              disabled={isGenerating}
            />
          </div>

          {/* Category & Difficulty Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fokus Materi Koding
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GameCategory)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs text-slate-800 cursor-pointer"
                disabled={isGenerating}
              >
                <option value="logic">Logika Urutan (Sequence)</option>
                <option value="loops">Perulangan (Loop)</option>
                <option value="conditionals">Jika-Maka (If-Else)</option>
                <option value="debugging">Pemburu Bug (Debugging)</option>
                <option value="algorithms">Variabel & Algoritma</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Kesulitan
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs text-slate-800 cursor-pointer"
                disabled={isGenerating}
              >
                <option value={1}>Level 1: Pemula (Mudah)</option>
                <option value={2}>Level 2: Menengah (Sedang)</option>
                <option value={3}>Level 3: Tingkat Tantangan</option>
              </select>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-heading text-sm font-black shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                  <span>Kibo Sedang Merakit Game Koding...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 text-amber-300" />
                  <span>Buat Game Sekarang dengan AI</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
