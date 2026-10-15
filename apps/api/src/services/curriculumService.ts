import type { PrismaClient } from "@kibcode/database";
import type { GameDTO, GameCategory } from "@kibcode/types";
import {
  buildBalancedPromptContext,
  type StudentCurriculumProfile,
  type CurriculumCategory,
} from "@kibcode/utils";
import { aiService } from "./aiService.js";

export class CurriculumService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Generates a tailored 5-track coding game curriculum for a student
   * Starts immediately after onboarding becomes true.
   * Balances 50% Fundamental Coding with 50% Student Personal Preference.
   */
  async generateGamesTrackForStudent(studentId: string): Promise<GameDTO[]> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const profile: StudentCurriculumProfile = {
      grade: student.grade,
      schoolName: student.schoolName,
      hasCodingExp: student.hasCodingExp,
      codingExpLevel: student.codingExpLevel,
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
    };

    // The 6 core coding pillars for children
    const categories: Array<"logic" | "loops" | "conditionals" | "variables" | "debugging" | "algorithms"> = [
      "logic",
      "loops",
      "conditionals",
      "variables",
      "debugging",
      "algorithms",
    ];

    const generatedGames: GameDTO[] = [];

    // Check if the student already has generated games to avoid duplicating tracks
    const existingGames = await this.prisma.game.findMany({
      where: { studentId },
      orderBy: { difficulty: "asc" },
    });

    if (existingGames.length >= categories.length) {
      return existingGames.map((g) => ({
        id: g.id,
        title: g.title,
        category: g.category as GameCategory,
        difficulty: g.difficulty,
        description: g.description,
        questions: (g.questions as any) || undefined,
        studentId: g.studentId,
      }));
    }

    // Determine missing categories so we only generate what's needed
    const existingCategories = new Set(existingGames.map((g) => g.category));
    const categoriesToGenerate = categories.filter((c) => !existingCategories.has(c));

    for (const category of categoriesToGenerate) {
      const balancedContext = buildBalancedPromptContext(profile, "games", category);

      // Generate the game via Gemini with the 50:50 prompt context
      const gameData = await aiService.generateCodingGame({
        topic: balancedContext.topicName,
        category,
        grade: profile.grade,
        difficulty: balancedContext.pedagogy.suggestedDifficulty,
      });

      // Persist directly to Neon DB tied to this student
      const savedGame = await this.prisma.game.create({
        data: {
          title: gameData.title,
          category: gameData.category,
          difficulty: gameData.difficulty,
          description: gameData.description,
          questions: gameData.questions as any,
          studentId: student.id,
        },
      });

      generatedGames.push({
        id: savedGame.id,
        title: savedGame.title,
        category: savedGame.category as GameCategory,
        difficulty: savedGame.difficulty,
        description: savedGame.description,
        questions: (savedGame.questions as any) || undefined,
        studentId: savedGame.studentId,
      });
    }

    // Return all games for this student (existing + newly generated)
    const allGames = await this.prisma.game.findMany({
      where: { studentId },
      orderBy: { difficulty: "asc" },
    });

    return allGames.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category as GameCategory,
      difficulty: g.difficulty,
      description: g.description,
      questions: (g.questions as any) || undefined,
      studentId: g.studentId,
    }));
  }

  /**
   * Extensible Global Content Engine: Returns rich AI-generated learning modules for "Modul Belajar".
   * Caches results in the LearningModule DB table per student+category.
   * On first visit: generates all 6 via Gemini. On subsequent visits: returns from DB instantly.
   */
  async generateLearningModulesForStudent(studentId: string): Promise<any[]> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const profile: StudentCurriculumProfile = {
      grade: student.grade,
      schoolName: student.schoolName,
      hasCodingExp: student.hasCodingExp,
      codingExpLevel: student.codingExpLevel,
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
    };

    const targetCategories: CurriculumCategory[] = [
      "logic",
      "loops",
      "conditionals",
      "variables",
      "debugging",
      "algorithms",
    ];

    const categoryMeta: Record<CurriculumCategory, { icon: string; badgeColor: string }> = {
      logic: { icon: "🧩", badgeColor: "blue" },
      loops: { icon: "🔄", badgeColor: "amber" },
      conditionals: { icon: "⚡", badgeColor: "purple" },
      variables: { icon: "📦", badgeColor: "teal" },
      debugging: { icon: "🐛", badgeColor: "rose" },
      algorithms: { icon: "🧭", badgeColor: "emerald" },
    };

    // Fetch any already-cached modules for this student
    const cachedModules = await (this.prisma as any).learningModule.findMany({
      where: { studentId },
      orderBy: { createdAt: "asc" },
    });

    const cachedByCategory = new Map<string, any>(
      cachedModules.map((m: any) => [m.category, m.data])
    );

    const resultModules: any[] = [];

    for (const category of targetCategories) {
      const meta = categoryMeta[category] || { icon: "🧩", badgeColor: "blue" };
      const balanced = buildBalancedPromptContext(profile, "modules", category);

      // Use cached version if available
      if (cachedByCategory.has(category)) {
        const cached = cachedByCategory.get(category);
        resultModules.push({
          id: `module-${category}`,
          category,
          icon: meta.icon,
          badgeColor: meta.badgeColor,
          difficulty: balanced.pedagogy.suggestedDifficulty,
          theme: balanced.interest.themeContext,
          world: balanced.interest.worldName,
          ...cached,
        });
        continue;
      }

      // Generate via AI
      let aiResult: any;
      try {
        aiResult = await aiService.generateLearningModule({
          category,
          grade: profile.grade,
          interest: profile.favoriteInterest || "games",
          topicName: balanced.fundamental.name,
          worldName: balanced.interest.worldName,
          fundamentalConcept: balanced.fundamental.fundamentalConcept,
          sampleCodePattern: balanced.fundamental.sampleCodePattern,
        });
      } catch {
        // Static fallback if AI fails entirely
        aiResult = {
          title: `Petualangan ${balanced.fundamental.name}`,
          concept: balanced.fundamental.fundamentalConcept,
          summary: `Pelajari konsep ${balanced.fundamental.fundamentalConcept} bersama Robot Kibo di dunia ${balanced.interest.worldName}.`,
          units: [],
        };
      }

      // Persist to DB for instant subsequent loads
      await (this.prisma as any).learningModule.create({
        data: {
          studentId,
          category,
          data: aiResult,
        },
      });

      resultModules.push({
        id: `module-${category}`,
        category,
        icon: meta.icon,
        badgeColor: meta.badgeColor,
        difficulty: balanced.pedagogy.suggestedDifficulty,
        theme: balanced.interest.themeContext,
        world: balanced.interest.worldName,
        ...aiResult,
      });
    }

    return resultModules;
  }
}
