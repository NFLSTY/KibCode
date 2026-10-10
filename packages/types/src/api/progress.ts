export interface GameProgressDTO {
  id: string;
  studentId: string;
  gameId: string;
  score: number;
  duration: number;
  completed: boolean;
  createdAt: string;
}

export interface SaveProgressDTO {
  studentId: string;
  gameId: string;
  score: number;
  duration: number;
  completed: boolean;
}
