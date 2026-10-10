import type { PrismaClient } from "@edukids/database";
import type { GameDTO, CreateGameDTO, GameCategory } from "@edukids/types";

export class GameService {
  constructor(private prisma: PrismaClient) {}

  async getAll(category?: GameCategory): Promise<GameDTO[]> {
    const games = await this.prisma.game.findMany({
      where: category ? { category } : undefined,
      orderBy: { difficulty: "asc" },
    });

    return games.map((game) => ({
      id: game.id,
      title: game.title,
      category: game.category as GameCategory,
      difficulty: game.difficulty,
      description: game.description,
    }));
  }

  async getById(id: string): Promise<GameDTO | null> {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) return null;

    return {
      id: game.id,
      title: game.title,
      category: game.category as GameCategory,
      difficulty: game.difficulty,
      description: game.description,
    };
  }

  async create(data: CreateGameDTO): Promise<GameDTO> {
    const game = await this.prisma.game.create({
      data: {
        title: data.title,
        category: data.category,
        difficulty: data.difficulty,
        description: data.description,
      },
    });

    return {
      id: game.id,
      title: game.title,
      category: game.category as GameCategory,
      difficulty: game.difficulty,
      description: game.description,
    };
  }
}
