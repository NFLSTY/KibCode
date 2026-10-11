"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Star, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export function Navbar() {
  const { student } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3">
      <div className="h-18 max-w-7xl mx-auto flex items-center justify-between px-5 bg-white/95 backdrop-blur-md rounded-full shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-[0_3px_0_#1D4ED8]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-blue-600">
            Edu<span className="text-amber-500">Kids</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-full border border-slate-200">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full font-bold text-sm bg-blue-500 text-white shadow-sm transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/games"
            className="px-4 py-1.5 rounded-full font-bold text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Kategori Belajar
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-1.5 rounded-full font-bold text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Misi &amp; Poin
          </Link>
        </nav>

        {/* Action / Auth Button */}
        <div className="flex items-center gap-3">
          {student ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-sm border border-blue-200 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="truncate max-w-[120px]">{student.name}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 rounded-full font-bold text-sm text-slate-700 hover:text-blue-600 transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 px-5 py-2 rounded-full font-bold text-sm shadow-[0_3px_0_#D97706] active:translate-y-0.5 transition-all"
              >
                <Star className="w-4 h-4 fill-amber-950" />
                <span>Mulai Gratis</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
