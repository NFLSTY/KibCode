"use client";

import React, { Suspense, useEffect, useMemo, useState, useCallback } from "react";
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
import type { CatalogGameItem } from "@/lib/constants/catalog-games";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import type { GameDTO } from "@kibcode/types";
import { Loader2, Sparkles } from "lucide-react";
import { AIContentLoading } from "@/components/ui/AIContentLoading";
import { PageLoader } from "@/components/ui/PageLoader";

function GameCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as FilterCategory | null;

  const { student, isLoading: authLoading } = useAuth();
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

  // Fetch authentic AI generated games from API and merge progress
  const loadGames = useCallback(async () => {
    try {
      setIsLoading(true);
      const [res, progressRes] = await Promise.all([
        api.games.getAll(undefined, student?.id),
        student?.id
          ? api.progress.getByStudent(student.id).catch(() => ({ progress: [] }))
          : Promise.resolve({ progress: [] }),
      ]);

      const backendProgressList = progressRes?.progress || [];
      const studentKey = student?.id || "guest";

      if (res.games && res.games.length > 0) {
        const mapped: CatalogGameItem[] = res.games.map((g) => {
          // Check backend progress
          const bp = backendProgressList.find(
            (p) => p.gameId === g.id && p.completed
          );

          // Check local completion storage
          let localCompleted: { score?: number; starsCollected?: number } | null = null;
          try {
            const cStr = localStorage.getItem(
              `kibcode_game_completed_${studentKey}_${g.id}`
            );
            if (cStr) localCompleted = JSON.parse(cStr);
          } catch {
            // Ignore parse errors
          }

          // Check in-progress session if stopped in the middle
          let inProgressSession: {
            currentIndex?: number;
            totalQuestions?: number;
            starsCollected?: number;
          } | null = null;
          try {
            const sStr = localStorage.getItem(
              `kibcode_game_session_${studentKey}_${g.id}`
            );
            if (sStr) inProgressSession = JSON.parse(sStr);
          } catch {
            // Ignore parse errors
          }

          let progressPercent = 0;
          let recordScore = 0;

          if (bp || localCompleted) {
            progressPercent = 100;
            recordScore = bp?.score ?? localCompleted?.score ?? 100;
          } else if (
            inProgressSession &&
            typeof inProgressSession.currentIndex === "number" &&
            inProgressSession.currentIndex > 0
          ) {
            const totalQuestions =
              (g.questions as any)?.length ||
              inProgressSession.totalQuestions ||
              10;
            progressPercent = Math.min(
              99,
              Math.round((inProgressSession.currentIndex / totalQuestions) * 100)
            );
            recordScore = inProgressSession.starsCollected || 0;
          }

          return {
            id: g.id,
            title: g.title.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim(),
            category: g.category,
            difficulty: g.difficulty,
            description: g.description,
            starsReward: 50 + g.difficulty * 20,
            progressPercent,
            recordScore,
            isLocked: false,
            badgeTag: "Trek AI",
          };
        });
        setGames(mapped);
      } else {
        setGames([]);
      }
    } catch {
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  }, [student?.id]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  // Re-synchronize local progress when window gains focus (e.g. after finishing a game)
  useEffect(() => {
    const handleFocus = () => {
      setGames((prev) =>
        prev.map((g) => {
          const studentKey = student?.id || "guest";
          let localCompleted = null;
          try {
            const cStr = localStorage.getItem(
              `kibcode_game_completed_${studentKey}_${g.id}`
            );
            if (cStr) localCompleted = JSON.parse(cStr);
          } catch {
            // Ignore
          }

          let inProgressSession = null;
          try {
            const sStr = localStorage.getItem(
              `kibcode_game_session_${studentKey}_${g.id}`
            );
            if (sStr) inProgressSession = JSON.parse(sStr);
          } catch {
            // Ignore
          }

          if (localCompleted) {
            return {
              ...g,
              progressPercent: 100,
              recordScore: localCompleted.score || g.recordScore || 100,
            };
          } else if (
            inProgressSession &&
            typeof inProgressSession.currentIndex === "number" &&
            inProgressSession.currentIndex > 0
          ) {
            const totalQuestions = 10;
            return {
              ...g,
              progressPercent: Math.min(
                99,
                Math.round((inProgressSession.currentIndex / totalQuestions) * 100)
              ),
              recordScore: inProgressSession.starsCollected || g.recordScore,
            };
          }
          return g;
        })
      );
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [student?.id]);

  // Poll in background if games aren't ready yet after onboarding
  useEffect(() => {
    if (!student?.id || games.length >= 6 || pollCount >= 15) return;

    const timer = setInterval(async () => {
      try {
        const res = await api.games.getAll(undefined, student.id);
        if (res.games && res.games.length >= 6) {
          await loadGames();
          setIsLoading(false);
        } else if (pollCount >= 14 && res.games && res.games.length > 0) {
          await loadGames();
          setIsLoading(false);
        } else {
          setPollCount((prev) => prev + 1);
        }
      } catch {
        setPollCount((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [student?.id, games.length, pollCount, loadGames]);

  // Handler to generate personalized curriculum games
  const handleGenerateCurriculum = async () => {
    try {
      setIsGeneratingCurriculum(true);
      const res = await api.students.generateCurriculum();
      if (res.games && res.games.length > 0) {
        await loadGames();
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
      starsReward: 50 + newGame.difficulty * 20,
      progressPercent: 0,
      recordScore: 0,
      badgeTag: "Baru Dirancang AI",
    };

    setGames((prev) => [newCatalogItem, ...prev]);
    setSelectedCategory("all");
  };

  // Star mastery calculation across level 1, 2, 3 games
  const starMastery = useMemo(() => {
    const star1Games = games.filter((g) => g.difficulty === 1);
    const star2Games = games.filter((g) => g.difficulty === 2);
    const star3Games = games.filter((g) => g.difficulty === 3);

    return {
      star1: {
        completed: star1Games.filter((g) => g.progressPercent === 100).length,
        total: star1Games.length,
      },
      star2: {
        completed: star2Games.filter((g) => g.progressPercent === 100).length,
        total: star2Games.length,
      },
      star3: {
        completed: star3Games.filter((g) => g.progressPercent === 100).length,
        total: star3Games.length,
      },
    };
  }, [games]);

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
      functions: games.filter((g) => (g.category as any) === "functions").length,
      events: games.filter((g) => (g.category as any) === "events").length,
      game_design: games.filter((g) => (g.category as any) === "game_design").length,
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
        // Natural order
        break;
      case "stars":
        result.sort((a, b) => b.starsReward - a.starsReward);
        break;
      case "difficulty-asc":
        result.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case "difficulty-desc":
        result.sort((a, b) => b.difficulty - a.difficulty);
        break;
      case "uncompleted":
        result.sort((a, b) => {
          if (a.progressPercent === 100 && b.progressPercent < 100) return 1;
          if (a.progressPercent < 100 && b.progressPercent === 100) return -1;
          return a.progressPercent - b.progressPercent;
        });
        break;
      case "completed":
        result.sort((a, b) => {
          if (a.progressPercent === 100 && b.progressPercent < 100) return -1;
          if (a.progressPercent < 100 && b.progressPercent === 100) return 1;
          return b.progressPercent - a.progressPercent;
        });
        break;
    }

    return result;
  }, [games, selectedCategory, selectedSort]);

  const isPreparingGames =
    isLoading ||
    isGeneratingCurriculum ||
    (Boolean(student?.isOnboarded) && games.length < 6 && pollCount < 15);

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-6">
        {/* Catalog Hero Section with Kibo Mascot Mastery Viewer & AI Generator Trigger */}
        <CatalogHero
          totalGames={games.length}
          grade={student?.grade || 3}
          onOpenAIGenerator={() => setIsAIModalOpen(true)}
          starMastery={starMastery}
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
          <AIContentLoading
            title="Robot Kibo sedang menyiapkan game cerdas..."
            description="Kibo sedang menyiapkan game spesial untuk membantumu belajar. Sebentar lagi siap!"
          />
        ) : displayedGames.length === 0 ? (
          <div className="py-16 px-6 bg-white/90 rounded-3xl border-2 border-dashed border-amber-300 text-center flex flex-col items-center max-w-xl mx-auto shadow-sm">
            <Sparkles className="w-10 h-10 text-amber-500 mb-3" />
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
              Game Edukasi Siap Dirancang
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Semua game koding dirancang langsung oleh AI disesuaikan dengan minat dan materi kurikulum koding dasar.
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
                  <span>Kibo Sedang Merancang Game Edukasi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Buat Game Edukasi Personal</span>
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
    <Suspense fallback={<PageLoader />}>
      <GameCatalogContent />
    </Suspense>
  );
}
