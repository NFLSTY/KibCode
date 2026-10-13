"use client";

import React from "react";
import { AVAILABLE_COMMANDS } from "./constants";
import { CommandType } from "./types";

interface CommandToolboxProps {
  onAddCommand: (cmdType: CommandType) => void;
  disabled: boolean;
  currentCount: number;
  maxCount?: number;
}

export function CommandToolbox({
  onAddCommand,
  disabled,
  currentCount,
  maxCount = 8,
}: CommandToolboxProps) {
  const isFull = currentCount >= maxCount;

  const moveCommands = AVAILABLE_COMMANDS.filter((cmd) => cmd.category === "move");
  const jumpCommands = AVAILABLE_COMMANDS.filter((cmd) => cmd.category === "jump");

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-md flex flex-col gap-3.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          1. Kotak Blok Perintah
        </span>
        <span className="text-xs font-bold text-slate-400">
          {currentCount}/{maxCount} Blok
        </span>
      </div>

      {/* Variant 1: Maju (1 Petak) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span>Gerak Maju</span>
          </span>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            1 petak
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {moveCommands.map((cmd) => (
            <button
              key={cmd.type}
              type="button"
              onClick={() => onAddCommand(cmd.type)}
              disabled={disabled || isFull}
              className={`p-2.5 sm:p-3 rounded-2xl font-heading font-bold text-xs sm:text-sm shadow-sm border-b-2 flex items-center justify-between gap-1.5 sm:gap-2 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${cmd.bg} ${cmd.border}`}
            >
              <span className="flex items-center gap-1.5 truncate">
                {cmd.icon}
                <span>{cmd.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Variant 2: Lompat (2 Petak) */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>Gerak Lompat</span>
          </span>
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
            2 petak
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {jumpCommands.map((cmd) => (
            <button
              key={cmd.type}
              type="button"
              onClick={() => onAddCommand(cmd.type)}
              disabled={disabled || isFull}
              className={`p-2.5 sm:p-3 rounded-2xl font-heading font-bold text-xs sm:text-sm shadow-sm border-b-2 flex items-center justify-between gap-1.5 sm:gap-2 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${cmd.bg} ${cmd.border}`}
            >
              <span className="flex items-center gap-1.5 truncate">
                {cmd.icon}
                <span>{cmd.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
