"use client";

import React, { useState, useEffect } from "react";
import { KiboCompanion } from "./KiboCompanion";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import type { AuthMode } from "./types";

interface AuthCardProps {
  initialMode?: AuthMode;
}

export function AuthCard({ initialMode = "login" }: AuthCardProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sync mode with initialMode if changed
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Support browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (path === "/register") {
          setMode("register");
        } else if (path === "/login") {
          setMode("login");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSwitchMode = (nextMode: AuthMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);

    if (typeof window !== "undefined") {
      window.history.pushState(
        null,
        "",
        nextMode === "login" ? "/login" : "/register"
      );
    }
  };

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#FFFBEB] flex items-center justify-center p-4">
      {/* Centered Master Card with 3D shadow and stable dimensions */}
      <div className="w-full max-w-4xl min-h-[580px] lg:h-[620px] bg-white rounded-3xl shadow-[0_20px_50px_-10px_rgba(30,41,59,0.08)] border-2 border-slate-100 overflow-hidden relative">
        {/* Stationary Kibo Background Sections (Stay in place, uncovered by the sliding form) */}
        <div className="hidden lg:grid lg:grid-cols-2 absolute inset-0 w-full h-full z-10 pointer-events-none">
          {/* Left Side: Kibo for Login (Uncovered when form is on the right) */}
          <div className="w-full h-full">
            <KiboCompanion mode="login" />
          </div>

          {/* Right Side: Kibo for Register (Uncovered when form is on the left) */}
          <div className="w-full h-full">
            <KiboCompanion mode="register" />
          </div>
        </div>

        {/* Sliding Form Panel (The ONLY moving element: Right on login, Left on register) */}
        <div
          className={`w-full lg:w-1/2 h-full relative lg:absolute top-0 bottom-0 left-0 z-20 bg-white shadow-xl transition-transform duration-700 ease-in-out ${
            isLogin ? "lg:translate-x-full" : "lg:translate-x-0"
          }`}
        >
          <div className="w-full h-full flex flex-col justify-center">
            {isLogin ? (
              <LoginForm
                onSwitchToRegister={() => handleSwitchMode("register")}
              />
            ) : (
              <RegisterForm
                onSwitchToLogin={() => handleSwitchMode("login")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}