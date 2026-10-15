import type { GameCategory } from "@kibcode/types";

export interface CatalogGameItem {
  id: string;
  title: string;
  category: GameCategory;
  difficulty: number;
  description: string;
  starsReward: number;
  progressPercent: number;
  recordScore: number;
  isLocked?: boolean;
  lockedReason?: string;
  badgeTag?: string;
}

export const DEFAULT_CATALOG_GAMES: CatalogGameItem[] = [];
