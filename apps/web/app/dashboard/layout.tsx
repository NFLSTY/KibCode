import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dasbor Petualang Siswa",
  description:
    "Pantau pencapaian, koleksi bintang, dan riwayat belajar siswa di EduKids bersama Si Kibo.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
