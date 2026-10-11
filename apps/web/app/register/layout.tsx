import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun Petualang Baru",
  description:
    "Daftar gratis akun siswa EduKids dan dapatkan 500 bintang petualang pertama untuk memulai belajar seru.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
