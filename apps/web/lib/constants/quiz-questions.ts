import type { GameCategory } from "@kibcode/types";

export interface QuizQuestion {
  id: string;
  storyPrompt?: string;
  question: string;
  codeSnippet?: string;
  equationVisual?: {
    num1: string | number;
    operator: string;
    num2: string | number;
    icon?: string;
  };
  options: Array<{
    id: string;
    label: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
}

export const GAME_QUESTIONS_MAP: Record<string, QuizQuestion[]> = {};

export function getQuestionsForGame(gameId: string, category?: GameCategory): QuizQuestion[] {
  return GAME_QUESTIONS_MAP[gameId] || [];
}
