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
    process.env.NEXT_PUBLIC_APP_URL || "https://kibcode.my.id"
  ),
  title: {
    default: "KibCode — Petualangan Coding & AI untuk Anak SD",
    template: "%s | KibCode",
  },
  description:
    "Platform edukasi coding dan kecerdasan buatan (AI) interaktif untuk siswa SD: pelajari logika algoritma, visual block coding, dan problem solving bersama Kibo!",
  keywords: [
    "coding anak",
    "coding for kids",
    "belajar coding anak SD",
    "edukasi AI anak",
    "visual block coding",
    "kibo robot AI",
    "algoritma anak SD",
    "KibCode",
  ],
  authors: [{ name: "KibCode Team" }],
  creator: "KibCode",
  publisher: "KibCode",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kibcode.my.id",
    siteName: "KibCode",
    title: "KibCode — Petualangan Coding & AI untuk Anak SD",
    description:
      "Platform belajar coding dan AI interaktif dan ramah anak untuk siswa Sekolah Dasar di Indonesia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KibCode — Petualangan Coding & AI untuk Anak SD",
    description:
      "Platform belajar coding dan AI interaktif dan ramah anak untuk siswa Sekolah Dasar di Indonesia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} ${nunito.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#FFFBEB] text-[#1E293B] antialiased">
        {children}
      </body>
    </html>
  );
}
