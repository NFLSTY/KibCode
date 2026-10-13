"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Lightbulb,
  HeartHandshake,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";

interface MockChat {
  id: string;
  question: string;
  answer: string;
  hintTag: string;
  buttonLabel: string;
}

const PRESET_CHATS: MockChat[] = [
  {
    id: "chat-1",
    buttonLabel: "❓ Kenapa robot tidak belok?",
    question: "Kibo, kenapa robotku tidak mau belok padahal kodenya sudah aku susun?",
    answer:
      "Pertanyaan bagus, Juara! Coba periksa urutan blok nomor 2. Apakah robotmu masih sibuk melangkah maju? Robot harus menyelesaikan langkahnya dulu baru bisa berputar arah! 🧭✨",
    hintTag: "Petunjuk Urutan Logika",
  },
  {
    id: "chat-2",
    buttonLabel: "🔄 Apa itu Loop?",
    question: "Apa sih maksudnya 'Loop' itu, Kibo? Kedengarannya rumit...",
    answer:
      "Loop itu seperti saat kamu mengayuh sepeda berulang-ulang, atau makan biskuit satu demi satu! Daripada bilang 'Maju 1 langkah' sebanyak 10 kali, kita cukup bilang 'Ulangi Maju 10 kali'. Praktis kan? 🔄🚲",
    hintTag: "Analogi Ramah Anak",
  },
  {
    id: "chat-3",
    buttonLabel: "🧠 Bagaimana AI Kibo bekerja?",
    question: "Bagaimana cara Kibo bisa sepintar ini dan tahu kalau kodenya salah?",
    answer:
      "Kibo belajar dari ribuan pola petualangan coding! Kibo dilatih dengan Artificial Intelligence untuk membaca algoritma dan membantumu menemukan cara terbaik tanpa memberi contekan langsung! 🧠✨",
    hintTag: "Pengenalan AI Cilik",
  },
  {
    id: "chat-4",
    buttonLabel: "🐞 Apa itu Bug?",
    question: "Kibo, apa sebenarnya bedanya 'Bug' dengan 'Error'?",
    answer:
      "Tenang, komputermu tidak rusak sama sekali! 'Bug' itu cuma istilah lucu untuk kesalahan kecil dalam petunjuk kode. Tugas kita seperti detektif yang mencari jejak dan memperbaikinya bersama! 🔍🐞",
    hintTag: "Detektif Kode Cilik",
  },
  {
    id: "chat-5",
    buttonLabel: "💡 Kapan pakai JIKA-MAKA?",
    question: "Kapan kita harus pakai logika 'JIKA-MAKA' (If-Else) di game?",
    answer:
      "Bayangkan aturan di rumah: JIKA hujan, MAKA pakai payung. Kalau di game: JIKA Kibo menyentuh bintang, MAKA tambah skor 100! Sangat seru kan membuat robot bisa mengambil keputusan sendiri? 🎯⭐",
    hintTag: "Pengambilan Keputusan",
  },
  {
    id: "chat-6",
    buttonLabel: "🏺 Apa itu Variabel?",
    question: "Kibo, apa gunanya 'Variabel' di dalam koding game?",
    answer:
      "Bayangkan toples ajaib yang ditempeli label 'Skor'. Setiap kali kamu mengambil bintang, angkanya dimasukkan ke toples itu! Variabel adalah wadah penyimpan info yang bisa berubah-ubah selama petualangan! 📦⭐",
    hintTag: "Penyimpanan Nilai",
  },
];

import { LandingSection, SectionHeader, LandingButton } from "./shared";

export function AITutorSpotlight() {
  const [activeChatId, setActiveChatId] = useState<string>("chat-1");
  const activeChat: MockChat =
    PRESET_CHATS.find((c) => c.id === activeChatId) ?? PRESET_CHATS[0]!;

  return (
    <LandingSection id="ai-tutor">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        {/* Playful Floating Lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <SectionHeader
          layout="center"
          theme="dark"
          badge={{
            icon: <Sparkles className="w-4 h-4 text-amber-300" />,
            text: "Kecerdasan Buatan Ramah Anak",
          }}
          title="Kenalan dengan Kibo: Sahabat AI Coding Cilik!"
          description="Kibo adalah mentor AI adaptif yang membimbing anak saat menemukan bug. Bukan memberi contekan langsung, melainkan melatih rasa penasaran dan kemandirian berpikir."
          className="relative z-10 max-w-3xl"
        />

        {/* Two Column Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 4 AI Pedagogical Pillars */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 flex items-start gap-4 hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-md">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white">
                  Petunjuk Bertahap (Scaffolded Hints)
                </h3>
                <p className="text-blue-100 text-sm mt-1 leading-relaxed font-medium">
                  Kibo memecah problem besar menjadi petunjuk kecil agar anak merasakan sensasi kepuasan menemukan solusi sendiri.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 flex items-start gap-4 hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-emerald-950 flex items-center justify-center shrink-0 shadow-md">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white">
                  Bahasa Ramah &amp; Bebas Istilah Rumit
                </h3>
                <p className="text-blue-100 text-sm mt-1 leading-relaxed font-medium">
                  Konsep coding berat seperti variabel, kondisi, dan loop disederhanakan dengan perumpamaan aktivitas harian anak.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 flex items-start gap-4 hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-rose-400 text-rose-950 flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white">
                  Debugging Ceria Tanpa Rasa Takut
                </h3>
                <p className="text-blue-100 text-sm mt-1 leading-relaxed font-medium">
                  Salah kode adalah bagian normal dari belajar. Kibo selalu memberikan dorongan emosional positif setiap saat.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 flex items-start gap-4 hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-sky-400 text-sky-950 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white">
                  Pendamping Belajar Adaptif (Personalized Pacing)
                </h3>
                <p className="text-blue-100 text-sm mt-1 leading-relaxed font-medium">
                  Kibo menyesuaikan bantuan dengan kecepatan belajar masing-masing anak, memastikan petualangan tetap seru dan menantang.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Chat Simulation Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-7 text-slate-800 shadow-2xl border-4 border-blue-400/30">
            {/* Simulation Header */}
            <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center p-1.5 shadow-sm border border-blue-100 shrink-0">
                  <KiboLogo size={36} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-base leading-tight">
                    Kibo AI Chat Assistant
                  </h4>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    ● Siap Mendampingi 24/7
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 shrink-0">
                {activeChat.hintTag}
              </span>
            </div>

            {/* Simulated Chat Dialogue */}
            <div className="flex flex-col gap-4 py-4 min-h-[170px]">
              {/* Child's Question */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="bg-blue-500 text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] text-xs sm:text-sm font-medium shadow-sm">
                  {activeChat.question}
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  👧
                </div>
              </div>

              {/* Kibo's Answer with Kibo Logo Avatar */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center p-1 shrink-0 shadow-sm border border-blue-100">
                  <KiboLogo size={24} />
                </div>
                <div className="bg-slate-100 text-slate-800 p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-xs sm:text-sm font-medium border border-slate-200 shadow-sm">
                  {activeChat.answer}
                </div>
              </div>
            </div>

            {/* Quick Interactive Prompt Switchers */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 block mb-2">
                Coba tanyakan pada Kibo:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_CHATS.map((chat) => (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => setActiveChatId(chat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeChatId === chat.id
                      ? "bg-blue-600 text-white shadow-sm scale-105"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                  >
                    {chat.buttonLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Card CTA with shared LandingButton */}
            <div className="mt-5 pt-3">
              <LandingButton
                href="/register"
                variant="primary"
                size="full"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Ngobrol &amp; Belajar Bareng Kibo Sekarang
              </LandingButton>
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
