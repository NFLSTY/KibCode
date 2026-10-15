"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  Lightbulb,
  Brain,
  Code2,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Bot,
} from "lucide-react";
import type { LearningModuleDTO, ModuleQuizItem } from "@kibcode/types";
import { getModuleCategoryTheme } from "@/lib/utils/module-category-theme";

interface ModuleViewerModalProps {
  module: LearningModuleDTO;
  onClose: () => void;
  isCompleted?: boolean;
  onCompleteModule: (moduleId: string) => void;
}

export function ModuleViewerModal({
  module: mod,
  onClose,
  isCompleted = false,
  onCompleteModule,
}: ModuleViewerModalProps) {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const theme = getModuleCategoryTheme(mod.category);
  const CategoryIcon = theme.icon;

  // Extract units for Hal. 1, Hal. 2, and Hal. 3
  const unit1 = mod.units?.[0];
  const unit2 = mod.units?.[1];
  const unit3 = mod.units?.[2];

  // Fallback analogy across available units
  const analogyText =
    unit1?.analogy ||
    unit2?.analogy ||
    `Bayangkan kamu sedang memandu Robot Kibo di dunia ${mod.world}. Instruksi yang jelas dan teratur adalah kunci keberhasilan setiap langkah!`;

  // Fallback theory & explanation
  const theoryIntro =
    unit1?.description ||
    `Konsep ${mod.concept} adalah pondasi penting dalam dunia koding. Melalui materi ini, kamu akan memahami bagaimana komputer berpikir dan mengeksekusi instruksi secara logis.`;

  const deepExplanationText =
    unit1?.deepExplanation ||
    `Dalam koding, setiap baris instruksi dijalankan komputer secara terarah. Dengan memahami ${mod.concept}, kamu dapat merancang program dan game yang seru tanpa kebingungan!`;

  // Fallback code and explanation
  const codePatternText =
    unit2?.codePattern ||
    unit1?.codePattern ||
    `// Misi Koding di ${mod.world}\nUlangi 3 kali {\n  Maju 1 Langkah;\n  Ambil Bintang;\n}`;

  const codeExplanationText =
    unit2?.codeExplanation ||
    unit2?.description ||
    `Pada contoh kode di atas, Robot Kibo menjalankan instruksi baris demi baris. Komputer membaca perintah dari atas ke bawah sehingga aksi robot terjadi dengan urutan yang tepat!`;

  const tipsText =
    unit2?.tips ||
    `Tips Cerdas Robot Kibo: Selalu teliti dalam menyusun urutan perintah. Jika robot salah arah, jangan khawatir! Memperbaiki kode (debugging) adalah kunci menjadi programmer hebat! ⭐`;

  // Extract 3 related quiz questions
  const quizQuestions: ModuleQuizItem[] = useMemo(() => {
    const rawList: ModuleQuizItem[] =
      unit3?.miniQuiz?.questions ||
      unit3?.quizQuestions ||
      (unit3?.miniQuiz?.question
        ? [
            {
              id: "q1",
              question: unit3.miniQuiz.question,
              options: unit3.miniQuiz.options,
              explanation: unit3.miniQuiz.explanation,
            },
          ]
        : []);

    if (rawList.length >= 3) return rawList.slice(0, 3);

    const baseQ = rawList[0];
    const q1: ModuleQuizItem = baseQ || {
      id: "q1",
      question: `Berdasarkan materi teori di Hal. 1, apa alasan utama kita membutuhkan konsep ${mod.concept} dalam koding?`,
      options: [
        {
          id: "A",
          text: `Agar instruksi program berjalan teratur, logis, dan komputer dapat mengeksekusinya tanpa error`,
          isCorrect: true,
        },
        {
          id: "B",
          text: `Hanya agar kode terlihat panjang dan komputer mengeluarkan bunyi keras`,
          isCorrect: false,
        },
        {
          id: "C",
          text: `Supaya layar monitor langsung mati otomatis saat dinyalakan`,
          isCorrect: false,
        },
      ],
      explanation: `Tepat sekali! Komputer membutuhkan instruksi yang teratur dan logis agar program dapat berjalan dengan tepat.`,
    };

    const q2: ModuleQuizItem = rawList[1] || {
      id: "q2",
      question: `Perhatikan contoh kode di Hal. 2. Apa yang dilakukan komputer ketika mengeksekusi blok kode tersebut?`,
      options: [
        {
          id: "A",
          text: `Membaca dan memproses setiap baris instruksi dari atas ke bawah secara berurutan`,
          isCorrect: true,
        },
        {
          id: "B",
          text: `Melompati semua baris kode dan menghentikan game`,
          isCorrect: false,
        },
        {
          id: "C",
          text: `Mengacak susunan perintah sehingga robot melangkah mundur tanpa henti`,
          isCorrect: false,
        },
      ],
      explanation: `Benar! Komputer membaca perintah baris demi baris secara teratur untuk memastikan aksinya tepat.`,
    };

    const q3: ModuleQuizItem = rawList[2] || {
      id: "q3",
      question: `Jika ada langkah yang keliru saat menjalankan perintah di Hal. 2, apa langkah terbaik yang harus dilakukan programmer cilik?`,
      options: [
        {
          id: "A",
          text: `Melakukan debugging dengan memeriksa urutan instruksi kembali dan memperbaiki kesalahan logika`,
          isCorrect: true,
        },
        {
          id: "B",
          text: `Menghapus seluruh file dan tidak mau belajar koding lagi`,
          isCorrect: false,
        },
        {
          id: "C",
          text: `Menekan tombol power komputer berkali-kali`,
          isCorrect: false,
        },
      ],
      explanation: `Hebat! Melalui proses debugging, kita melatih ketelitian untuk memperbaiki alur logika agar misi sukses.`,
    };

    return [q1, q2, q3];
  }, [unit3, mod.concept]);

  // Scoring logic: "there must leave only 1 mistake to finish the module"
  const correctCount = useMemo(() => {
    return quizQuestions.filter((q, idx) => {
      const chosenId = selectedAnswers[idx];
      const opt = q.options.find((o) => o.id === chosenId);
      return opt?.isCorrect;
    }).length;
  }, [quizQuestions, selectedAnswers]);

  const mistakesCount = quizQuestions.length - correctCount;
  const isTargetReached = isQuizSubmitted && mistakesCount <= 1;
  const isFailed = isQuizSubmitted && mistakesCount > 1;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === quizQuestions.length;

  const handleSelectOption = (qIdx: number, optionId: string) => {
    if (isQuizSubmitted) return;
    const nextAnswers = { ...selectedAnswers, [qIdx]: optionId };
    setSelectedAnswers(nextAnswers);

    // Auto-submit when all 3 questions have been answered
    if (Object.keys(nextAnswers).length === quizQuestions.length) {
      setIsQuizSubmitted(true);
    }
  };

  const handleRetryQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  const handleFinishModule = () => {
    onCompleteModule(mod.id);
    onClose();
  };

  const handleNextPage = () => {
    if (activePageIndex < 2) {
      setActivePageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      setActivePageIndex((prev) => prev - 1);
    }
  };

  const pageTabs = [
    { label: "Hal. 1", title: "Teori & Konsep" },
    { label: "Hal. 2", title: "Contoh Kode" },
    { label: "Hal. 3", title: "Kuis Pemahaman" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header: Lucide Icon instead of Emoji */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center shrink-0 shadow-xs">
              <CategoryIcon className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                {mod.title}
              </span>
              <h3 className="font-heading font-black text-base sm:text-lg text-white truncate">
                {pageTabs[activePageIndex]?.title || "Materi"}: {mod.concept}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Page Tabs */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            {pageTabs.map((tab, idx) => {
              const isActive = activePageIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePageIndex(idx)}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer font-heading text-xs flex items-center gap-1.5 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs font-black"
                      : isCompleted
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200"
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <span className="text-slate-400 font-bold">
            Hal. {activePageIndex + 1} dari 3
          </span>
        </div>

        {/* Modal Body: Scrollable Content based on 3-Page Pattern */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* HALAMAN 1: Teori, Penjelasan, dengan Analogi di Bagian Tengah */}
          {activePageIndex === 0 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* 1. Pengenalan Teori */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  <Brain className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. Teori &amp; Konsep Dasar Koding</span>
                </div>
                <h4 className="font-heading font-black text-lg text-slate-900">
                  Apa itu {mod.concept}?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {theoryIntro}
                </p>
              </div>

              {/* 2. ANALOGI DI BAGIAN TENGAH (As requested) */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 border-2 border-amber-200 rounded-3xl p-5 shadow-xs flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-amber-400 text-amber-950 shrink-0 shadow-xs">
                  <Lightbulb className="w-6 h-6 text-amber-950" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-amber-950">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-amber-900 text-sm">
                      Analogi Dunia Nyata:
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      Mudah Dipahami
                    </span>
                  </div>
                  <p className="leading-relaxed font-medium pt-1">
                    {analogyText}
                  </p>
                </div>
              </div>

              {/* 3. Penjelasan Mendalam Logika Komputer */}
              <div className="space-y-2 pt-1">
                <h5 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Bagaimana Komputer Menjalankannya?</span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {deepExplanationText}
                </p>
              </div>
            </div>
          )}

          {/* HALAMAN 2: Contoh Kode & Penjelasannya */}
          {activePageIndex === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. Contoh Kode &amp; Pola Perintah</span>
                </div>
                <h4 className="font-heading font-black text-lg text-slate-900">
                  Mari Bedah Pola Kode Ini Bersama Kibo
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Lihat contoh blok kode di bawah ini. Kode inilah yang akan kamu terapkan saat merakit game kodingmu:
                </p>
              </div>

              {/* Code Visual Pattern */}
              <div className="bg-slate-900 text-blue-200 rounded-3xl p-5 font-mono text-xs sm:text-sm border-2 border-slate-800 shadow-inner overflow-x-auto relative group">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Bot className="w-3.5 h-3.5 text-amber-300" />
                    Blok Koding KibCode
                  </span>
                  <span>{mod.world}</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {codePatternText}
                </pre>
              </div>

              {/* Penjelasan Baris demi Baris */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2">
                <h5 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span>Penjelasan Cara Kerja Kode:</span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {codeExplanationText}
                </p>
              </div>

              {/* Tips & Trik dari Robot Kibo */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                <Bot className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs text-blue-950">
                  <strong className="font-heading font-bold text-blue-900 block">
                    Catatan Penting Robot Kibo:
                  </strong>
                  <p className="leading-relaxed font-medium">{tipsText}</p>
                </div>
              </div>
            </div>
          )}

          {/* HALAMAN 3: Kuis Pemahaman Materi Hal 1 & 2 (3 Pertanyaan Terkait) */}
          {activePageIndex === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>3. Kuis Uji Pemahaman Materi</span>
                </div>
                <h4 className="font-heading font-black text-lg text-slate-900">
                  Tantangan Kuis Robot Kibo (3 Soal)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Jawab 3 pertanyaan berikut. Untuk menuntaskan modul ini, kamu hanya diperbolehkan <strong>maksimal 1 kesalahan</strong>!
                </p>
              </div>

              {/* Celebration / Alert Banner upon Submission */}
              {isQuizSubmitted && (
                <>
                  {isTargetReached ? (
                    <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex items-start gap-3.5 shadow-sm animate-in fade-in">
                      <div className="p-2.5 bg-emerald-500 text-white rounded-2xl shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-heading font-black text-base text-emerald-900">
                          🎉 Luar Biasa! Modul Berhasil Dituntaskan!
                        </h5>
                        <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                          Kamu berhasil menjawab <strong>{correctCount} dari {quizQuestions.length}</strong> pertanyaan dengan benar ({mistakesCount === 0 ? "sempurna tanpa kesalahan!" : "hanya 1 kesalahan!"}). Target kelulusan tercapai. Klik tombol <strong>Selesai</strong> di bawah untuk mencatat bintangmu!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 sm:p-5 rounded-3xl bg-rose-50 border-2 border-rose-300 text-rose-950 flex items-start gap-3.5 shadow-sm animate-in fade-in">
                      <div className="p-2.5 bg-rose-500 text-white rounded-2xl shrink-0">
                        <RotateCcw className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-heading font-black text-base text-rose-900">
                          ⚠️ Belum Tuntas: Ayo Coba Lagi!
                        </h5>
                        <p className="text-xs sm:text-sm text-rose-800 font-medium">
                          Kamu menjawab <strong>{correctCount} dari {quizQuestions.length}</strong> benar ({mistakesCount} kesalahan). Maksimal hanya diperbolehkan <strong>1 kesalahan</strong> untuk menyelesaikan modul ini. Pelajari pembahasan di bawah dan klik <strong>Ulangi</strong> untuk mencoba kembali!
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 3 Related Quiz Questions */}
              <div className="space-y-4">
                {quizQuestions.map((q, qIdx) => {
                  const selectedId = selectedAnswers[qIdx];
                  const hasAnsweredThis = Boolean(selectedId);

                  return (
                    <div
                      key={q.id || qIdx}
                      className="bg-white border-2 border-slate-200 rounded-3xl p-5 space-y-3.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading font-bold text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          Soal #{qIdx + 1} dari {quizQuestions.length}
                        </span>
                        {isQuizSubmitted && (
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                              q.options.find((o) => o.id === selectedId)?.isCorrect
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {q.options.find((o) => o.id === selectedId)?.isCorrect
                              ? "✓ Benar"
                              : "✗ Kurang Tepat"}
                          </span>
                        )}
                      </div>

                      <p className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug">
                        {q.question}
                      </p>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt) => {
                          const isSelected = selectedId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption(qIdx, opt.id)}
                              disabled={isQuizSubmitted}
                              className={`w-full text-left px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                !isQuizSubmitted
                                  ? isSelected
                                    ? "bg-blue-50 border-blue-400 text-blue-900 shadow-xs"
                                    : "bg-slate-50/50 hover:bg-blue-50/50 border-slate-200 text-slate-700 hover:border-blue-300"
                                  : opt.isCorrect
                                  ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold"
                                  : isSelected
                                  ? "bg-rose-50 border-rose-300 text-rose-950 font-medium"
                                  : "bg-slate-50 border-slate-100 text-slate-400 opacity-60"
                              }`}
                            >
                              <span className="font-heading font-bold mr-2.5 text-blue-600">
                                {opt.id}.
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {isQuizSubmitted && q.explanation && (
                        <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-slate-700 leading-relaxed mt-2 animate-in fade-in">
                          <span className="font-heading font-bold text-blue-700 block mb-0.5">
                            💡 Pembahasan Robot Kibo:
                          </span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={activePageIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {activePageIndex < 2 ? (
            <button
              type="button"
              onClick={handleNextPage}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-heading font-bold shadow-[0_3px_0_#1D4ED8] active:translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Lanjut ke Hal. {activePageIndex + 2}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            /* Hal 3 CTA: Selesai (Green) if passed, Ulangi (Red) if failed */
            <div className="flex items-center gap-2">
              {!isQuizSubmitted ? (
                <button
                  type="button"
                  disabled={!isAllAnswered}
                  onClick={() => setIsQuizSubmitted(true)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isAllAnswered
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_3px_0_#1D4ED8] active:translate-y-0.5"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {isAllAnswered
                      ? "Periksa Hasil Kuis"
                      : `Pilih Jawaban (${answeredCount}/${quizQuestions.length})`}
                  </span>
                </button>
              ) : isTargetReached || isCompleted ? (
                <button
                  type="button"
                  onClick={handleFinishModule}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-heading font-black shadow-[0_3px_0_#059669] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRetryQuiz}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-heading font-black shadow-[0_3px_0_#E11D48] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
