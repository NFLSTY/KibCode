import React from "react";
import Link from "next/link";
import { GraduationCap, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-100 border-t border-slate-200/80 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-blue-600">
                Edu<span className="text-amber-500">Kids</span>
              </span>
            </Link>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-sm font-medium">
              Platform petualangan belajar interaktif dan menyenangkan untuk
              siswa Sekolah Dasar di seluruh Indonesia.
            </p>
          </div>

          {/* Column 2: Eksplorasi */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-slate-800 text-base">
              Eksplorasi
            </h4>
            <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-600">
              <Link
                href="/games"
                className="hover:text-blue-600 transition-colors"
              >
                Katalog Permainan
              </Link>
              <Link
                href="/games?category=math"
                className="hover:text-blue-600 transition-colors"
              >
                Matematika Ceria
              </Link>
              <Link
                href="/games?category=reading"
                className="hover:text-blue-600 transition-colors"
              >
                Dunia Dongeng
              </Link>
              <Link
                href="/games?category=spelling"
                className="hover:text-blue-600 transition-colors"
              >
                Lab Mengeja Kata
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-blue-600 transition-colors"
              >
                Misi &amp; Bintang
              </Link>
            </div>
          </div>

          {/* Column 3: Ramah Anak & Kurikulum */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-slate-800 text-base">
              Keamanan &amp; Edukasi
            </h4>
            <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                100% Bebas Iklan
              </span>
              <span>Sesuai Kurikulum Merdeka</span>
              <span>Privasi Siswa Terlindungi</span>
              <span className="text-xs text-slate-500 mt-2">
                Dibuat untuk M-ONE Telkomsel Coding Competition
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} EduKids. Belajar Ceria, Tumbuh Hebat!</p>
          <p className="flex items-center gap-1 text-slate-600">
            Dibuat dengan <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" /> untuk anak Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
