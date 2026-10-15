import type { PrismaClient } from "@kibcode/database";
import type {
  GameDTO,
  CreateGameDTO,
  GameCategory,
  QuizQuestionDTO,
  GenerateGameRequestDTO,
  AskHintRequestDTO,
  AskHintResponseDTO,
  ReviewGameRequestDTO,
  ReviewGameResponseDTO,
} from "@kibcode/types";
import { aiService } from "./aiService.js";

export class GameService {
  constructor(private prisma: PrismaClient) {}

  async getAll(category?: GameCategory, studentId?: string): Promise<GameDTO[]> {
    const whereClause: any = {};
    if (category && category !== ("all" as GameCategory)) {
      whereClause.category = category;
    }
    if (studentId) {
      whereClause.OR = [{ studentId }, { studentId: null }];
    }

    const games = await this.prisma.game.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      orderBy: { difficulty: "asc" },
    });

    return games.map((game) => ({
      id: game.id,
      title: game.title.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim(),
      category: game.category as GameCategory,
      difficulty: game.difficulty,
      description: game.description,
      questions: (game.questions as unknown as QuizQuestionDTO[]) || undefined,
      studentId: game.studentId,
    }));
  }

  async getById(id: string): Promise<GameDTO | null> {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) return null;

    return {
      id: game.id,
      title: game.title.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim(),
      category: game.category as GameCategory,
      difficulty: game.difficulty,
      description: game.description,
      questions: (game.questions as unknown as QuizQuestionDTO[]) || undefined,
      studentId: game.studentId,
    };
  }

  async create(data: CreateGameDTO): Promise<GameDTO> {
    const game = await this.prisma.game.create({
      data: {
        title: data.title,
        category: data.category,
        difficulty: data.difficulty,
        description: data.description,
        questions: data.questions as any,
        studentId: data.studentId || null,
      },
    });

    return {
      id: game.id,
      title: game.title,
      category: game.category as GameCategory,
      difficulty: game.difficulty,
      description: game.description,
      questions: (game.questions as unknown as QuizQuestionDTO[]) || undefined,
      studentId: game.studentId,
    };
  }

  async generateAIGame(params: GenerateGameRequestDTO): Promise<GameDTO> {
    // 1. Call Gemini to create game concept & questions
    const createdData = await aiService.generateCodingGame({
      topic: params.topic,
      category: params.category,
      grade: params.grade,
      difficulty: params.difficulty,
    });

    // 2. Persist directly to Neon DB with student ownership if applicable
    return this.create({
      ...createdData,
      studentId: params.studentId || null,
    });
  }

  async getHint(params: AskHintRequestDTO): Promise<AskHintResponseDTO> {
    return aiService.generateHint(params);
  }

  async getReview(params: ReviewGameRequestDTO): Promise<ReviewGameResponseDTO> {
    return aiService.generateReview(params);
  }
}
