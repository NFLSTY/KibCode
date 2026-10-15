"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  LogIn,
  Menu,
  X,
  Star,
  Flame,
  User,
  Sparkles,
} from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { useAuth } from "@/lib/hooks/useAuth";
import { useStudentAvatar } from "@/components/profile";
import { showToast } from "nextjs-toast-notify";

interface DashboardNavbarProps {
  totalStars?: number;
  streakDays?: number;
}

export function DashboardNavbar({
  totalStars = 0,
  streakDays = 1,
}: DashboardNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { student, logout } = useAuth();
  const avatar = useStudentAvatar(student?.id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logout();
    showToast.success("Berhasil keluar. Sampai jumpa lagi! 👋", {
      duration: 3000,
      position: "top-right",
    });
    router.push("/login");
  };

  // Nav links aligned with real application content (no landing page marketing labels)
  const navLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      label: "Modul Belajar",
      href: "/kurikulum",
      isActive: pathname.startsWith("/kurikulum"),
    },
    {
      label: "Game Edukasi",
      href: "/games",
      isActive: pathname.startsWith("/games"),
    },
    {
      label: "Arena Koding",
      href: "/coding",
      isActive: pathname.startsWith("/coding"),
    },
    {
      label: "Tutor AI",
      href: "/ai-tutor",
      isActive: pathname.startsWith("/ai-tutor"),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 px-4 sm:px-8 lg:px-10 pt-4 sm:pt-6">
      <div className="h-16 sm:h-18 max-w-7xl mx-auto relative flex items-center justify-between px-4 sm:px-6 bg-white/95 backdrop-blur-md rounded-full shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100">
        {/* Brand Logo with Kibo SVG & "Coding & AI SD" tag */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group shrink-0">
          <div className="group-hover:scale-105 transition-transform shrink-0 drop-shadow-sm">
            <KiboLogo size={38} />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-blue-600 leading-none">
              Kib<span className="text-amber-500">Code</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Coding &amp; AI SD
            </span>
          </div>
        </Link>

        {/* Center: Perfectly centered navigation links (Desktop, landing hover style, no icons) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-full border border-slate-200 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 lg:px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                link.isActive
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-blue-600 hover:bg-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Only Profile Circle Button (or Login/Register for guest) */}
        <div className="flex items-center gap-2">
          {student ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Circle Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-tr ${avatar.bgGradient} shadow-sm ring-2 ring-white hover:ring-blue-300 transition-all cursor-pointer select-none flex items-center justify-center shrink-0`}
                aria-label="Menu Profil Siswa"
                aria-expanded={dropdownOpen}
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-sm sm:text-base select-none shadow-inner border border-white">
                  {avatar.icon}
                </div>
              </button>

              {/* Profile Dropdown with Full Details */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-64 bg-white rounded-3xl shadow-xl border border-slate-100 p-3 z-50 flex flex-col gap-2">
                  {/* Student Summary in Dropdown */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr ${avatar.bgGradient} shadow-xs shrink-0 flex items-center justify-center`}>
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl select-none shadow-inner border border-white">
                          {avatar.icon}
                        </div>
                      </div>
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="font-heading text-sm font-black text-slate-800 truncate">
                          {student.name}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 truncate">
                          {student.email}
                        </span>
                      </div>
                    </div>

                    {/* Stats Pills in Dropdown */}
                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200/60">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        Kelas {student.grade} SD
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {totalStars}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-rose-500 text-rose-500" />
                        {streakDays}h
                      </span>
                    </div>
                  </div>

                  {/* Profile Page Link */}
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>Profil Saya</span>
                    </div>
                  </Link>

                  <div className="h-px bg-slate-100 my-0.5" />

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-heading text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 px-4 py-2 rounded-full font-heading text-xs sm:text-sm font-bold shadow-[0_3px_0_#D97706] active:translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-amber-950" />
                <span>Daftar Akun</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-white/98 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-3">
          {student ? (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr ${avatar.bgGradient} shadow-xs flex items-center justify-center shrink-0`}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg select-none shadow-inner border border-white">
                    {avatar.icon}
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-heading text-sm font-black text-slate-800">
                    {student.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Siswa Kelas {student.grade} SD
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-heading text-xs font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{totalStars}</span>
              </div>
            </div>
          ) : null}

          {/* Nav Links */}
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl font-heading text-sm font-bold transition-colors ${
                  link.isActive
                    ? "bg-blue-500 text-white shadow-xs"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action / Auth Button on Mobile */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {student ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-heading text-sm font-bold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    <span>Profil Saya</span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-heading text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Akun</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-heading text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-heading text-sm font-bold bg-amber-400 text-amber-950 shadow-[0_3px_0_#D97706] active:translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-4 h-4 fill-amber-950" />
                  <span>Daftar</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
