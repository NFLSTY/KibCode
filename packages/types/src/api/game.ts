export type GameCategory = "math" | "spelling" | "reading";

export interface GameDTO {
  id: string;
  title: string;
  category: GameCategory;
  difficulty: number;
  description: string;
}

export interface CreateGameDTO {
  title: string;
  category: GameCategory;
  difficulty: number;
  description: string;
}
