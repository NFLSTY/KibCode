"use client";

import React from "react";
import { Sparkles, Blocks, Dices } from "lucide-react";
import {
  useMazeRunner,
  ArenaGrid,
  CommandToolbox,
  CodeSequenceList,
  KiboFeedback,
} from "./mini-challenge";

import { LandingSection, SectionHeader } from "./shared";

export function MiniChallenge() {
  const {
    puzzle,
    kiboPos,
    codeQueue,
    currentStepIndex,
    isRunning,
    runStatus,
    isObstacle,
    addCommand,
    removeCommand,
    handleClearAll,
    handleResetKibo,
    handleRunCode,
    handleRandomize,
  } = useMazeRunner();

  return (
    <LandingSection id="demo">
      <div className="bg-gradient-to-br from-blue-50 via-white to-amber-50 rounded-3xl p-4 sm:p-8 lg:p-10 border-2 border-blue-200/80 shadow-xl flex flex-col gap-5 sm:gap-8">
        {/* Section Header */}
        <SectionHeader
          layout="split"
          badge={{
            icon: <Blocks className="w-4 h-4 text-blue-500" />,
            text: "Lab Coding Interaktif",
          }}
          title="Tantangan Logika Labirin Kibo"
          description={
            <>
              Susun blok perintah di sebelah kanan untuk memandu Kibo menghindari rintangan batu
              dan meraih Bintang Emas. Klik tombol <strong>Jalankan Kode ▶</strong> untuk melihat
              hasilnya!
            </>
          }
          action={
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="bg-blue-100/80 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 border border-blue-200">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Misi Acak Pintar</span>
              </div>

              <button
                type="button"
                onClick={handleRandomize}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                title="Buat rute tantangan baru"
              >
                <Dices className="w-4 h-4 text-blue-600" />
                <span>Acak Rute</span>
              </button>
            </div>
          }
        />

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 4x3 Grid Maze Arena & Feedback (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <ArenaGrid
              puzzle={puzzle}
              kiboPos={kiboPos}
              isObstacle={isObstacle}
            />

            <KiboFeedback
              runStatus={runStatus}
              goalPos={puzzle.goalPos}
              obstaclesCount={puzzle.obstacles.length}
            />
          </div>

          {/* Right: Code Block Builder & Sequence (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <CommandToolbox
              onAddCommand={addCommand}
              disabled={isRunning}
              currentCount={codeQueue.length}
            />

            <CodeSequenceList
              codeQueue={codeQueue}
              currentStepIndex={currentStepIndex}
              isRunning={isRunning}
              onRemoveCommand={removeCommand}
              onClearAll={handleClearAll}
              onRunCode={handleRunCode}
              onResetKibo={handleResetKibo}
            />
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
