"use client";

import React from "react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { Position, PuzzleState, COLS, ROWS } from "./types";

interface ArenaGridProps {
  puzzle: PuzzleState;
  kiboPos: Position;
  isObstacle: (x: number, y: number) => boolean;
}

export function ArenaGrid({ puzzle, kiboPos, isObstacle }: ArenaGridProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-slate-200 shadow-md">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
          Arena Navigasi Robot (4 x 3)
        </span>
        <span className="text-[11px] sm:text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-blue-100 shrink-0">
          Posisi Kibo: ({kiboPos.x}, {kiboPos.y})
        </span>
      </div>

      {/* 4x3 Grid Map with fixed row & column sizing */}
      <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-3.5 aspect-[4/3] w-full">
        {Array.from({ length: ROWS }).map((_, rIdx) =>
          Array.from({ length: COLS }).map((_, cIdx) => {
            const isKiboHere = kiboPos.x === cIdx && kiboPos.y === rIdx;
            const isGoal = puzzle.goalPos.x === cIdx && puzzle.goalPos.y === rIdx;
            const isRock = isObstacle(cIdx, rIdx);
            const isStart = puzzle.startPos.x === cIdx && puzzle.startPos.y === rIdx;

            let tileBg = "bg-slate-50 border-slate-200 text-slate-400";
            if (isRock) {
              tileBg = "bg-rose-50/80 border-rose-300 text-rose-700";
            } else if (isGoal) {
              tileBg = "bg-amber-50 border-amber-300";
            } else if (isStart) {
              tileBg = "bg-blue-50/60 border-blue-200";
            }

            if (isKiboHere) {
              tileBg = "bg-blue-100/90 border-blue-500 ring-4 ring-blue-300/50";
            }

            return (
              <div
                key={`${cIdx}-${rIdx}`}
                className={`relative rounded-2xl border-2 flex flex-col items-center justify-center p-1 sm:p-2 transition-all duration-300 w-full h-full min-h-0 min-w-0 overflow-hidden select-none ${tileBg}`}
              >
                {/* Cell Coordinate Pill */}
                <span className="absolute top-1 left-1.5 text-[9px] sm:text-[10px] font-bold text-slate-400 pointer-events-none">
                  {cIdx},{rIdx}
                </span>

                {/* Fixed-dimension Cell Contents */}
                {isKiboHere ? (
                  <div className="flex flex-col items-center justify-center w-full max-h-full px-1">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 shrink-0 drop-shadow-md flex items-center justify-center">
                      <KiboLogo size={36} />
                    </div>
                    <span className="text-[9px] sm:text-[13px] font-black text-blue-700 truncate max-w-full leading-tight mt-1">
                      Kibo
                    </span>
                  </div>
                ) : isGoal ? (
                  <div className="flex flex-col items-center justify-center w-full max-h-full px-0.5 sm:px-1">
                    <span className="text-lg sm:text-2xl shrink-0 animate-bounce select-none leading-none">
                      ⭐
                    </span>
                    <span className="text-[9px] sm:text-[13px] font-bold text-amber-700 leading-tight mt-2 text-center break-words max-w-full">
                      Bintang<br />(+100 XP)
                    </span>
                  </div>
                ) : isRock ? (
                  <div className="flex flex-col items-center justify-center w-full max-h-full px-1">
                    <span className="text-lg sm:text-2xl shrink-0 select-none leading-none">
                      🪨
                    </span>
                    <span className="text-[9px] sm:text-[13px] font-bold text-rose-600 truncate max-w-full leading-tight mt-2">
                      Rintangan
                    </span>
                  </div>
                ) : isStart ? (
                  <span className="text-[10px] sm:text-xs font-bold text-blue-500 uppercase tracking-wide">
                    Start
                  </span>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Arena Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" /> Posisi Awal ({puzzle.startPos.x},{puzzle.startPos.y})
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-base leading-none">🪨</span> {puzzle.obstacles.length} Batu Rintangan
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-base leading-none">⭐</span> Bintang ({puzzle.goalPos.x},{puzzle.goalPos.y})
        </span>
      </div>
    </div>
  );
}
