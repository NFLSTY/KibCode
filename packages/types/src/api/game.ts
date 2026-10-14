export type GameCategory =
  | "logic"
  | "loops"
  | "conditionals"
  | "debugging"
  | "algorithms"
  | "general"
  | "math"
  | "spelling"
  | "reading";

export interface QuizOptionDTO {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestionDTO {
  id: string;
  storyPrompt?: string;
  question: string;
  codeSnippet?: string;
  options: QuizOptionDTO[];
  explanation: string;
}

export interface GameDTO {
  id: string;
  title: string;
  category: GameCategory;
  difficulty: number;
  description: string;
  questions?: QuizQuestionDTO[];
}

export interface CreateGameDTO {
  title: string;
  category: GameCategory;
  difficulty: number;
  description: string;
  questions?: QuizQuestionDTO[];
}

export interface GenerateGameRequestDTO {
  topic: string;
  category?: GameCategory;
  grade?: number;
  difficulty?: number;
}

export interface AskHintRequestDTO {
  question: string;
  storyPrompt?: string;
  codeSnippet?: string;
  grade?: number;
}

export interface AskHintResponseDTO {
  hint: string;
}

export interface ReviewGameRequestDTO {
  gameTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  durationSeconds: number;
  grade?: number;
}

export interface ReviewGameResponseDTO {
  message: string;
  tip: string;
}
