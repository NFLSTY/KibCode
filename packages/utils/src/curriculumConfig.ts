export type CurriculumCategory =
  | "logic"
  | "loops"
  | "conditionals"
  | "variables"
  | "debugging"
  | "algorithms";

export interface CodingTrackConfig {
  category: CurriculumCategory;
  name: string;
  fundamentalConcept: string;
  pedagogicalObjective: string;
  sampleCodePattern: string;
}

export interface InterestThemeConfig {
  id: string;
  label: string;
  worldName: string;
  themeContext: string;
  characterRole: string;
  narrativeKeywords: string[];
}

export interface GradePedagogyConfig {
  grade: number;
  complexityLabel: string;
  suggestedDifficulty: number;
  instructionStyle: string;
  maxCodeLines: number;
}

export interface StudentCurriculumProfile {
  grade: number;
  schoolName?: string | null;
  hasCodingExp?: boolean;
  codingExpLevel?: string | null;
  favoriteInterest?: string | null;
  learningGoal?: string | null;
}

/**
 * 50% Pedagogical Pillar: Core Coding Fundamentals for Elementary Kids (SD)
 * 6 balanced foundational arenas tailored for children
 */
export const CODING_FUNDAMENTALS_MATRIX: Record<
  CurriculumCategory,
  CodingTrackConfig
> = {
  logic: {
    category: "logic",
    name: "Sekuensial & Logika Urutan",
    fundamentalConcept: "Urutan Instruksi Berurutan (Sequence)",
    pedagogicalObjective:
      "Siswa belajar bahwa program dieksekusi baris per baris dari atas ke bawah secara berurutan.",
    sampleCodePattern: "[Maju 1 Langkah] -> [Maju 1 Langkah] -> [Ambil Bintang]",
  },
  loops: {
    category: "loops",
    name: "Pola & Perulangan Cerdas",
    fundamentalConcept: "Perulangan / Iterasi (Loops)",
    pedagogicalObjective:
      "Siswa memahami cara menyederhanakan kode yang berulang menggunakan blok pengulangan (Repeat N Times).",
    sampleCodePattern: "Ulangi 3 kali {\n  Maju 1 Langkah;\n  Lompat;\n}",
  },
  conditionals: {
    category: "conditionals",
    name: "Keputusan & Percabangan",
    fundamentalConcept: "Percabangan Logika (Conditionals / If-Else)",
    pedagogicalObjective:
      "Siswa memahami bagaimana sistem mengambil keputusan berbeda berdasarkan kondisi sensor atau keadaan lingkungan.",
    sampleCodePattern: "JIKA (ada_rintangan_depan) {\n  Belok_Kiri();\n} LAINNYA {\n  Maju_Terus();\n}",
  },
  variables: {
    category: "variables",
    name: "Variabel & Kotak Memori",
    fundamentalConcept: "Penyimpanan Data & Status (Variables & State)",
    pedagogicalObjective:
      "Siswa memahami konsep variabel sebagai wadah pintar untuk mencatat skor bintang, sisa nyawa, koin, atau nama karakter.",
    sampleCodePattern: "Kotak_Skor = 0;\nAmbil Bintang Emas -> Kotak_Skor = Kotak_Skor + 10;",
  },
  debugging: {
    category: "debugging",
    name: "Detektif Bug Cilik",
    fundamentalConcept: "Pencarian dan Perbaikan Kesalahan Kode (Debugging)",
    pedagogicalObjective:
      "Siswa melatih ketelitian untuk menganalisis baris instruksi yang keliru, hilang, atau tertukar letaknya.",
    sampleCodePattern: "// Error: Robot menabrak!\nPerbaiki urutan langkah agar robot sampai ke target dengan selamat.",
  },
  algorithms: {
    category: "algorithms",
    name: "Algoritma & Perencanaan Langkah",
    fundamentalConcept: "Dekomposisi Masalah & Solusi Bertahap (Algorithms & Problem Solving)",
    pedagogicalObjective:
      "Siswa memahami cara memecah tantangan besar menjadi langkah-langkah terstruktur dan efisien.",
    sampleCodePattern: "Langkah_1: Cari Kunci -> Langkah_2: Buka Gerbang -> Langkah_3: Raih Tropi Juara",
  },
};

/**
 * 50% Engagement Pillar: Student Preference & Narrative Themes
 */
export const STUDENT_INTERESTS_MATRIX: Record<string, InterestThemeConfig> = {
  games: {
    id: "games",
    label: "Bikin Game Seru",
    worldName: "Arena Game Pixel Kibo",
    themeContext: "Membuat game aksi petualangan, mengendalikan hero, mengalahkan bos glitch, dan mengumpulkan koin",
    characterRole: "Hero Pengembang Game Cilik",
    narrativeKeywords: ["Skor Koin", "Portal Level", "Musuh Glitch", "Kunci Emas", "Power-up"],
  },
  animation: {
    id: "animation",
    label: "Animasi & Cerita",
    worldName: "Studio Kartun Ceria Kibo",
    themeContext: "Mengarahkan karakter kartun menari, berganti kostum panggung, berbicara lewat balon kata, dan membuat film animasi",
    characterRole: "Sutradara Animasi Digital Cilik",
    narrativeKeywords: ["Panggung Kostum", "Gerakan Tari", "Balon Dialog", "Lampu Sorot", "Efek Warna"],
  },
  puzzles: {
    id: "puzzles",
    label: "Teka-Teki Logika",
    worldName: "Pulau Misteri Kode Kuno",
    themeContext: "Membuka peti rahasia tersembunyi, memecahkan teka-teki labirin angka, dan mengungkap sandi rahasia",
    characterRole: "Detektif Petualang Logika",
    narrativeKeywords: ["Peti Harta", "Kunci Sandi", "Peta Rahasia", "Jembatan Teka-Teki", "Batu Kristal"],
  },
  ai_robotics: {
    id: "ai_robotics",
    label: "Robotika & AI",
    worldName: "Laboratorium AI Kota Pintar",
    themeContext: "Memprogram sensor robot penjelajah otomatis, drone pemindai lingkungan, dan asisten robot kota modern",
    characterRole: "Insinyur Robotika Masa Depan",
    narrativeKeywords: ["Sensor Ultrasonik", "Roda Robot", "Lampu LED Cerdas", "Radar Jalur", "Kamera AI"],
  },
};

/**
 * Pedagogical Adaptation by Grade Level (SD 1 - 6)
 */
export const GRADE_PEDAGOGY_MAP: Record<number, GradePedagogyConfig> = {
  1: {
    grade: 1,
    complexityLabel: "Pemula Sangat Awal (Kelas 1 SD)",
    suggestedDifficulty: 1,
    instructionStyle: "Bahasa sangat sederhana, imajinasi konkret, 1-2 langkah instruksi arah",
    maxCodeLines: 3,
  },
  2: {
    grade: 2,
    complexityLabel: "Pemula Awal (Kelas 2 SD)",
    suggestedDifficulty: 1,
    instructionStyle: "Bahasa visual ramah anak, instruksi arah dan pengenalan pola berulang sederhana",
    maxCodeLines: 4,
  },
  3: {
    grade: 3,
    complexityLabel: "Tingkat Dasar (Kelas 3 SD)",
    suggestedDifficulty: 2,
    instructionStyle: "Logika urutan, loop berulang dengan angka, percabangan sederhana jika-maka",
    maxCodeLines: 5,
  },
  4: {
    grade: 4,
    complexityLabel: "Tingkat Menengah (Kelas 4 SD)",
    suggestedDifficulty: 2,
    instructionStyle: "Konsep if-else dengan kondisi sensor, deteksi kesalahan baris instruksi",
    maxCodeLines: 6,
  },
  5: {
    grade: 5,
    complexityLabel: "Tingkat Lanjutan (Kelas 5 SD)",
    suggestedDifficulty: 3,
    instructionStyle: "Algoritma komprehensif, variabel skor/kecepatan, perbaikan bug bersarang",
    maxCodeLines: 8,
  },
  6: {
    grade: 6,
    complexityLabel: "Tingkat Mahir SD (Kelas 6 SD)",
    suggestedDifficulty: 3,
    instructionStyle: "Struktur logika modular, multi-kondisi if-else-if, persiapan koding teks terstruktur",
    maxCodeLines: 10,
  },
};

export interface BalancedPromptContext {
  domain: "games" | "modules";
  grade: number;
  pedagogy: GradePedagogyConfig;
  fundamental: CodingTrackConfig;
  interest: InterestThemeConfig;
  topicName: string;
  ratioBreakdown: {
    fundamentalWeight: string;
    preferenceWeight: string;
  };
  systemDirective: string;
}

/**
 * Global Balance Builder: Exactly 50% Fundamental + 50% Student Preference
 * Ready for both "games" and future "modules" (Modul Belajar).
 */
export function buildBalancedPromptContext(
  profile: StudentCurriculumProfile,
  domain: "games" | "modules" = "games",
  category: CurriculumCategory = "logic"
): BalancedPromptContext {
  const grade = Math.min(Math.max(profile.grade || 3, 1), 6);
  const pedagogy: GradePedagogyConfig = GRADE_PEDAGOGY_MAP[grade] ?? GRADE_PEDAGOGY_MAP[3]!;
  const fundamental: CodingTrackConfig = CODING_FUNDAMENTALS_MATRIX[category];
  const interestKey = (profile.favoriteInterest || "games").toLowerCase();
  const interest: InterestThemeConfig = STUDENT_INTERESTS_MATRIX[interestKey] ?? STUDENT_INTERESTS_MATRIX.games!;

  const hasExp = profile.hasCodingExp ? "Sudah pernah mencoba koding (" + (profile.codingExpLevel || "visual blocks") + ")" : "Baru pertama kali belajar koding";

  return {
    domain,
    grade,
    pedagogy,
    fundamental,
    interest,
    topicName: `Misi ${fundamental.name}: ${interest.worldName}`,
    ratioBreakdown: {
      fundamentalWeight: "50% Fokus Konsep Koding Murni: " + fundamental.fundamentalConcept,
      preferenceWeight: "50% Konteks Cerita & Minat Siswa: " + interest.themeContext,
    },
    systemDirective: `Kamu adalah Kurikulum AI Edukatif KibCode untuk siswa SD Kelas ${grade}.
Aturan Komposisi KONTEN:
1. [50% BOBOT PEDAGOGI KODING]: Wajib mendidik konsep "${fundamental.fundamentalConcept}". ${fundamental.pedagogicalObjective}.
2. [50% BOBOT MINAT SISWA]: Kemas dalam cerita seru bertema "${interest.themeContext}" berlatar "${interest.worldName}".
3. Bahasa: Bahasa Indonesia santun, ceria, interaktif, dan mudah dimengerti anak SD Kelas ${grade}.
4. Pengalaman Koding Siswa: ${hasExp}.
5. Format Output: Murni JSON valid sesuai skema yang diminta tanpa markdown fences.`
  };
}
