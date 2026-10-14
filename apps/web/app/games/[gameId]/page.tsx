"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { KiboMascot } from "@/components/quiz/KiboMascot";
import { QuestionBoard } from "@/components/quiz/QuestionBoard";
import { AnswerGrid } from "@/components/quiz/AnswerGrid";
import { FeedbackBanner } from "@/components/quiz/FeedbackBanner";
import { QuizCompletedModal } from "@/components/quiz/QuizCompletedModal";
import { DEFAULT_CATALOG_GAMES } from "@/lib/constants/catalog-games";
import { getQuestionsForGame, type QuizQuestion } from "@/lib/constants/quiz-questions";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import type { GameCategory } from "@kibcode/types";
import { HeartHandshake, Smile } from "lucide-react";

interface GameArenaProps {
  params: Promise<{ gameId: string }>;
}

export default function GameArenaPage({ params }: GameArenaProps) {
  const resolvedParams = use(params);
  const gameId = resolvedParams.gameId;
  const router = useRouter();
  const { student } = useAuth();

  // Find game info or use default
  const defaultGame = DEFAULT_CATALOG_GAMES.find((g) => g.id === gameId);
  const [gameTitle, setGameTitle] = useState(defaultGame ? defaultGame.title : "Petualangan Pintar");
  const [category, setCategory] = useState<GameCategory>(defaultGame ? defaultGame.category : "math");

  // Questions
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    getQuestionsForGame(gameId, defaultGame?.category || "math")
  );

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [starsCollected, setStarsCollected] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [durationSeconds, setDurationSeconds] = useState(0);

  // Fetch API game details if available
  useEffect(() => {
    let isMounted = true;
    async function fetchGame() {
      try {
        const res = await api.games.getById(gameId);
        if (isMounted && res.game) {
          setGameTitle(res.game.title);
          setCategory(res.game.category);
          setQuestions(getQuestionsForGame(gameId, res.game.category));
        }
      } catch (err) {
        // Fallback already provided
      }
    }

    fetchGame();

    return () => {
      isMounted = false;
    };
  }, [gameId]);

  const currentQuestion = questions[currentIndex] ?? questions[0];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
        <p className="font-heading font-bold text-slate-600">
          Menyiapkan arena permainan...
        </p>
      </div>
    );
  }

  const isLastQuestion = currentIndex >= questions.length - 1;

  // Handle selecting an answer
  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    setSelectedOptionId(optionId);
    setIsCurrentCorrect(isCorrect);

    if (isCorrect) {
      setStreak((prev) => prev + 1);
      setStarsCollected((prev) => prev + 50);
      setCorrectCount((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  // Handle next question or finishing quiz
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const elapsed = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      setDurationSeconds(elapsed);
      setIsCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsCurrentCorrect(null);
    }
  };

  // Handle restarting quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsCurrentCorrect(null);
    setStreak(0);
    setStarsCollected(0);
    setCorrectCount(0);
    setIsCompleted(false);
  };

  const mascotMood =
    selectedOptionId === null
      ? "idle"
      : isCurrentCorrect
      ? "happy"
      : "thinking";

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col">
        {/* Top HUD */}
        <QuizHeader
          gameTitle={gameTitle}
          category={category}
          grade={student?.grade || 3}
          streak={streak}
          starsCollected={starsCollected}
          onExit={() => router.push("/games")}
        />

        {/* Progress Bar */}
        <QuizProgress
          currentIndex={currentIndex}
          totalQuestions={questions.length}
        />

        {/* Quiz Arena Card Container */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 shadow-[0_12px_32px_-6px_rgba(30,41,59,0.08)] border-2 border-slate-100 overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

          {/* Question Area Header with Kibo Mascot */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <KiboMascot mood={mascotMood} />
            <QuestionBoard question={currentQuestion} />
          </div>

          {/* Answer Choices */}
          <AnswerGrid
            question={currentQuestion}
            selectedOptionId={selectedOptionId}
            onSelectOption={handleSelectOption}
          />

          {/* Feedback Banner (Revealed after answering) */}
          {selectedOptionId !== null && isCurrentCorrect !== null && (
            <FeedbackBanner
              isCorrect={isCurrentCorrect}
              isLastQuestion={isLastQuestion}
              explanation={currentQuestion.explanation}
              onNext={handleNextQuestion}
            />
          )}
        </div>

        {/* Encouraging Footer Note */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-amber-500" />
            <span>Santai saja, belajar bersama KibCode itu menyenangkan!</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="hidden md:flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-blue-500" />
            <span>Butuh istirahat? Tekan tombol Keluar Kuis kapan pun.</span>
          </div>
        </div>
      </main>

      {/* Completion Modal */}
      {isCompleted && (
        <QuizCompletedModal
          gameId={gameId}
          gameTitle={gameTitle}
          totalQuestions={questions.length}
          correctAnswers={correctCount}
          starsCollected={starsCollected}
          durationSeconds={durationSeconds}
          onRestart={handleRestart}
        />
      )}

      <Footer />
    </div>
  );
}
