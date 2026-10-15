import type { GameCategory } from "./game.js";

export interface ModuleQuizItem {
  id?: string;
  question: string;
  options: Array<{ id: string; text: string; isCorrect: boolean }>;
  explanation: string;
}

export interface LearningUnitDTO {
  id: string;
  title: string;
  description?: string;
  analogy?: string;
  deepExplanation?: string;
  codePattern?: string;
  codeExplanation?: string;
  tips?: string;
  miniQuiz?: {
    question: string;
    options: Array<{ id: string; text: string; isCorrect: boolean }>;
    explanation: string;
    questions?: ModuleQuizItem[];
  };
  quizQuestions?: ModuleQuizItem[];
}

export interface LearningModuleDTO {
  id: string;
  order?: number;
  category: GameCategory;
  title: string;
  concept: string;
  theme: string;
  world: string;
  difficulty: number;
  starsReward?: number;
  summary: string;
  icon: string;
  badgeColor: string;
  units: LearningUnitDTO[];
}
