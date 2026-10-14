"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { KiboLogo } from "@/components/ui/KiboLogo";
import {
  ProfileHero,
  ProfileStats,
  ProfileBadges,
  ProfileAccountSettings,
  AvatarPickerModal,
  AVATAR_OPTIONS,
  type AvatarOption,
} from "@/components/profile";
import { useAuth } from "@/lib/hooks/useAuth";
import { api } from "@/lib/api-client";
import { ArrowLeft, Share2 } from "lucide-react";
import { showToast } from "nextjs-toast-notify";

export default function ProfilePage() {
  const router = useRouter();
  const { student, isLoading: authLoading, logout, completeOnboarding } = useAuth();

  // Progress metrics retrieved strictly from database
  const [totalScore, setTotalScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);

  // Avatar state with local persistence
  const [currentAvatar, setCurrentAvatar] = useState<AvatarOption>(AVATAR_OPTIONS[0]!);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !student) {
      router.replace("/login");
    }
  }, [student, authLoading, router]);

  // Load avatar preference
  useEffect(() => {
    if (typeof window === "undefined" || !student) return;
    const avatarKey = `kibcode_avatar_${student.id}`;
    const savedAvatarId = localStorage.getItem(avatarKey);
    if (savedAvatarId) {
      const found = AVATAR_OPTIONS.find((a) => a.id === savedAvatarId);
      if (found) setCurrentAvatar(found);
    }
  }, [student]);

  // Load real progress metrics from database
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!student) return;
      try {
        const summaryRes = await api.progress.getSummary(student.id).catch(() => null);
        if (!isMounted) return;
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
    loadData();
    return () => {
      isMounted = false;
    };
  }, [student]);

  const handleSelectAvatar = (avatar: AvatarOption) => {
    setCurrentAvatar(avatar);
    if (student) {
      localStorage.setItem(`kibcode_avatar_${student.id}`, avatar.id);
    }
    showToast.success(`Karakter ${avatar.name} siap menemanimu bertualang! 🌟`, {
      position: "top-right",
    });
  };

  const handleShareCard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast.success("Tautan kartu profil berhasil disalin ke clipboard! 📋", {
        position: "top-right",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast.success("Berhasil keluar. Sampai jumpa lagi! 👋", {
      position: "top-right",
    });
    router.push("/login");
  };

  const handleUpdateName = async (newName: string) => {
    if (!student) return;
    await completeOnboarding({
      name: newName,
      grade: student.grade,
      schoolName: student.schoolName || "",
      hasCodingExp: student.hasCodingExp || false,
      codingExpLevel: student.codingExpLevel,
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
    });
  };

  const handleUpdateGrade = async (newGrade: number) => {
    if (!student) return;
    await completeOnboarding({
      name: student.name,
      grade: newGrade,
      schoolName: student.schoolName || "",
      hasCodingExp: student.hasCodingExp || false,
      codingExpLevel: student.codingExpLevel,
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
    });
  };

  // Loading state while verifying authentication
  if (authLoading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-bounce">
            <KiboLogo size={56} />
          </div>
          <span className="font-heading text-slate-700 font-bold text-sm">
            Memuat profil petualangmu...
          </span>
        </div>
      </div>
    );
  }

  // Format real join date from database
  const formattedJoinDate = student.createdAt
    ? new Date(student.createdAt).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      })
    : undefined;

  // Level & XP derived directly from total database score
  const XP_PER_LEVEL = 200;
  const level = Math.max(1, Math.floor(totalScore / XP_PER_LEVEL) + 1);
  const currentXp = totalScore % XP_PER_LEVEL;
  const nextLevelXp = XP_PER_LEVEL;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6 sm:gap-8">
        {/* Top Actions: exact "Kembali ke Dashboard" button from placeholder page & Share Button */}
        <div className="flex items-center justify-between gap-3 w-full">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm shadow-[0_4px_0_#1D4ED8] active:translate-y-1 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>

          {/* Quick Action: Bagikan Kartu Profil */}
          <button
            type="button"
            onClick={handleShareCard}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-xs sm:text-sm font-bold shadow-[0_3px_0_#D97706] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan Kartu</span>
          </button>
        </div>

        {/* 1. Hero Card: Profile Canvas (Real Database Data) */}
        <ProfileHero
          studentName={student.name}
          studentGrade={student.grade}
          schoolName={student.schoolName}
          joinDate={formattedJoinDate}
          currentAvatar={currentAvatar}
          onOpenAvatarPicker={() => setIsAvatarPickerOpen(true)}
          level={level}
          currentXp={currentXp}
          nextLevelXp={nextLevelXp}
        />

        {/* 2. Stats Row (Strictly Real Database Metrics) */}
        <ProfileStats
          completedGames={completedCount}
          totalStars={totalScore}
          totalTimeMinutes={totalTimeMinutes}
        />

        {/* 3. Koleksi Lencana & Prestasi (Evaluated from Real Score & Games) */}
        <ProfileBadges
          completedGames={completedCount}
          totalScore={totalScore}
        />

        {/* 4. Pengaturan Akun & Keamanan */}
        <ProfileAccountSettings
          studentName={student.name}
          studentGrade={student.grade}
          schoolName={student.schoolName}
          studentEmail={student.email}
          onLogout={handleLogout}
          onUpdateName={handleUpdateName}
          onUpdateGrade={handleUpdateGrade}
        />
      </main>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={isAvatarPickerOpen}
        selectedAvatarId={currentAvatar.id}
        onSelect={handleSelectAvatar}
        onClose={() => setIsAvatarPickerOpen(false)}
      />

      <Footer />
    </div>
  );
}
