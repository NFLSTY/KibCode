import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KibCode — Petualangan Belajar Anak SD",
    short_name: "KibCode",
    description: "Platform edukasi interaktif untuk siswa SD di Indonesia",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFBEB",
    theme_color: "#3B82F6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
