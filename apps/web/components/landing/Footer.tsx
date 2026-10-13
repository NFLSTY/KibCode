import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { KiboLogo } from "@/components/ui/KiboLogo";

export function Footer() {
  return (
    <footer className="w-full bg-slate-100 border-t border-slate-200/80 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <a href="#beranda" className="flex items-center gap-2.5 group">
              <div className="shrink-0 drop-shadow-sm group-hover:scale-105 transition-transform">
                <KiboLogo size={36} />
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

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-sm font-medium">
              Platform petualangan belajar koding dan kecerdasan buatan (AI) interaktif
              yang menyenangkan untuk siswa Sekolah Dasar di seluruh Indonesia.
            </p>
          </div>

          {/* Column 2: Navigasi Halaman */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-slate-800 text-base">
              Navigasi Halaman
            </h4>
            <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-600">
              <a href="#demo" className="hover:text-blue-600 transition-colors">
                Coba Teka-Teki Kode
              </a>
              <a href="#kurikulum" className="hover:text-blue-600 transition-colors">
                Kurikulum 3 Tingkat
              </a>
              <a href="#ai-tutor" className="hover:text-blue-600 transition-colors">
                Sahabat AI Kibo
              </a>
              <a href="#fitur" className="hover:text-blue-600 transition-colors">
                Keunggulan Platform
              </a>
              <Link href="/register" className="hover:text-blue-600 font-bold text-amber-600 transition-colors">
                Daftar Akun Baru
              </Link>
            </div>
          </div>

          {/* Column 3: Keamanan & Kompetisi */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-slate-800 text-base">
              Keamanan &amp; Edukasi
            </h4>
            <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                100% Bebas Iklan
              </span>
              <span>Ramah Anak SD (Usia 7-12)</span>
              <span>Privasi Siswa Terlindungi</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} KibCode. Belajar Ceria, Tumbuh Hebat!</p>
          <p className="flex items-center gap-1 text-slate-600">
            Dibuat dengan <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" /> untuk anak Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
