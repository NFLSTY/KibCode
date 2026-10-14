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
import { MissionBanner } from "@/components/catalog/MissionBanner";
import {
  DEFAULT_CATALOG_GAMES,
  type CatalogGameItem,
} from "@/lib/constants/catalog-games";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import type { GameCategory } from "@kibcode/types";
import { Loader2 } from "lucide-react";

function GameCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as FilterCategory | null;

  const { student } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(
    categoryParam && ["math", "spelling", "reading"].includes(categoryParam)
      ? categoryParam
      : "all"
  );
  const [selectedSort, setSelectedSort] = useState<SortOption>("popular");
  const [games, setGames] = useState<CatalogGameItem[]>(DEFAULT_CATALOG_GAMES);
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize category param if updated from URL
  useEffect(() => {
    if (
      categoryParam &&
      ["math", "spelling", "reading", "all"].includes(categoryParam)
    ) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Attempt to fetch games from API; augment or fallback to default games
  useEffect(() => {
    let isMounted = true;

    async function loadGames() {
      try {
        setIsLoading(true);
        const res = await api.games.getAll();
        if (isMounted && res.games && res.games.length > 0) {
          // Merge API games with default display items
          const merged: CatalogGameItem[] = res.games.map((g, idx) => {
            const fallback =
              DEFAULT_CATALOG_GAMES.find((df) => df.id === g.id) ||
              DEFAULT_CATALOG_GAMES[idx % DEFAULT_CATALOG_GAMES.length];

            return {
              id: g.id,
              title: g.title,
              category: g.category,
              difficulty: g.difficulty,
              description: g.description,
              starsReward: fallback ? fallback.starsReward : 50,
              progressPercent: fallback ? fallback.progressPercent : 0,
              recordScore: fallback ? fallback.recordScore : 0,
              isLocked: fallback?.isLocked,
              lockedReason: fallback?.lockedReason,
              badgeTag: fallback?.badgeTag,
            };
          });

          // Also keep locked showcase games if not in API
          const lockedGames = DEFAULT_CATALOG_GAMES.filter((g) => g.isLocked);
          const finalGames = [
            ...merged,
            ...lockedGames.filter((lg) => !merged.some((m) => m.id === lg.id)),
          ];

          setGames(finalGames);
        }
      } catch (err) {
        // Silently preserve DEFAULT_CATALOG_GAMES on network/offline fallback
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadGames();

    return () => {
      isMounted = false;
    };
  }, []);

  // Category counts
  const counts = useMemo(() => {
    return {
      all: games.length,
      math: games.filter((g) => g.category === "math").length,
      spelling: games.filter((g) => g.category === "spelling").length,
      reading: games.filter((g) => g.category === "reading").length,
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-6">
        {/* Catalog Hero Section */}
        <CatalogHero totalGames={games.length} grade={student?.grade || 3} />

        {/* Filter and Sorting Tabs */}
        <CatalogFilters
          currentCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={counts}
          currentSort={selectedSort}
          onSelectSort={setSelectedSort}
          grade={student?.grade || 3}
        />

        {/* Loading Spinner or Games Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="font-heading font-bold text-sm">
              Menyiapkan arena permainan...
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </section>
        )}

        {/* Bottom Mission / Motivation Banner */}
        <MissionBanner />
      </main>

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
            <span>Memuat Katalog Permainan...</span>
          </div>
        </div>
      }
    >
      <GameCatalogContent />
    </Suspense>
  );
}
