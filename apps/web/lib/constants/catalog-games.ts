import type { GameCategory } from "@kibcode/types";

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
    id: "logic-robot-labirin",
    title: "Petualangan Robot Labirin",
    category: "logic",
    difficulty: 1,
    description:
      "Bantu si Robot Kibo menyusun urutan perintah langkah (Maju, Belok Kanan, Belok Kiri) untuk mengumpulkan bintang di labirin!",
    starsReward: 50,
    progressPercent: 100,
    recordScore: 100,
    badgeTag: "Favorit",
  },
  {
    id: "loops-taman-safari",
    title: "Taman Safari Perulangan",
    category: "loops",
    difficulty: 2,
    description:
      "Hemat baris kodemu menggunakan Perulangan (Loop)! Pelajari cara mengulang perintah tanpa mengetik berkali-kali.",
    starsReward: 60,
    progressPercent: 60,
    recordScore: 80,
    badgeTag: "Tantangan Loop",
  },
  {
    id: "conditionals-sensor-warna",
    title: "Detektif Sensor Warna",
    category: "conditionals",
    difficulty: 2,
    description:
      "Beri kecerdasan pada robot Kibo dengan percabangan Jika-Maka (If-Else) sesuai kondisi yang ditemui di jalan!",
    starsReward: 70,
    progressPercent: 40,
    recordScore: 75,
    badgeTag: "Logika If-Else",
  },
  {
    id: "debugging-pemburu-bug",
    title: "Pemburu Bug Cilik",
    category: "debugging",
    difficulty: 2,
    description:
      "Jadilah detektif koding handal! Temukan kesalahan (bug) pada baris kode dan perbaiki agar robot berjalan lancar.",
    starsReward: 65,
    progressPercent: 0,
    recordScore: 0,
    badgeTag: "Asah Ketelitian",
  },
  {
    id: "algorithms-kotak-variabel",
    title: "Kotak Variabel Ajaib",
    category: "algorithms",
    difficulty: 3,
    description:
      "Pahami konsep Variabel sebagai kotak ajaib penyimpan data: skor bintang, nama pemain, dan jumlah nyawa!",
    starsReward: 85,
    progressPercent: 0,
    recordScore: 0,
    badgeTag: "Konsep Data",
  },
  {
    id: "loops-roket-antariksa",
    title: "Hitung Mundur Roket",
    category: "loops",
    difficulty: 3,
    description:
      "Rancang urutan algoritma hitung mundur roket 5.. 4.. 3.. 2.. 1.. LUNCUR! bersama modul perulangan.",
    starsReward: 90,
    progressPercent: 0,
    recordScore: 0,
    badgeTag: "Level Mahir",
  },
];
