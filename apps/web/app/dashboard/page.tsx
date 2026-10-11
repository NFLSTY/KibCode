"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { MilestoneOverview } from "@/components/dashboard/MilestoneOverview";
import { RecentLessons } from "@/components/dashboard/RecentLessons";
import { AchievementBadges } from "@/components/dashboard/AchievementBadges";
import { useAuth } from "@/lib/hooks/useAuth";
import { api } from "@/lib/api-client";
import type { GameProgressDTO } from "@edukids/types";
import { LogIn, Sparkles } from "lucide-react";

export default function StudentDashboardPage() {
  const { student, isLoading: authLoading } = useAuth();

  const [progressList, setProgressList] = useState<GameProgressDTO[]>([]);
  const [totalScore, setTotalScore] = useState(450);
  const [completedCount, setCompletedCount] = useState(15);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(150);

  // Fetch student progress metrics if authenticated
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

        if (progressRes && progressRes.progress) {
          setProgressList(progressRes.progress);
        }

        if (summaryRes && summaryRes.summary) {
          setTotalScore(summaryRes.summary.totalScore || 450);
          setCompletedCount(summaryRes.summary.completedGamesCount || 15);
          setTotalTimeMinutes(
            Math.round((summaryRes.summary.totalTimeSpentSeconds || 9000) / 60)
          );
        }
      } catch (err) {
        // Fallback to demo metrics
      }
    }

    loadStudentData();

    return () => {
      isMounted = false;
    };
  }, [student]);

  const studentName = student ? student.name : "Budi";
  const studentGrade = student ? student.grade : 3;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 flex flex-col gap-8">
        {/* Guest Reassurance Banner */}
        {!student && !authLoading && (
          <div className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-950 px-5 py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-amber-300 shadow-sm text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
              <p className="text-xs sm:text-sm font-bold">
                Kamu sedang melihat mode demo. Masuk atau daftar agar skormu
                tercatat otomatis di profil!
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-heading text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-sm active:translate-y-0.5 transition-all shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Akun</span>
            </Link>
          </div>
        )}

        {/* Section 1: Hero Greeting & Badges */}
        <DashboardGreeting
          name={studentName}
          grade={studentGrade}
          streakDays={4}
          totalStars={totalScore}
        />

        {/* Section 2: Weekly Target & Stats Overview */}
        <MilestoneOverview
          completedMissions={completedCount}
          targetMissions={20}
          totalTimeMinutes={totalTimeMinutes}
          accuracyPercent={92}
          totalQuestionsAnswered={completedCount * 5}
        />

        {/* Section 3: Recent Lessons */}
        <RecentLessons progressList={progressList} />

        {/* Section 4: Collectible Badges */}
        <AchievementBadges />
      </main>

      <Footer />
    </div>
  );
}
