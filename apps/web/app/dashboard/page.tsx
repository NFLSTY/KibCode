"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { MilestoneOverview } from "@/components/dashboard/MilestoneOverview";
import { DailyMissionsSection } from "@/components/dashboard/DailyMissionsSection";
import { RecentLessons } from "@/components/dashboard/RecentLessons";
import { AITutorBanner } from "@/components/dashboard/AITutorBanner";
import { AchievementBadges } from "@/components/dashboard/AchievementBadges";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { useAuth } from "@/lib/hooks/useAuth";
import { api } from "@/lib/api-client";
import type { GameProgressDTO } from "@kibcode/types";

export default function StudentDashboardPage() {
  const router = useRouter();
  const { student, isLoading: authLoading } = useAuth();

  // Progress states initialized to real database defaults (0)
  const [progressList, setProgressList] = useState<GameProgressDTO[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !student) {
      router.replace("/login");
    }
  }, [student, authLoading, router]);

  // If user is authenticated but hasn't completed onboarding, redirect to /onboarding
  useEffect(() => {
    if (!authLoading && student && student.isOnboarded === false) {
      router.replace("/onboarding");
    }
  }, [student, authLoading, router]);

  // Fetch real student progress metrics from database
  useEffect(() => {
    let isMounted = true;

    async function loadStudentData() {
      if (!student) return;

      try {
        const [progressRes, summaryRes] = await Promise.all([
          api.progress.getByStudent(student.id).catch(() => null),
          api.progress.getSummary(student.id).catch(() => null),
        ]);

        if (!isMounted) return;

        if (progressRes?.progress) {
          setProgressList(progressRes.progress);
        }

        if (summaryRes?.summary) {
          setTotalScore(summaryRes.summary.totalScore ?? 0);
          setCompletedCount(summaryRes.summary.completedGamesCount ?? 0);
          setTotalTimeMinutes(
            Math.round((summaryRes.summary.totalTimeSpentSeconds ?? 0) / 60)
          );
        }
      } catch {
        // Leave at database defaults
      }
    }

    loadStudentData();

    return () => {
      isMounted = false;
    };
  }, [student]);

  // Loading state while verifying authentication
  if (authLoading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-bounce">
            <KiboLogo size={56} />
          </div>
          <span className="font-heading text-slate-700 font-bold text-sm">
            Menyiapkan petualangan belajarmu...
          </span>
        </div>
      </div>
    );
  }

  const streakDays = completedCount > 0 ? 1 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar totalStars={totalScore} streakDays={streakDays} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-8">
        {/* Section 1: Hero Greeting & Badges */}
        <DashboardGreeting
          name={student.name}
          grade={student.grade}
          streakDays={streakDays}
          totalStars={totalScore}
          studentId={student.id}
        />

        {/* Section 2: Weekly Target & Stats Overview */}
        <MilestoneOverview
          completedMissions={completedCount}
          targetMissions={5}
          totalTimeMinutes={totalTimeMinutes}
          totalScore={totalScore}
        />

        {/* Section 3: Misi Harian & Lanjutkan Game Terakhir */}
        <DailyMissionsSection
          progressList={progressList}
          grade={student.grade}
          totalScore={totalScore}
        />

        {/* Section 4: Riwayat Pelajaran Terakhir (Real Database Records) */}
        <RecentLessons progressList={progressList} />

        {/* Section 5: Kibo AI Tutor Spotlight Banner */}
        <AITutorBanner />

        {/* Section 6: Collectible Achievement Badges */}
        <AchievementBadges
          completedCount={completedCount}
          totalScore={totalScore}
        />
      </main>

      <Footer />
    </div>
  );
}
