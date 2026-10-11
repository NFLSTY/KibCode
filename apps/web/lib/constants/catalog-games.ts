import type { GameCategory } from "@edukids/types";

export interface CatalogGameItem {
  id: string;
  title: string;
  category: GameCategory;
  difficulty: number;
  description: string;
  starsReward: number;
  progressPercent: number;
  recordScore: number;
  isLocked?: boolean;
  lockedReason?: string;
  badgeTag?: string;
}

export const DEFAULT_CATALOG_GAMES: CatalogGameItem[] = [
  {
    id: "math-quick-sum",
    title: "Penjumlahan Cepat",
    category: "math",
    difficulty: 1,
    description:
      "Hitung kilat puluhan dan ratusan, kumpulkan bintang emas sebanyak mungkin sebelum waktu habis!",
    starsReward: 50,
    progressPercent: 75,
    recordScore: 92,
  },
  {
    id: "reading-fabel-kancil",
    title: "Petualangan Fabel Kancil",
    category: "reading",
    difficulty: 2,
    description:
      "Baca kisah dongeng seru nusantara dan jawab pertanyaan teka-teki moral cerdik bersama sahabat rimba.",
    starsReward: 60,
    progressPercent: 40,
    recordScore: 180,
  },
  {
    id: "spelling-susun-kata",
    title: "Susun Kata Ceria",
    category: "spelling",
    difficulty: 1,
    description:
      "Bantu si Kibo menyusun huruf acak menjadi kata benda sehari-hari yang tepat sebelum keranjang penuh!",
    starsReward: 45,
    progressPercent: 80,
    recordScore: 110,
  },
  {
    id: "math-perkalian-galaksi",
    title: "Perkalian Juara Galaksi",
    category: "math",
    difficulty: 3,
    description:
      "Luncurkan roket ke luar angkasa dengan memecahkan perkalian tabel 1-10 untuk menaklukkan planet baru!",
    starsReward: 80,
    progressPercent: 25,
    recordScore: 210,
  },
  {
    id: "spelling-kosakata-ajaib",
    title: "Teka-Teki Kosakata Ajaib",
    category: "spelling",
    difficulty: 2,
    description:
      "Temukan sinonim dan antonim kata dalam labirin kata berwaktu untuk membebaskan kristal bahasa kuno.",
    starsReward: 65,
    progressPercent: 50,
    recordScore: 1150,
  },
  {
    id: "reading-raja-hutan",
    title: "Dongeng Sang Raja Hutan",
    category: "reading",
    difficulty: 2,
    description:
      "Dengarkan suara narator dan ikuti teks interaktif untuk melatih pemahaman bacaan dan kuis kecerdikan.",
    starsReward: 70,
    progressPercent: 60,
    recordScore: 140,
  },
  {
    id: "math-pecahan-pizza",
    title: "Pecahan Pizza Pesta",
    category: "math",
    difficulty: 3,
    description:
      "Belajar konsep pecahan 1/2, 1/4, dan 3/8 sambil menyajikan pesanan pesta koki hewan yang lucu.",
    starsReward: 90,
    progressPercent: 0,
    recordScore: 0,
    isLocked: true,
    lockedReason: "Terkunci • Capai Level 4",
    badgeTag: "Level 4",
  },
  {
    id: "spelling-detektif-ejaan",
    title: "Detektif Ejaan Hebat",
    category: "spelling",
    difficulty: 2,
    description:
      "Pecahkan misteri hilangnya huruf vokal di istana kerajaan kata dan dapatkan lencana Detektif Emas!",
    starsReward: 75,
    progressPercent: 0,
    recordScore: 0,
    isLocked: true,
    lockedReason: "Misi Pekan Depan",
    badgeTag: "Segera Hadir",
  },
];
