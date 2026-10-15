"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import {
  CatalogFilters,
  type FilterCategory,
  type SortOption,
} from "@/components/catalog/CatalogFilters";
import { GameCard } from "@/components/catalog/GameCard";
import { AIGameGeneratorModal } from "@/components/catalog/AIGameGeneratorModal";
import {
  type CatalogGameItem,
} from "@/lib/constants/catalog-games";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import type { GameDTO } from "@kibcode/types";
import { Loader2, Sparkles, Bot } from "lucide-react";

function GameCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as FilterCategory | null;

  const { student } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(
    categoryParam &&
      [
        "logic",
        "loops",
        "conditionals",
        "variables",
        "debugging",
        "algorithms",
      ].includes(categoryParam)
      ? categoryParam
      : "all"
  );
  const [selectedSort, setSelectedSort] = useState<SortOption>("popular");
  const [games, setGames] = useState<CatalogGameItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pollCount, setPollCount] = useState(0);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isGeneratingCurriculum, setIsGeneratingCurriculum] = useState(false);

  // Synchronize category param if updated from URL
  useEffect(() => {
    if (
      categoryParam &&
      [
        "logic",
        "loops",
        "conditionals",
        "variables",
        "debugging",
        "algorithms",
        "all",
      ].includes(categoryParam)
    ) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Fetch authentic AI generated games from API
  const loadGames = async () => {
    try {
      setIsLoading(true);
      const res = await api.games.getAll(undefined, student?.id);
      if (res.games && res.games.length > 0) {
        const mapped: CatalogGameItem[] = res.games.map((g) => ({
          id: g.id,
          title: g.title.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim(),
          category: g.category,
          difficulty: g.difficulty,
          description: g.description,
          starsReward: 50 + g.difficulty * 20,
          progressPercent: 0,
          recordScore: 0,
          isLocked: false,
          badgeTag: "AI Track ✨",
        }));
        setGames(mapped);
      } else {
        setGames([]);
      }
    } catch {
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, [student?.id]);

  // Poll in background if games aren't ready yet after onboarding
  useEffect(() => {
    if (!student?.id || games.length > 0 || pollCount >= 15) return;

    const timer = setInterval(async () => {
      try {
        const res = await api.games.getAll(undefined, student.id);
        if (res.games && res.games.length > 0) {
          const mapped: CatalogGameItem[] = res.games.map((g) => ({
            id: g.id,
            title: g.title.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim(),
            category: g.category,
            difficulty: g.difficulty,
            description: g.description,
            starsReward: 50 + g.difficulty * 20,
            progressPercent: 0,
            recordScore: 0,
            isLocked: false,
            badgeTag: "AI Track ✨",
          }));
          setGames(mapped);
          setIsLoading(false);
        } else {
          setPollCount((prev) => prev + 1);
        }
      } catch {
        setPollCount((prev) => prev + 1);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [student?.id, games.length, pollCount]);

  // Handler to generate personalized 50:50 curriculum games
  const handleGenerateCurriculum = async () => {
    try {
      setIsGeneratingCurriculum(true);
      const res = await api.students.generateCurriculum();
      if (res.games && res.games.length > 0) {
        const mapped: CatalogGameItem[] = res.games.map((g) => ({
          id: g.id,
          title: g.title.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim(),
          category: g.category,
          difficulty: g.difficulty,
          description: g.description,
          starsReward: 50 + g.difficulty * 20,
          progressPercent: 0,
          recordScore: 0,
          isLocked: false,
          badgeTag: "AI Track ✨",
        }));
        setGames(mapped);
      }
    } catch (err) {
      console.warn("Curriculum generation fallback:", err);
      await loadGames();
    } finally {
      setIsGeneratingCurriculum(false);
    }
  };

  // Handler when Gemini generates a single custom game from modal
  const handleGameCreated = (newGame: GameDTO) => {
    const newCatalogItem: CatalogGameItem = {
      id: newGame.id,
      title: newGame.title.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim(),
      category: newGame.category,
      difficulty: newGame.difficulty,
      description: newGame.description,
      starsReward: 60 + newGame.difficulty * 20,
      progressPercent: 0,
      recordScore: 0,
      badgeTag: "Baru Dibuat AI ✨",
    };

    setGames((prev) => [newCatalogItem, ...prev]);
    setSelectedCategory("all");
  };

  // Category counts
  const counts = useMemo(() => {
    return {
      all: games.length,
      logic: games.filter((g) => g.category === "logic").length,
      loops: games.filter((g) => g.category === "loops").length,
      conditionals: games.filter((g) => g.category === "conditionals").length,
      variables: games.filter((g) => g.category === "variables").length,
      debugging: games.filter((g) => g.category === "debugging").length,
      algorithms: games.filter((g) => g.category === "algorithms").length,
    };
  }, [games]);

  // Filtered and sorted games
  const displayedGames = useMemo(() => {
    let result = [...games];

    if (selectedCategory !== "all") {
      result = result.filter((g) => g.category === selectedCategory);
    }

    switch (selectedSort) {
      case "popular":
      case "stars":
        result.sort((a, b) => b.starsReward - a.starsReward);
        break;
      case "difficulty-asc":
        result.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case "difficulty-desc":
        result.sort((a, b) => b.difficulty - a.difficulty);
        break;
    }

    return result;
  }, [games, selectedCategory, selectedSort]);

  const isPreparingGames =
    isLoading || (student?.isOnboarded && games.length === 0 && pollCount < 15);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-6">
        {/* Catalog Hero Section with AI Generator Trigger */}
        <CatalogHero
          totalGames={games.length}
          grade={student?.grade || 3}
          onOpenAIGenerator={() => setIsAIModalOpen(true)}
        />

        {/* Filter and Sorting Tabs */}
        <CatalogFilters
          currentCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={counts}
          currentSort={selectedSort}
          onSelectSort={setSelectedSort}
          grade={student?.grade || 3}
        />

        {/* Loading Spinner, Empty State, or Games Grid */}
        {isPreparingGames ? (
          <div className="py-20 px-6 bg-white/90 rounded-3xl border-2 border-blue-100 flex flex-col items-center justify-center gap-4 text-center max-w-lg mx-auto shadow-sm">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                <Bot className="w-10 h-10 text-blue-600 animate-bounce" />
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 fill-amber-300 absolute -top-1 -right-1 animate-spin" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-heading font-black text-lg text-slate-900">
                Robot Kibo sedang menyiapkan game cerdas...
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md">
                Kibo sedang menyiapkan game spesial untuk membantumu belajar. Sebentar lagi siap!
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-heading font-bold text-xs bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses dengan AI...</span>
            </div>
          </div>
        ) : displayedGames.length === 0 ? (
          <div className="py-16 px-6 bg-white/90 rounded-3xl border-2 border-dashed border-amber-300 text-center flex flex-col items-center max-w-xl mx-auto shadow-sm">
            <span className="text-4xl mb-3 animate-bounce">🤖✨</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
              Game Edukasi Siap Dirancang!
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              KibCode tidak menggunakan soal palsu/dummy. Semua game edukasi koding dirancang langsung oleh AI seimbang antara 50% materi koding dasar dan 50% minatmu!
            </p>
            <button
              type="button"
              onClick={handleGenerateCurriculum}
              disabled={isGeneratingCurriculum}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-heading font-bold text-sm px-7 py-3 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-75 cursor-pointer"
            >
              {isGeneratingCurriculum ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Kibo Sedang Merancang 6 Game Edukasi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Buat 6 Game Edukasi Personal Saya 🚀</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </section>
        )}
      </main>

      {/* AI Game Generator Modal */}
      <AIGameGeneratorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGameCreated={handleGameCreated}
        grade={student?.grade || 3}
      />

      <Footer />
    </div>
  );
}

export default function GameCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
          <div className="flex items-center gap-2 text-blue-600 font-heading font-bold">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Memuat Katalog Permainan Koding...</span>
          </div>
        </div>
      }
    >
      <GameCatalogContent />
    </Suspense>
  );
}
