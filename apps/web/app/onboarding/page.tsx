"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { OnboardingWizard } from "@/components/onboarding";
import { KiboLogo } from "@/components/ui/KiboLogo";

export default function OnboardingPage() {
  const router = useRouter();
  const { student, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // If student is not logged in, send them to login
      if (!student) {
        router.replace("/login");
        return;
      }

      // If already onboarded, send them to dashboard ("show up one time only")
      if (student.isOnboarded) {
        router.replace("/dashboard");
      }
    }
  }, [student, isLoading, router]);

  if (isLoading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-bounce">
            <KiboLogo size={56} />
          </div>
          <span className="font-heading text-slate-700 font-bold text-sm">
            Menyiapkan petualanganmu...
          </span>
        </div>
      </div>
    );
  }

  // If already onboarded, return loader while redirecting
  if (student.isOnboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-pulse">
            <KiboLogo size={56} />
          </div>
          <span className="font-heading text-slate-700 font-bold text-sm">
            Membuka dashboard belajarmu...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFFBEB] text-[#1E293B] relative overflow-hidden py-8 px-4 sm:px-6">
      {/* Decorative Glows */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/4 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Form Content */}
      <main className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center relative z-10 my-auto">
        <OnboardingWizard />
      </main>
    </div>
  );
}
