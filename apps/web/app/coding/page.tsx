"use client";

import React, { useState, useCallback, useMemo } from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import {
  Play,
  RotateCcw,
  Trash2,
  Sparkles,
  Code2,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Repeat,
  Brush,
  Eraser,
  ZapOff,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PenColor = "blue" | "amber" | "emerald" | "rose" | "purple" | "off";

type CommandType =
  | "PAINT"       // paint current cell with active color
  | "ERASE"       // erase current cell
  | "MOVE_RIGHT"
  | "MOVE_LEFT"
  | "MOVE_DOWN"
  | "MOVE_UP"
  | "REPEAT_START" // marks start of a repeat block
  | "REPEAT_END";  // marks end of a repeat block (with count)

interface Command {
  id: string;
  type: CommandType;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
  /** For REPEAT_START: how many times to repeat the enclosed block */
  repeatCount?: number;
}

interface ChallengeConfig {
  id: number;
  title: string;
  objective: string;
  hint: string;
  gridCols: number;
  gridRows: number;
  startCell: { row: number; col: number };
  /** Target pattern: array of { row, col, color } cells */
  target: Array<{ row: number; col: number; color: PenColor }>;
  /** Pre-selected color for this challenge */
  defaultColor: PenColor;
  maxCommands: number;
}

// ─── Challenges ───────────────────────────────────────────────────────────────

const CHALLENGES: ChallengeConfig[] = [
  {
    id: 1,
    title: "Level 1: Garis Biru",
    objective: "Gambar garis lurus ke kanan sejauh 4 kotak dengan warna biru!",
    hint: "Gunakan PAINT lalu KANAN berulang — atau coba blok ULANGI untuk cara lebih hemat!",
    gridCols: 6,
    gridRows: 4,
    startCell: { row: 1, col: 0 },
    target: [
      { row: 1, col: 0, color: "blue" },
      { row: 1, col: 1, color: "blue" },
      { row: 1, col: 2, color: "blue" },
      { row: 1, col: 3, color: "blue" },
    ],
    defaultColor: "blue",
    maxCommands: 12,
  },
  {
    id: 2,
    title: "Level 2: Huruf L",
    objective: "Gambar huruf L: turun 3 kotak lalu ke kanan 3 kotak!",
    hint: "Turun dulu 3 langkah sambil cat, lalu ke kanan 3 langkah sambil cat. Gunakan ULANGI untuk hemat blok!",
    gridCols: 6,
    gridRows: 5,
    startCell: { row: 0, col: 1 },
    target: [
      { row: 0, col: 1, color: "emerald" },
      { row: 1, col: 1, color: "emerald" },
      { row: 2, col: 1, color: "emerald" },
      { row: 3, col: 1, color: "emerald" },
      { row: 3, col: 2, color: "emerald" },
      { row: 3, col: 3, color: "emerald" },
      { row: 3, col: 4, color: "emerald" },
    ],
    defaultColor: "emerald",
    maxCommands: 16,
  },
  {
    id: 3,
    title: "Level 3: Kotak Berlian",
    objective: "Gambar bingkai persegi 4×4! Kibo harus mengelilingi seluruh tepi kotak.",
    hint: "Untuk setiap sisi kotak: cat + gerak sebanyak 3 kali, ulangi 4 sisi. Rencanakan dengan ULANGI!",
    gridCols: 6,
    gridRows: 6,
    startCell: { row: 1, col: 1 },
    target: [
      // top edge
      { row: 1, col: 1, color: "rose" }, { row: 1, col: 2, color: "rose" },
      { row: 1, col: 3, color: "rose" }, { row: 1, col: 4, color: "rose" },
      // right edge
      { row: 2, col: 4, color: "rose" }, { row: 3, col: 4, color: "rose" },
      { row: 4, col: 4, color: "rose" },
      // bottom edge
      { row: 4, col: 3, color: "rose" }, { row: 4, col: 2, color: "rose" },
      { row: 4, col: 1, color: "rose" },
      // left edge
      { row: 3, col: 1, color: "rose" }, { row: 2, col: 1, color: "rose" },
    ],
    defaultColor: "rose",
    maxCommands: 20,
  },
];

// ─── Color mappings ────────────────────────────────────────────────────────────

const COLOR_BG: Record<PenColor, string> = {
  blue: "bg-blue-500",
  amber: "bg-amber-400",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  purple: "bg-purple-500",
  off: "bg-transparent",
};

const COLOR_BORDER: Record<PenColor, string> = {
  blue: "border-blue-700",
  amber: "border-amber-600",
  emerald: "border-emerald-700",
  rose: "border-rose-700",
  purple: "border-purple-700",
  off: "border-transparent",
};

// ─── Palette definition ────────────────────────────────────────────────────────

function buildPalette(color: PenColor): Omit<Command, "id">[] {
  return [
    {
      type: "PAINT",
      label: "Cat Kotak",
      icon: <Brush className="w-4 h-4" />,
      colorClass: `${COLOR_BG[color]} text-white shadow-[0_3px_0_rgba(0,0,0,0.25)]`,
    },
    {
      type: "ERASE",
      label: "Hapus Kotak",
      icon: <Eraser className="w-4 h-4" />,
      colorClass: "bg-slate-400 hover:bg-slate-500 text-white shadow-[0_3px_0_#64748b]",
    },
    {
      type: "MOVE_RIGHT",
      label: "Geser Kanan →",
      icon: <ChevronRight className="w-4 h-4" />,
      colorClass: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_3px_0_#3730A3]",
    },
    {
      type: "MOVE_LEFT",
      label: "Geser Kiri ←",
      icon: <ChevronRight className="w-4 h-4 rotate-180" />,
      colorClass: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_3px_0_#3730A3]",
    },
    {
      type: "MOVE_DOWN",
      label: "Geser Bawah ↓",
      icon: <ChevronRight className="w-4 h-4 rotate-90" />,
      colorClass: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_3px_0_#3730A3]",
    },
    {
      type: "MOVE_UP",
      label: "Geser Atas ↑",
      icon: <ChevronRight className="w-4 h-4 -rotate-90" />,
      colorClass: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_3px_0_#3730A3]",
    },
    {
      type: "REPEAT_START",
      label: "Ulangi 2×",
      icon: <Repeat className="w-4 h-4" />,
      colorClass: "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_3px_0_#6B21A8]",
      repeatCount: 2,
    },
    {
      type: "REPEAT_START",
      label: "Ulangi 3×",
      icon: <Repeat className="w-4 h-4" />,
      colorClass: "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_3px_0_#6B21A8]",
      repeatCount: 3,
    },
    {
      type: "REPEAT_START",
      label: "Ulangi 4×",
      icon: <Repeat className="w-4 h-4" />,
      colorClass: "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_3px_0_#6B21A8]",
      repeatCount: 4,
    },
    {
      type: "REPEAT_END",
      label: "Akhir Ulangi }",
      icon: <ZapOff className="w-4 h-4" />,
      colorClass: "bg-violet-700 hover:bg-violet-800 text-white shadow-[0_3px_0_#4C1D95]",
    },
  ];
}

// ─── Interpreter ──────────────────────────────────────────────────────────────

type GridState = Record<string, PenColor>; // key = "row-col"

function runProgram(
  commands: Command[],
  start: { row: number; col: number },
  gridRows: number,
  gridCols: number,
  activeColor: PenColor
): { grid: GridState; error: string | null } {
  const grid: GridState = {};
  let row = start.row;
  let col = start.col;

  const exec = (cmds: Command[]): string | null => {
    let i = 0;
    while (i < cmds.length) {
      const cmd = cmds[i]!;

      if (cmd.type === "PAINT") {
        grid[`${row}-${col}`] = activeColor;
      } else if (cmd.type === "ERASE") {
        delete grid[`${row}-${col}`];
      } else if (cmd.type === "MOVE_RIGHT") {
        col = Math.min(col + 1, gridCols - 1);
      } else if (cmd.type === "MOVE_LEFT") {
        col = Math.max(col - 1, 0);
      } else if (cmd.type === "MOVE_DOWN") {
        row = Math.min(row + 1, gridRows - 1);
      } else if (cmd.type === "MOVE_UP") {
        row = Math.max(row - 1, 0);
      } else if (cmd.type === "REPEAT_START") {
        // Collect the inner block up to the matching REPEAT_END
        const count = cmd.repeatCount ?? 2;
        let depth = 1;
        let j = i + 1;
        while (j < cmds.length && depth > 0) {
          if (cmds[j]!.type === "REPEAT_START") depth++;
          if (cmds[j]!.type === "REPEAT_END") depth--;
          j++;
        }
        if (depth !== 0) {
          return "Blok ULANGI tidak memiliki penutup 'Akhir Ulangi'. Tambahkan blok penutup!";
        }
        const innerBlock = cmds.slice(i + 1, j - 1);
        for (let rep = 0; rep < count; rep++) {
          const err = exec(innerBlock);
          if (err) return err;
        }
        i = j - 1; // skip to after REPEAT_END
      } else if (cmd.type === "REPEAT_END") {
        // Handled by parent; if orphaned, skip silently
      }

      i++;
    }
    return null;
  };

  const error = exec(commands);
  return { grid, error };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CodingArenaPage() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const challenge = CHALLENGES[challengeIdx] ?? CHALLENGES[0]!;
  const palette = buildPalette(challenge.defaultColor);

  const [commands, setCommands] = useState<Command[]>([]);
  const [resultGrid, setResultGrid] = useState<GridState>({});
  const [cursorPos, setCursorPos] = useState(challenge.startCell);
  const [status, setStatus] = useState<"idle" | "success" | "partial" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [executedCmds, setExecutedCmds] = useState<Command[]>([]);

  // Build target key set for comparison
  const targetMap = useMemo(() => {
    const m: Record<string, PenColor> = {};
    challenge.target.forEach((t) => { m[`${t.row}-${t.col}`] = t.color; });
    return m;
  }, [challenge]);

  const resetAll = useCallback(() => {
    setCommands([]);
    setResultGrid({});
    setCursorPos(challenge.startCell);
    setStatus("idle");
    setStatusMsg("");
    setExecutedCmds([]);
  }, [challenge]);

  // Reset when challenge changes
  React.useEffect(() => {
    resetAll();
  }, [challengeIdx, resetAll]);

  const handleAddCommand = (item: Omit<Command, "id">) => {
    if (commands.length >= challenge.maxCommands) {
      setStatusMsg(`Maksimal ${challenge.maxCommands} blok perintah untuk misi ini!`);
      return;
    }
    setCommands((prev) => [
      ...prev,
      { ...item, id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` },
    ]);
    setStatusMsg("");
  };

  const handleRemoveCommand = (idx: number) => {
    setCommands((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRun = () => {
    if (commands.length === 0) return;

    const { grid, error } = runProgram(
      commands,
      challenge.startCell,
      challenge.gridRows,
      challenge.gridCols,
      challenge.defaultColor
    );

    setResultGrid(grid);
    setExecutedCmds(commands);

    if (error) {
      setStatus("error");
      setStatusMsg(error);
      return;
    }

    // Check match
    const targetKeys = Object.keys(targetMap);
    const painted = Object.keys(grid);
    const matched = targetKeys.filter((k) => grid[k] === targetMap[k]);

    if (matched.length === targetKeys.length && painted.length === targetKeys.length) {
      setStatus("success");
      setStatusMsg("🎉 Sempurna! Pola berhasil digambar dengan tepat! Kamu hebat!");
    } else if (matched.length > 0) {
      setStatus("partial");
      setStatusMsg(`Hampir! ${matched.length} dari ${targetKeys.length} kotak sudah benar. Coba lagi!`);
    } else {
      setStatus("partial");
      setStatusMsg("Belum ada kotak yang tepat. Periksa urutan perintahmu ya!");
    }
  };

  // ── Cell renderer ──────────────────────────────────────────────────────────

  const renderGrid = (
    gridData: GridState,
    showTarget: boolean
  ) => (
    <div
      className="grid gap-1 w-full"
      style={{ gridTemplateColumns: `repeat(${challenge.gridCols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: challenge.gridRows }).map((_, rIdx) =>
        Array.from({ length: challenge.gridCols }).map((_, cIdx) => {
          const key = `${rIdx}-${cIdx}`;
          const isStart = rIdx === challenge.startCell.row && cIdx === challenge.startCell.col;
          const painted = gridData[key];
          const targetColor = showTarget ? targetMap[key] : undefined;

          return (
            <div
              key={key}
              className={`
                aspect-square rounded-lg border-2 transition-all duration-150 flex items-center justify-center relative
                ${painted ? `${COLOR_BG[painted]} ${COLOR_BORDER[painted]}` : "bg-slate-800 border-slate-700"}
              `}
            >
              {/* Target ghost */}
              {targetColor && !painted && (
                <div className={`absolute inset-1 rounded-md opacity-20 ${COLOR_BG[targetColor]}`} />
              )}
              {isStart && !painted && (
                <span className="text-[10px] text-slate-400 font-bold">▶</span>
              )}
            </div>
          );
        })
      )}
    </div>
  );

  // ── Command list label ─────────────────────────────────────────────────────

  const getIndent = (cmds: Command[], upTo: number) => {
    let depth = 0;
    for (let i = 0; i < upTo; i++) {
      if (cmds[i]!.type === "REPEAT_START") depth++;
      if (cmds[i]!.type === "REPEAT_END") depth = Math.max(0, depth - 1);
    }
    return depth;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-heading text-xs font-bold border border-blue-200">
              <Code2 className="w-3.5 h-3.5" />
              <span>Studio Seni Koding — Gambar dengan Perintah!</span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
              Arena Koding Piksel
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
              {challenge.objective}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {CHALLENGES.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChallengeIdx(idx)}
                className={`px-4 py-2 rounded-full font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  challengeIdx === idx
                    ? "bg-blue-600 text-white shadow-[0_3px_0_#1D4ED8]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Misi {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: Palette */}
          <section className="lg:col-span-3 bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="font-heading font-black text-sm text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Blok Perintah
              </h2>
              <span className="text-[10px] font-bold text-slate-400">Klik untuk tambah</span>
            </div>

            <div className="flex flex-col gap-2">
              {palette.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddCommand(item)}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-2xl font-heading text-xs font-bold transition-all active:translate-y-0.5 cursor-pointer ${item.colorClass}`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Hint */}
            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-heading font-bold text-amber-900 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Tips Kibo:
              </span>
              <p className="leading-relaxed font-semibold">{challenge.hint}</p>
            </div>
          </section>

          {/* Center: Program Sequence */}
          <section className="lg:col-span-5 bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-black text-sm text-slate-800">Program Kibo</h2>
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {commands.length}/{challenge.maxCommands}
                  </span>
                </div>
                {commands.length > 0 && (
                  <button
                    type="button"
                    onClick={resetAll}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus Semua
                  </button>
                )}
              </div>

              {commands.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-3xl mb-2">🎨</span>
                  <p className="font-heading font-bold text-sm text-slate-700 mb-1">Kanvas Kosong</p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Klik blok perintah di kiri untuk menulis program menggambar Kibo!
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                  {commands.map((cmd, idx) => {
                    const indent = getIndent(commands, idx);
                    const isRepeatEnd = cmd.type === "REPEAT_END";
                    const displayIndent = isRepeatEnd ? Math.max(0, indent - 1) : indent;

                    return (
                      <div
                        key={cmd.id}
                        className="flex items-center gap-2"
                        style={{ paddingLeft: `${displayIndent * 16}px` }}
                      >
                        <div className={`flex-1 flex items-center justify-between p-2 rounded-xl border text-xs font-bold transition-all ${
                          cmd.type === "REPEAT_START"
                            ? "bg-purple-50 border-purple-200 text-purple-900"
                            : cmd.type === "REPEAT_END"
                            ? "bg-violet-50 border-violet-200 text-violet-900"
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-heading text-[10px] font-bold shrink-0">
                              {idx + 1}
                            </span>
                            <span className="shrink-0">{cmd.icon}</span>
                            <span className="font-heading">{cmd.label}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCommand(idx)}
                            className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Run / Reset */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={handleRun}
                disabled={commands.length === 0}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-[0_4px_0_#059669] active:translate-y-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Jalankan Program ▶️</span>
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="p-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer active:translate-y-0.5 transition-all"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Right: Canvas Output */}
          <section className="lg:col-span-4 flex flex-col gap-4">

            {/* Result Canvas */}
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-heading font-black text-sm text-slate-800 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Hasil Gambar Kibo
                </h2>
                <span className="text-[11px] font-bold text-slate-400">Kanvas Output</span>
              </div>
              <div className="bg-slate-900 rounded-2xl p-3 border-2 border-slate-800">
                {renderGrid(resultGrid, false)}
              </div>
            </div>

            {/* Target Canvas */}
            <div className="bg-white rounded-3xl p-5 border-2 border-blue-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-heading font-black text-sm text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Target Pola
                </h2>
                <span className="text-[11px] font-bold text-blue-400">Tiru ini!</span>
              </div>
              <div className="bg-slate-900 rounded-2xl p-3 border-2 border-slate-800">
                {renderGrid(targetMap, false)}
              </div>
            </div>

            {/* Status */}
            {statusMsg && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-start gap-2.5 animate-in fade-in ${
                status === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                  : status === "error"
                  ? "bg-rose-50 border-rose-300 text-rose-900"
                  : "bg-amber-50 border-amber-300 text-amber-900"
              }`}>
                {status === "success"
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                }
                <span className="leading-relaxed">{statusMsg}</span>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
