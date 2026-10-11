import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk Akun Siswa",
  description:
    "Masuk ke akun EduKids untuk melanjutkan petualangan belajar dan menyimpan bintang prestasimu.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
