import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://edukids.vercel.app"
  ),
  title: {
    default: "EduKids — Belajar Jadi Petualangan Paling Seru!",
    template: "%s | EduKids",
  },
  description:
    "Platform edukasi interaktif untuk siswa SD: Matematika, Mengeja, dan Membaca dengan game seru, kuis berhadiah bintang, dan kurikulum merdeka.",
  keywords: [
    "edukasi anak",
    "game edukasi SD",
    "matematika SD",
    "belajar membaca",
    "mengeja kata",
    "kuis interaktif",
    "kurikulum merdeka",
    "edukids",
  ],
  authors: [{ name: "EduKids Team" }],
  creator: "EduKids",
  publisher: "EduKids",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://edukids.vercel.app",
    siteName: "EduKids",
    title: "EduKids — Belajar Jadi Petualangan Paling Seru!",
    description:
      "Platform belajar interaktif dan ramah anak untuk siswa Sekolah Dasar di Indonesia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduKids — Belajar Jadi Petualangan Paling Seru!",
    description:
      "Platform belajar interaktif dan ramah anak untuk siswa Sekolah Dasar di Indonesia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FFFBEB] text-[#1E293B] antialiased">
        {children}
      </body>
    </html>
  );
}
