"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { OnboardingHeader } from "./OnboardingHeader";
import { StepGrade } from "./StepGrade";
import { StepSchool } from "./StepSchool";
import { StepExperience } from "./StepExperience";
import { StepInterests } from "./StepInterests";
import { StepCongratulationModal } from "./StepCongratulationModal";
import { CTAButton } from "@/components/ui/CTAButton";
import { ChevronLeft, ChevronRight, AlertCircle, Check } from "lucide-react";
import { showToast } from "nextjs-toast-notify";

export function OnboardingWizard() {
  const router = useRouter();
  const { student, completeOnboarding } = useAuth();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form states
  const [grade, setGrade] = useState<number | null>(null);
  const [schoolName, setSchoolName] = useState<string>(student?.schoolName || "");
  const [hasCodingExp, setHasCodingExp] = useState<boolean>(student?.hasCodingExp || false);
  const [codingExpLevel, setCodingExpLevel] = useState<string>(student?.codingExpLevel || "block_coding");
  const [favoriteInterest, setFavoriteInterest] = useState<string>(student?.favoriteInterest || "games");
  const [learningGoal, setLearningGoal] = useState<string>(student?.learningGoal || "game_creator");

  const [showOutroModal, setShowOutroModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically scroll back to top whenever moving between steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleNext = () => {
    setErrorMsg(null);

    // Validation per step
    if (step === 1) {
      if (!grade || grade < 1 || grade > 6) {
        setErrorMsg("Silakan pilih jenjang kelasmu terlebih dahulu.");
        return;
      }
    } else if (step === 2) {
      if (!schoolName.trim() || schoolName.trim().length < 2) {
        setErrorMsg("Silakan tulis nama sekolahmu (minimal 2 huruf).");
        return;
      }
    } else if (step === 3) {
      if (hasCodingExp && !codingExpLevel) {
        setErrorMsg("Silakan pilih seberapa jauh kamu pernah belajar koding.");
        return;
      }
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleFinish = () => {
    setErrorMsg(null);
    if (!favoriteInterest || !learningGoal) {
      setErrorMsg("Silakan tentukan minat dan target belajarmu.");
      return;
    }

    // Scroll back to top, set progress to 100%, and pop up the outro congratulation card
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowOutroModal(true);
  };

  const handleBack = () => {
    setErrorMsg(null);
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg(null);
    if (!grade || grade < 1 || grade > 6) {
      setErrorMsg("Silakan pilih jenjang kelasmu terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    try {
      await completeOnboarding({
        grade,
        schoolName: schoolName.trim(),
        hasCodingExp,
        codingExpLevel: hasCodingExp ? codingExpLevel : null,
        favoriteInterest,
        learningGoal,
      });

      showToast.success("Yayy! Profil petualangmu siap. Selamat belajar di KibCode! 🎉", {
        duration: 3500,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        sound: false,
      });

      router.replace("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan data awal. Silakan coba lagi.";
      setErrorMsg(msg);
      showToast.error(msg, {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        sound: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={`w-full max-w-2xl mx-auto flex flex-col items-center transition-all duration-300 ${
          showOutroModal ? "pointer-events-none select-none opacity-40 blur-[1px]" : ""
        }`}
        aria-hidden={showOutroModal}
      >
        {/* Step Header: reaches 100% when outro modal pops up */}
        <OnboardingHeader
          currentStep={step}
          totalSteps={totalSteps}
          studentName={student?.name}
          isCompleted={showOutroModal || isSubmitting}
        />

        {/* Main Card */}
        <div className="w-full mt-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_30px_-6px_rgba(30,41,59,0.1)] border-2 border-slate-100 flex flex-col justify-between min-h-[440px]">
          {/* Step Body */}
          <div className="flex-1 flex flex-col justify-center">
            {step === 1 && (
              <StepGrade
                selectedGrade={grade}
                onSelectGrade={(g) => {
                  setGrade(g);
                  setErrorMsg(null);
                }}
              />
            )}

            {step === 2 && (
              <StepSchool
                schoolName={schoolName}
                onChangeSchool={(name) => {
                  setSchoolName(name);
                  setErrorMsg(null);
                }}
              />
            )}

            {step === 3 && (
              <StepExperience
                hasCodingExp={hasCodingExp}
                codingExpLevel={codingExpLevel}
                onToggleExperience={(hasExp) => {
                  setHasCodingExp(hasExp);
                  setErrorMsg(null);
                }}
                onSelectLevel={(lvl) => {
                  setCodingExpLevel(lvl);
                  setErrorMsg(null);
                }}
              />
            )}

            {step === 4 && (
              <StepInterests
                favoriteInterest={favoriteInterest}
                learningGoal={learningGoal}
                onSelectInterest={(int) => {
                  setFavoriteInterest(int);
                  setErrorMsg(null);
                }}
                onSelectGoal={(gl) => {
                  setLearningGoal(gl);
                  setErrorMsg(null);
                }}
              />
            )}
          </div>

          {/* Error notification if any */}
          {errorMsg && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Footer Navigation Buttons */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
            {step > 1 ? (
              <CTAButton
                type="button"
                variant="secondary"
                size="default"
                onClick={handleBack}
                disabled={isSubmitting}
                icon={<ChevronLeft className="w-4 h-4" />}
              >
                Kembali
              </CTAButton>
            ) : (
              <div className="invisible">
                <span className="text-xs">Placeholder</span>
              </div>
            )}

            {step < totalSteps ? (
              <CTAButton
                type="button"
                variant="blue"
                size="default"
                onClick={handleNext}
                icon={<ChevronRight className="w-4 h-4" />}
              >
                Lanjut
              </CTAButton>
            ) : (
              <CTAButton
                type="button"
                variant="blue"
                size="default"
                onClick={handleFinish}
                disabled={isSubmitting}
                icon={<Check className="w-4 h-4" />}
              >
                Selesai
              </CTAButton>
            )}
          </div>
        </div>
      </div>

      {/* Congratulation Outro Pop-up Card with Confetti */}
      <StepCongratulationModal
        isOpen={showOutroModal}
        onConfirm={handleSubmit}
        isSubmitting={isSubmitting}
        studentName={student?.name}
        grade={grade}
        schoolName={schoolName}
        hasCodingExp={hasCodingExp}
        codingExpLevel={codingExpLevel}
        favoriteInterest={favoriteInterest}
        learningGoal={learningGoal}
      />
    </>
  );
}
