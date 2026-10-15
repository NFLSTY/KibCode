"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import type { LearningModuleDTO, LearningUnitDTO } from "@kibcode/types";
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Code2,
  Brain,
  Rocket,
  Gamepad2,
  X,
  ArrowRight,
  Lightbulb,
  Award,
  Loader2,
  ChevronLeft,
} from "lucide-react";

export default function KurikulumPage() {
  const { student } = useAuth();
  const [modules, setModules] = useState<LearningModuleDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<LearningModuleDTO | null>(null);
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [completedUnitIds, setCompletedUnitIds] = useState<Set<string>>(new Set());

  // Fetch modules from curriculum engine API
  useEffect(() => {
    async function loadModules() {
      try {
        setIsLoading(true);
        const res = await api.students.getModules();
        if (res.modules && res.modules.length > 0) {
          setModules(res.modules);
        }
      } catch (err) {
        console.warn("Failed to load modules from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadModules();
  }, [student?.id]);

  const handleOpenModule = (mod: LearningModuleDTO) => {
    setActiveModule(mod);
    setActiveUnitIndex(0);
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
  };

  const handleCloseModal = () => {
    setActiveModule(null);
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
  };

  const currentUnit: LearningUnitDTO | undefined =
    activeModule?.units[activeUnitIndex];

  const handleSelectQuiz = (optionId: string) => {
    if (isQuizSubmitted) return;
    setSelectedQuizOption(optionId);
    setIsQuizSubmitted(true);
    if (currentUnit) {
      setCompletedUnitIds((prev) => new Set(prev).add(currentUnit.id));
    }
  };

  const handleNextUnit = () => {
    if (!activeModule) return;
    if (activeUnitIndex < activeModule.units.length - 1) {
      setActiveUnitIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizSubmitted(false);
    }
  };

  const handlePrevUnit = () => {
    if (activeUnitIndex > 0) {
      setActiveUnitIndex((prev) => prev - 1);
      setSelectedQuizOption(null);
      setIsQuizSubmitted(false);
    }
  };

  const totalUnits = useMemo(() => {
    return modules.reduce((acc, m) => acc + (m.units?.length || 0), 0);
  }, [modules]);

  const progressPercent = totalUnits > 0
    ? Math.min(100, Math.round((completedUnitIds.size / totalUnits) * 100))
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 p-6 sm:p-10 text-white shadow-xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-44 h-44 rounded-full bg-amber-400/20 pointer-events-none blur-xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md self-center md:self-start w-fit border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-blue-100">
                  Kurikulum &amp; Modul Belajar SD
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-3 flex-wrap">
                Peta Jalan Koding
              </h1>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
                Kuasai 6 pilar penting koding untuk anak SD langkah demi langkah. Pelajari konsepnya, pahami pola blok kodenya, dan langsung uji pemahamanmu bersama Robot Kibo!
              </p>

              {/* Progress Bar in Hero */}
              <div className="mt-2 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15 max-w-lg">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-blue-100">Progres Belajar Materi:</span>
                  <span className="text-amber-300">{completedUnitIds.size} dari {totalUnits} Pelajaran Tuntas ({progressPercent}%)</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mascot / Level Badge */}
            <div className="shrink-0 text-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-4 flex flex-col items-center justify-center shadow-lg">
                <span className="text-4xl sm:text-5xl mb-1 animate-pulse">🎓</span>
                <span className="font-heading font-black text-xs text-amber-300 uppercase tracking-wider">
                  Target Siswa
                </span>
                <span className="font-heading font-bold text-sm text-white">
                  Kelas {student?.grade || 3} SD
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="font-heading font-bold text-sm">
              Robot Kibo sedang menyusun modul belajarmu...
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, idx) => {
              const isCompleted = mod.units?.every((u) => completedUnitIds.has(u.id));

              return (
                <div
                  key={mod.id}
                  className="bg-white rounded-3xl border-2 border-slate-100 hover:border-blue-200 shadow-[0_8px_24px_-4px_rgba(30,41,59,0.06)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Header Pill */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                        {mod.icon}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-heading font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          Tingkat {mod.difficulty}
                        </span>
                        {isCompleted && (
                          <span className="text-[11px] font-heading font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Tuntas
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="font-heading font-black text-lg text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                      {mod.title}
                    </h2>
                    <p className="text-xs font-bold text-blue-600 mb-2">
                      Fokus: {mod.concept}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {mod.summary}
                    </p>

                    {/* Meta Info */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {mod.units?.length || 3} Pelajaran Interaktif
                      </span>
                      <span className="text-amber-600 font-bold">+60 Bintang</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenModule(mod)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs sm:text-sm shadow-[0_3px_0_#1D4ED8] active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Pelajari Modul</span>
                    </button>
                    <Link
                      href={`/games?category=${mod.category}`}
                      className="inline-flex items-center justify-center p-2.5 rounded-full bg-white hover:bg-amber-50 text-amber-600 border border-slate-200 shadow-xs active:translate-y-0.5 transition-all cursor-pointer"
                      title="Latihan Game"
                    >
                      <Gamepad2 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Quick Motivation Banner */}
        <section className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-amber-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <span className="text-4xl sm:text-5xl">⚡🚀</span>
            <div>
              <h3 className="font-heading font-black text-xl sm:text-2xl mb-1">
                Ingin Langsung Praktek Menjalankan Kode?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-amber-900 max-w-xl">
                Buka Arena Koding untuk menyusun balok perintah dan jalankan robot Kibo di grid petualangan 2D secara langsung!
              </p>
            </div>
          </div>
          <Link
            href="/coding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-sm shadow-[0_4px_0_#0F172A] active:translate-y-1 transition-all shrink-0"
          >
            <Code2 className="w-4 h-4" />
            <span>Buka Arena Koding</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Interactive Module Viewer Modal */}
      {activeModule && currentUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-3xl shrink-0">{activeModule.icon}</span>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                    {activeModule.title}
                  </span>
                  <h3 className="font-heading font-black text-base sm:text-lg text-white truncate">
                    {currentUnit.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs / Step Navigator */}
            <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 shrink-0">
              <div className="flex items-center gap-2">
                {activeModule.units.map((unit, idx) => (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => {
                      setActiveUnitIndex(idx);
                      setSelectedQuizOption(null);
                      setIsQuizSubmitted(false);
                    }}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeUnitIndex === idx
                        ? "bg-blue-600 text-white shadow-xs"
                        : completedUnitIds.has(unit.id)
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-white text-slate-600 hover:bg-slate-200/60"
                    }`}
                  >
                    Unit {idx + 1}
                  </button>
                ))}
              </div>
              <span className="text-slate-400">
                {activeUnitIndex + 1} dari {activeModule.units.length}
              </span>
            </div>

            {/* Modal Body: Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Analogy & Kid-friendly Concept */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-amber-950">
                  <h4 className="font-heading font-bold text-amber-900">
                    Analogi Dunia Nyata:
                  </h4>
                  <p className="leading-relaxed font-medium">
                    {currentUnit.analogy}
                  </p>
                </div>
              </div>

              {/* Core Description */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span>Penjelasan Konsep Koding:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {currentUnit.description}
                </p>
              </div>

              {/* Code Visual Pattern */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <span>Contoh Blok Perintah:</span>
                </h4>
                <div className="bg-slate-900 text-blue-200 rounded-2xl p-4 font-mono text-xs sm:text-sm border-2 border-slate-800 shadow-inner overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{currentUnit.codePattern}</pre>
                </div>
              </div>

              {/* Mini Quiz Check */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <Award className="w-4 h-4" />
                  <span>Kuis Cek Pemahaman:</span>
                </div>
                <p className="font-heading font-bold text-sm text-slate-900">
                  {currentUnit.miniQuiz.question}
                </p>

                <div className="space-y-2 pt-1">
                  {currentUnit.miniQuiz.options.map((opt) => {
                    const isSelected = selectedQuizOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectQuiz(opt.id)}
                        disabled={isQuizSubmitted}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          !isQuizSubmitted
                            ? "bg-white hover:bg-blue-50/50 border-slate-200 text-slate-700 shadow-2xs"
                            : opt.isCorrect
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                            : isSelected
                            ? "bg-rose-50 border-rose-300 text-rose-900"
                            : "bg-white border-slate-100 text-slate-400 opacity-60"
                        }`}
                      >
                        <span className="font-heading font-bold mr-2 text-blue-600">
                          {opt.id}.
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {isQuizSubmitted && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-blue-200 text-xs text-slate-700 leading-relaxed animate-in fade-in">
                    <span className="font-bold text-blue-700 block mb-0.5">
                      💡 Penjelasan:
                    </span>
                    {currentUnit.miniQuiz.explanation}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={handlePrevUnit}
                disabled={activeUnitIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {activeUnitIndex < activeModule.units.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextUnit}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-heading font-bold shadow-[0_3px_0_#1D4ED8] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>Lanjut Unit Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={`/games?category=${activeModule.category}`}
                  onClick={handleCloseModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-heading font-bold shadow-[0_3px_0_#059669] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Mainkan Game Edukasi Ini!</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
