import type { GameCategory } from "./game.js";

export interface LearningUnitDTO {
  id: string;
  title: string;
  description: string;
  analogy: string;
  codePattern: string;
  miniQuiz: {
    question: string;
    options: Array<{ id: string; text: string; isCorrect: boolean }>;
    explanation: string;
  };
}

export interface LearningModuleDTO {
  id: string;
  category: GameCategory;
  title: string;
  concept: string;
  theme: string;
  world: string;
  difficulty: number;
  summary: string;
  icon: string;
  badgeColor: string;
  units: LearningUnitDTO[];
}
