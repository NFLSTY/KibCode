"use client";

import React from "react";
import { Play, RotateCcw, Trash2 } from "lucide-react";
import { CommandBlock } from "./types";

interface CodeSequenceListProps {
  codeQueue: CommandBlock[];
  currentStepIndex: number | null;
  isRunning: boolean;
  onRemoveCommand: (index: number) => void;
  onClearAll: () => void;
  onRunCode: () => void;
  onResetKibo: () => void;
}

export function CodeSequenceList({
  codeQueue,
  currentStepIndex,
  isRunning,
  onRemoveCommand,
  onClearAll,
  onRunCode,
  onResetKibo,
}: CodeSequenceListProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-md flex flex-col gap-3">
      {/* Sequence Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          2. Urutan Algoritmamu
        </span>
        {codeQueue.length > 0 && !isRunning && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Semua</span>
          </button>
        )}
      </div>

      {/* Code Slots / Empty State */}
      {codeQueue.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 text-xs sm:text-sm font-medium">
          <p>Belum ada blok yang dipilih.</p>
          <p className="text-xs text-slate-400 mt-1">
            Klik tombol perintah di atas untuk menyusun langkah Kibo!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {codeQueue.map((block, idx) => {
            const isCurrentExecuting = currentStepIndex === idx;

            return (
              <div
                key={block.id}
                className={`p-2.5 sm:p-3 rounded-xl border-2 flex items-center justify-between transition-all ${
                  isCurrentExecuting
                    ? "bg-blue-100 border-blue-500 scale-[1.02] shadow-md ring-2 ring-blue-300"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm border-b-2 ${block.bg} ${block.border}`}
                  >
                    {block.icon}
                    <span>{block.label}</span>
                  </span>
                </div>

                {!isRunning && (
                  <button
                    type="button"
                    onClick={() => onRemoveCommand(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                    aria-label="Hapus blok"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Action Control Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
        <button
          type="button"
          onClick={onRunCode}
          disabled={codeQueue.length === 0 || isRunning}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-heading font-black text-base py-3.5 rounded-full shadow-[0_4px_0_#059669] active:translate-y-1 transition-all min-h-[48px] cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>{isRunning ? "Menjalankan..." : "Jalankan Kode ▶"}</span>
        </button>

        <button
          type="button"
          onClick={onResetKibo}
          disabled={isRunning}
          className="p-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all disabled:opacity-50 cursor-pointer"
          title="Kembalikan Kibo ke Start"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
