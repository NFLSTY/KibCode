import type { PrismaClient } from "@kibcode/database";
import type { SaveProgressDTO, GameProgressDTO } from "@kibcode/types";

export interface StudentSummary {
  studentId: string;
  totalScore: number;
  completedGamesCount: number;
  totalTimeSpentSeconds: number;
}

export class ProgressService {
  constructor(private prisma: PrismaClient) {}

  async save(data: SaveProgressDTO): Promise<GameProgressDTO> {
    const progress = await this.prisma.gameProgress.create({
      data: {
        studentId: data.studentId,
        gameId: data.gameId,
        score: data.score,
        duration: data.duration,
        completed: data.completed,
      },
    });

    return {
      id: progress.id,
      studentId: progress.studentId,
      gameId: progress.gameId,
      score: progress.score,
      duration: progress.duration,
      completed: progress.completed,
      createdAt: progress.createdAt.toISOString(),
    };
  }

  async getByStudent(studentId: string): Promise<GameProgressDTO[]> {
    const progresses = await this.prisma.gameProgress.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    return progresses.map((p) => ({
      id: p.id,
      studentId: p.studentId,
      gameId: p.gameId,
      score: p.score,
      duration: p.duration,
      completed: p.completed,
      createdAt: p.createdAt.toISOString(),
    }));
  }

  async getSummary(studentId: string): Promise<StudentSummary> {
    const progresses = await this.prisma.gameProgress.findMany({
      where: { studentId },
    });

    const totalScore = progresses.reduce((acc, curr) => acc + curr.score, 0);
    const completedGamesCount = progresses.filter((p) => p.completed).length;
    const totalTimeSpentSeconds = progresses.reduce((acc, curr) => acc + curr.duration, 0);

    return {
      studentId,
      totalScore,
      completedGamesCount,
      totalTimeSpentSeconds,
    };
  }
}
