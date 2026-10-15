"use client";

import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import type { LearningModuleDTO } from "@kibcode/types";
import { AIContentLoading } from "@/components/ui/AIContentLoading";
import { PageLoader } from "@/components/ui/PageLoader";
import {
  ModuleFilters,
  type ModuleCategory,
  type ModuleSortOption,
} from "@/components/curriculum/ModuleFilters";
import { ModuleHero } from "@/components/curriculum/ModuleHero";
import { ModuleCard } from "@/components/curriculum/ModuleCard";
import { ModuleViewerModal } from "@/components/curriculum/ModuleViewerModal";

function KurikulumContent() {
  const searchParams = useSearchParams();
  const openParam = searchParams.get("open");

  const { student, isLoading: authLoading } = useAuth();
  const [modules, setModules] = useState<LearningModuleDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<LearningModuleDTO | null>(null);
  const [completedModuleIds, setCompletedModuleIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory>("all");
  const [selectedSort, setSelectedSort] = useState<ModuleSortOption>("default");
  const [isGeneratingNextModule, setIsGeneratingNextModule] = useState(false);
  const [hasUnlockedNext, setHasUnlockedNext] = useState(false);
  const autoTriggeredRef = useRef(false);

  // Load saved completed modules from localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !student?.id) return;
    try {
      const savedModules = localStorage.getItem(`kibcode_completed_modules_${student.id}`);
      if (savedModules) {
        setCompletedModuleIds(new Set(JSON.parse(savedModules)));
      } else {
        // Fallback migration: check if units were saved before
        const savedUnits = localStorage.getItem(`kibcode_completed_units_${student.id}`);
        if (savedUnits) {
          const unitIds: string[] = JSON.parse(savedUnits);
          // If unit 3 of any module was done, consider module completed
          const derived = new Set<string>();
          unitIds.forEach((uId) => {
            if (uId.includes("-3")) {
              const modKey = uId.replace("unit-", "module-").replace("-3", "");
              derived.add(modKey);
            }
          });
          if (derived.size > 0) {
            setCompletedModuleIds(derived);
          }
        }
      }
    } catch {
      // ignore
    }
  }, [student?.id]);

  // Fetch modules from curriculum engine API (18 progressive modules)
  useEffect(() => {
    async function loadModules() {
      try {
        setIsLoading(true);
        const res = await api.students.getModules();
        if (res.modules && res.modules.length > 0) {
          const withOrder = res.modules.map((m, idx) => ({
            ...m,
            order: m.order ?? idx + 1,
            starsReward: m.starsReward || 50 + m.difficulty * 20,
          }));
          setModules(withOrder);
        }
      } catch (err) {
        console.warn("Failed to load modules from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadModules();
  }, [student?.id]);

  // Auto-open module if URL has ?open=moduleId
  useEffect(() => {
    if (!openParam || modules.length === 0) return;
    const found = modules.find((m) => m.id === openParam);
    if (found) {
      setActiveModule(found);
    }
  }, [openParam, modules]);

  // Record accessed module into localStorage history for dashboard
  const recordRecentModule = (mod: LearningModuleDTO, completed = false) => {
    if (typeof window === "undefined" || !student?.id) return;
    try {
      const key = `kibcode_recent_modules_${student.id}`;
      const existing: any[] = JSON.parse(localStorage.getItem(key) || "[]");
      const filtered = existing.filter((item) => item.id !== mod.id);
      const isDone = completed || completedModuleIds.has(mod.id);
      const updated = [
        {
          id: mod.id,
          order: mod.order,
          category: mod.category,
          title: mod.title,
          concept: mod.concept,
          difficulty: mod.difficulty,
          starsReward: mod.starsReward || 50 + mod.difficulty * 20,
          isCompleted: isDone,
          lastAccessedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, 6);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenModule = (mod: LearningModuleDTO) => {
    setActiveModule(mod);
    recordRecentModule(mod, completedModuleIds.has(mod.id));
  };

  const handleCompleteModule = (moduleId: string) => {
    setCompletedModuleIds((prev) => {
      const next = new Set(prev).add(moduleId);
      if (typeof window !== "undefined" && student?.id) {
        try {
          localStorage.setItem(
            `kibcode_completed_modules_${student.id}`,
            JSON.stringify(Array.from(next))
          );
        } catch {
          // ignore
        }
      }
      return next;
    });

    const target = modules.find((m) => m.id === moduleId);
    if (target) {
      recordRecentModule(target, true);
    }
  };

  const progressPercent =
    modules.length > 0
      ? Math.min(100, Math.round((completedModuleIds.size / modules.length) * 100))
      : 0;

  // Category counts
  const counts = useMemo(() => {
    return {
      all: modules.length,
      logic: modules.filter((m) => m.category === "logic").length,
      loops: modules.filter((m) => m.category === "loops").length,
      conditionals: modules.filter((m) => m.category === "conditionals").length,
      variables: modules.filter((m) => m.category === "variables").length,
      debugging: modules.filter((m) => m.category === "debugging").length,
      algorithms: modules.filter((m) => m.category === "algorithms").length,
      functions: modules.filter((m) => m.category === "functions").length,
      events: modules.filter((m) => m.category === "events").length,
      game_design: modules.filter((m) => m.category === "game_design").length,
    };
  }, [modules]);

  // Filtered and sorted modules
  const displayedModules = useMemo(() => {
    let result = [...modules];

    if (selectedCategory !== "all") {
      result = result.filter((m) => m.category === selectedCategory);
    }

    switch (selectedSort) {
      case "default":
        result.sort((a, b) => (a.order || 0) - (b.order || 0));
        break;
      case "stars":
        result.sort(
          (a, b) =>
            (b.starsReward || 0) - (a.starsReward || 0) ||
            (a.order || 0) - (b.order || 0)
        );
        break;
      case "difficulty-asc":
        result.sort(
          (a, b) =>
            a.difficulty - b.difficulty ||
            (a.order || 0) - (b.order || 0)
        );
        break;
      case "difficulty-desc":
        result.sort(
          (a, b) =>
            b.difficulty - a.difficulty ||
            (a.order || 0) - (b.order || 0)
        );
        break;
      case "uncompleted":
        result.sort((a, b) => {
          const aDone = completedModuleIds.has(a.id) ? 1 : 0;
          const bDone = completedModuleIds.has(b.id) ? 1 : 0;
          if (aDone !== bDone) return aDone - bDone;
          return (a.order || 0) - (b.order || 0);
        });
        break;
      case "completed":
        result.sort((a, b) => {
          const aDone = completedModuleIds.has(a.id) ? 1 : 0;
          const bDone = completedModuleIds.has(b.id) ? 1 : 0;
          if (aDone !== bDone) return bDone - aDone;
          return (a.order || 0) - (b.order || 0);
        });
        break;
    }

    return result;
  }, [modules, selectedCategory, selectedSort, completedModuleIds]);

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-6">
        {/* Modular Hero Section matching Game Edukasi Header Size */}
        <ModuleHero
          totalModules={modules.length}
          grade={student?.grade || 3}
          progressPercent={progressPercent}
          completedModulesCount={completedModuleIds.size}
          isGeneratingNextModule={isGeneratingNextModule}
          hasUnlockedNext={hasUnlockedNext}
        />

        {/* Module Filters & Ordering */}
        <ModuleFilters
          currentCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={counts}
          currentSort={selectedSort}
          onSelectSort={setSelectedSort}
        />

        {/* Modules Grid */}
        {isLoading ? (
          <AIContentLoading
            title="Robot Kibo sedang menyiapkan modul cerdas..."
            description="Kibo sedang menyiapkan modul spesial untuk membantumu belajar. Sebentar lagi siap!"
          />
        ) : displayedModules.length === 0 ? (
          <div className="py-16 px-6 bg-white/90 rounded-3xl border-2 border-dashed border-blue-200 text-center flex flex-col items-center max-w-md mx-auto shadow-sm">
            <span className="text-4xl mb-3">🔍</span>
            <h3 className="font-heading text-lg font-bold text-slate-800 mb-1">
              Tidak Ada Modul Ditemukan
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-4">
              Belum ada modul di kategori ini. Coba pilih kategori lain ya!
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Lihat Semua Modul
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedModules.map((mod) => (
              <ModuleCard
                key={mod.id}
                module={mod}
                isCompleted={completedModuleIds.has(mod.id)}
                onOpen={handleOpenModule}
              />
            ))}
          </section>
        )}
      </main>

      {/* Interactive 3-Page Module Viewer Modal (Hal 1, Hal 2, Hal 3 pattern) */}
      {activeModule && (
        <ModuleViewerModal
          module={activeModule}
          onClose={() => setActiveModule(null)}
          isCompleted={completedModuleIds.has(activeModule.id)}
          onCompleteModule={handleCompleteModule}
        />
      )}

      <Footer />
    </div>
  );
}

export default function KurikulumPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <KurikulumContent />
    </Suspense>
  );
}
