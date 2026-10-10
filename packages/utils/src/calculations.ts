export function calculateAccuracy(correctCount: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

export function calculateStarRating(scorePercentage: number): 1 | 2 | 3 {
  if (scorePercentage >= 90) return 3;
  if (scorePercentage >= 60) return 2;
  return 1;
}
