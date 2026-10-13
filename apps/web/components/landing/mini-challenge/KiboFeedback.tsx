"use client";

import React from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { Position, RunStatus } from "./types";

interface KiboFeedbackProps {
  runStatus: RunStatus;
  goalPos: Position;
  obstaclesCount: number;
}

export function KiboFeedback({
  runStatus,
  goalPos,
  obstaclesCount,
}: KiboFeedbackProps) {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${
        runStatus === "success"
          ? "bg-emerald-100/90 text-emerald-950 border-emerald-300"
          : runStatus === "hit_obstacle"
            ? "bg-rose-100/90 text-rose-950 border-rose-300"
            : runStatus === "out_of_bounds"
              ? "bg-rose-100/90 text-rose-950 border-rose-300"
              : runStatus === "incomplete"
                ? "bg-amber-100/90 text-amber-950 border-amber-300"
                : "bg-blue-50/80 text-blue-950 border-blue-200"
      }`}
    >
      <div className="shrink-0 pt-0.5">
        <KiboLogo size={32} />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-black text-sm sm:text-base">
          {runStatus === "success" && "Horeee! Algoritma Berhasil Sempurna! 🎉"}
          {runStatus === "hit_obstacle" && "Aduh, Kibo Menabrak Batu Rintangan! 🪨"}
          {runStatus === "out_of_bounds" && "Ups, Kibo Melangkah Keluar Arena! 🧭"}
          {runStatus === "incomplete" && "Bagus! Tapi Kibo Belum Sampai ke Bintang 💡"}
          {runStatus === "running" && "Kibo Sedang Menjalankan Kodemu..."}
          {runStatus === "idle" && "Kibo AI Mentor Siap Membantu!"}
        </span>
        <p className="text-xs sm:text-sm font-medium mt-1 leading-relaxed opacity-90">
          {runStatus === "success" &&
            `Luar biasa! Kamu berhasil menyusun rangkaian logika tanpa menabrak batu dan mengumpulkan Bintang Emas di (${goalPos.x},${goalPos.y}). Kamu berpikir seperti programmer cilik!`}
          {runStatus === "hit_obstacle" &&
            "Robot menabrak batu! Coba periksa urutan blok kodemu, lalu arahkan Kibo memutar melewati petak aman atau gunakan Blok Lompat (2 petak) untuk melompati rintangan!"}
          {runStatus === "out_of_bounds" &&
            "Langkah ini melewati batas arena 4x3. Periksa kembali arah panah pada urutan blok kodemu."}
          {runStatus === "incomplete" &&
            `Kibo aman dan tidak menabrak rintangan, tapi langkahmu berhenti sebelum mencapai Bintang di (${goalPos.x},${goalPos.y}). Tambahkan beberapa blok lagi!`}
          {runStatus === "running" &&
            "Memeriksa setiap instruksi baris demi baris secara sekuensial..."}
          {runStatus === "idle" &&
            `Tips Kibo: Perhatikan ${obstaclesCount} batu rintangan. Arahkan Kibo secara bertahap menuju Bintang di (${goalPos.x},${goalPos.y})!`}
        </p>

        {runStatus === "success" && (
          <div className="mt-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-heading font-bold text-xs sm:text-sm shadow-md active:translate-y-0.5 transition-all"
            >
              <Rocket className="w-4 h-4" />
              <span>Buka 50+ Tantangan Coding di KibCode</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
