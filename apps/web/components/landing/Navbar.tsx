"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { KiboLogo } from "@/components/ui/KiboLogo";

export function Navbar() {
  const { student } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#beranda");

  const isClickingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Coba Coding", href: "#demo" },
    { label: "Kurikulum", href: "#kurikulum" },
    { label: "Tutor AI Kibo", href: "#ai-tutor" },
    { label: "Keunggulan", href: "#fitur" },
    { label: "Daftar", href: "#cta" },
  ];

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);
  };

  // Track active section on scroll with viewport rects
  useEffect(() => {
    const sectionIds = ["beranda", "demo", "kurikulum", "ai-tutor", "fitur", "cta"];

    const handleScroll = () => {
      if (isClickingRef.current) return;

      // If near top of page, activate #beranda
      if (window.scrollY < 80) {
        setActiveSection("#beranda");
        return;
      }

      // If near bottom of the document, activate the last section (#cta)
      const scrollBottom = window.innerHeight + window.scrollY;
      if (scrollBottom >= document.documentElement.scrollHeight - 150) {
        setActiveSection("#cta");
        return;
      }

      // Check sections from bottom to top using bounding client rect
      const reversedIds = [...sectionIds].reverse();
      for (const id of reversedIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const threshold = id === "cta" ? window.innerHeight * 0.65 : 200;
          if (rect.top <= threshold && rect.bottom > 80) {
            setActiveSection(`#${id}`);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 px-5 sm:px-8 lg:px-10 pt-4 sm:pt-6">
      <div className="h-16 sm:h-18 max-w-7xl mx-auto flex items-center justify-between px-5 bg-white/95 backdrop-blur-md rounded-full shadow-[0_10px_24px_-4px_rgba(30,41,59,0.08)] border border-slate-100">
        {/* Brand Logo with Kibo SVG */}
        <a href="#beranda" className="flex items-center gap-2.5 group">
          <div className="group-hover:scale-105 transition-transform shrink-0 drop-shadow-sm">
            <KiboLogo size={40} />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold tracking-tight text-blue-600 leading-none">
              Kib<span className="text-amber-500">Code</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Coding &amp; AI SD
            </span>
          </div>
        </a>

        {/* Anchor Navigation Links (Desktop) with Active State */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-full border border-slate-200">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all duration-200 ${isActive
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-slate-600 hover:text-blue-600 hover:bg-white/80"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action / Auth Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={student ? "/dashboard" : "/login"}
            className="hidden md:inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 px-4 sm:px-5 py-2 rounded-full font-bold text-sm shadow-[0_3px_0_#D97706] active:translate-y-0.5 transition-all"
          >
            <Rocket className="w-4 h-4 fill-amber-950" />
            <span>Mulai Belajar</span>
          </Link>

          {/* Mobile Menu Button */}
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
        <div className="md:hidden mt-2 p-4 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  handleNavClick(link.href);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-base transition-colors ${isActive
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href={student ? "/dashboard" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold bg-amber-400 text-amber-950 shadow-[0_3px_0_#D97706] active:translate-y-0.5 transition-all"
            >
              <Rocket className="w-4 h-4 fill-amber-950" />
              <span>Mulai Belajar</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
