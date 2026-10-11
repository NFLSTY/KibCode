import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Permainan Edukasi",
  description:
    "Pilih petualangan belajar seru Matematika, Membaca, dan Mengeja untuk siswa SD dengan materi bertingkat dan reward bintang.",
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
