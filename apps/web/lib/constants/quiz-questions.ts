import type { GameCategory } from "@kibcode/types";

export interface QuizQuestion {
  id: string;
  storyPrompt?: string;
  question: string;
  codeSnippet?: string;
  equationVisual?: {
    num1: string | number;
    operator: string;
    num2: string | number;
    icon?: string;
  };
  options: Array<{
    id: string;
    label: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
}

export const GAME_QUESTIONS_MAP: Record<string, QuizQuestion[]> = {
  // Logic: Petualangan Robot Labirin
  "logic-robot-labirin": [
    {
      id: "lrl-1",
      storyPrompt:
        "Robot Kibo berada di petak awal menghadap ke Timur. Di depannya ada 2 petak kosong, lalu sebuah bintang emas.",
      question: "Urutan perintah kode manakah yang tepat agar Kibo berhasil mengambil bintang?",
      codeSnippet: "// Target: Kibo ➔ Bintang ⭐\n[Maju] -> [Maju] -> [Ambil Bintang]",
      options: [
        { id: "A", label: "A", text: "Maju ➔ Maju ➔ Ambil Bintang", isCorrect: true },
        { id: "B", label: "B", text: "Belok Kanan ➔ Maju ➔ Mundur", isCorrect: false },
        { id: "C", label: "C", text: "Maju ➔ Belok Kiri ➔ Maju", isCorrect: false },
        { id: "D", label: "D", text: "Diam di tempat ➔ Ambil Bintang", isCorrect: false },
      ],
      explanation: "Robot Kibo perlu bergerak maju 2 kali lurus ke depan, lalu mengambil bintang emas!",
    },
    {
      id: "lrl-2",
      storyPrompt:
        "Kibo melangkah 1 petak maju, tetapi di depannya ada dinding batu. Jalan terbuka ada di sebelah kanan Kibo.",
      question: "Perintah apa yang harus dijalankan Kibo sebelum melangkah lagi?",
      codeSnippet: "[Maju 1 Langkah] -> [ ??? ] -> [Maju 1 Langkah]",
      options: [
        { id: "A", label: "A", text: "Belok Kiri", isCorrect: false },
        { id: "B", label: "B", text: "Belok Kanan", isCorrect: true },
        { id: "C", label: "C", text: "Lompat ke atas", isCorrect: false },
        { id: "D", label: "D", text: "Mundur 3 petak", isCorrect: false },
      ],
      explanation: "Karena jalan terbuka ada di kanan, Kibo harus memutar badan dengan perintah Belok Kanan!",
    },
    {
      id: "lrl-3",
      storyPrompt: "Dalam koding, menyusun perintah langkah demi langkah secara berurutan disebut...",
      question: "Konsep dasar koding apakah ini?",
      codeSnippet: "Langkah 1 ➔ Langkah 2 ➔ Langkah 3",
      options: [
        { id: "A", label: "A", text: "Sekuensial / Urutan Logika", isCorrect: true },
        { id: "B", label: "B", text: "Menghapus Game", isCorrect: false },
        { id: "C", label: "C", text: "Koneksi Wifi", isCorrect: false },
        { id: "D", label: "D", text: "Tombol Rahasia", isCorrect: false },
      ],
      explanation: "Sekuensial (Sequence) adalah menjalankan instruksi baris per baris secara teratur dari atas ke bawah.",
    },
    {
      id: "lrl-4",
      storyPrompt:
        "Kibo ingin membuat pola jalan berbentuk kotak persegi (4 sisi yang sama panjang).",
      question: "Berapa kali Kibo harus mengulang kombinasi [Maju 1 Langkah] lalu [Belok Kanan]?",
      codeSnippet: "Ulangi ( ... kali ) {\n  Maju 1 Langkah;\n  Belok Kanan;\n}",
      options: [
        { id: "A", label: "A", text: "2 Kali", isCorrect: false },
        { id: "B", label: "B", text: "3 Kali", isCorrect: false },
        { id: "C", label: "C", text: "4 Kali", isCorrect: true },
        { id: "D", label: "D", text: "10 Kali", isCorrect: false },
      ],
      explanation: "Persegi memiliki 4 sisi dan 4 sudut siku-siku, jadi Kibo mengulangnya sebanyak 4 kali!",
    },
  ],

  // Loops: Taman Safari Perulangan
  "loops-taman-safari": [
    {
      id: "lts-1",
      storyPrompt:
        "Kibo menulis kode: Maju, Maju, Maju, Maju, Maju. Kodemu terasa sangat panjang dan membosankan.",
      question: "Bagaimana cara menyederhanakan kode tersebut menggunakan blok Loop?",
      codeSnippet: "// Kode lama:\nMaju; Maju; Maju; Maju; Maju;\n\n// Kode baru:",
      options: [
        { id: "A", label: "A", text: "Ulangi 5 kali: [Maju]", isCorrect: true },
        { id: "B", label: "B", text: "Ulangi 2 kali: [Maju]", isCorrect: false },
        { id: "C", label: "C", text: "Hapus semua kode", isCorrect: false },
        { id: "D", label: "D", text: "Ulangi 10 kali: [Mundur]", isCorrect: false },
      ],
      explanation: "Blok Loop 'Ulangi 5 kali [Maju]' menjalankan perintah Maju sebanyak 5 kali secara otomatis dan ringkas!",
    },
    {
      id: "lts-2",
      storyPrompt:
        "Kibo menjalankan kode: Ulangi 3 kali { Kumpulkan 2 Pisang }. Berapa total pisang yang didapat Kibo?",
      question: "Hitung total pisang yang berhasil dikumpulkan robot Kibo!",
      codeSnippet: "loop (3 kali) {\n  ambil_pisang(2);\n}",
      options: [
        { id: "A", label: "A", text: "5 Pisang", isCorrect: false },
        { id: "B", label: "B", text: "6 Pisang", isCorrect: true },
        { id: "C", label: "C", text: "3 Pisang", isCorrect: false },
        { id: "D", label: "D", text: "2 Pisang", isCorrect: false },
      ],
      explanation: "3 kali pengulangan x 2 pisang = 6 pisang terkumpul!",
    },
    {
      id: "lts-3",
      storyPrompt: "Di taman safari, robot Kibo ingin membunyikan klakson 'Tiiit!' setiap kali melihat zebra.",
      question: "Jika ada 4 zebra di sepanjang lintasan, kode loop yang tepat adalah:",
      codeSnippet: "for (zebra = 1; zebra <= 4; zebra++) {\n  bunyikan_klakson();\n}",
      options: [
        { id: "A", label: "A", text: "Ulangi 4 kali: [Bunyikan Klakson]", isCorrect: true },
        { id: "B", label: "B", text: "Ulangi 1 kali: [Bunyikan Klakson]", isCorrect: false },
        { id: "C", label: "C", text: "Matikan Mesin", isCorrect: false },
        { id: "D", label: "D", text: "Belok Kiri 4 kali", isCorrect: false },
      ],
      explanation: "Karena ada 4 zebra, instruksi membunyikan klakson dijalankan berulang sebanyak 4 kali.",
    },
  ],

  // Conditionals: Detektif Sensor Warna
  "conditionals-sensor-warna": [
    {
      id: "csw-1",
      storyPrompt:
        "Kibo mendekati lampu lalu lintas pintar. Sensor membaca lampu berwarna MERAH.",
      question: "Berdasarkan kode di bawah, aksi apa yang akan dilakukan robot Kibo?",
      codeSnippet: "JIKA (lampu == 'MERAH') {\n  Berhenti();\n} LAINNYA {\n  Maju();\n}",
      options: [
        { id: "A", label: "A", text: "Berhenti", isCorrect: true },
        { id: "B", label: "B", text: "Maju", isCorrect: false },
        { id: "C", label: "C", text: "Belok Balik", isCorrect: false },
        { id: "D", label: "D", text: "Tidur", isCorrect: false },
      ],
      explanation: "Kondisi 'lampu == MERAH' bernilai BENAR (True), sehingga blok kode Berhenti() yang dijalankan!",
    },
    {
      id: "csw-2",
      storyPrompt:
        "Sensor mendeteksi energi baterai Kibo tinggal 10%. Kibo punya aturan keselamatan baterai.",
      question: "Manakah kondisi If-Else yang tepat untuk mengisi daya saat baterai di bawah 20%?",
      codeSnippet: "if (baterai < 20) {\n  cari_stasiun_cas();\n}",
      options: [
        { id: "A", label: "A", text: "JIKA baterai < 20 MAKA Pergi ke Tempat Cas", isCorrect: true },
        { id: "B", label: "B", text: "JIKA baterai > 90 MAKA Pergi ke Tempat Cas", isCorrect: false },
        { id: "C", label: "C", text: "JIKA baterai == 100 MAKA Berhenti", isCorrect: false },
        { id: "D", label: "D", text: "Selalu jalan terus sampai mati", isCorrect: false },
      ],
      explanation: "Simbol '< 20' berarti lebih kecil dari 20%, tepat untuk mendeteksi baterai lemah!",
    },
  ],

  // Debugging: Pemburu Bug Cilik
  "debugging-pemburu-bug": [
    {
      id: "dpb-1",
      storyPrompt:
        "Kibo ingin meminum susu cokelat di meja. Kode yang ditulis: [Minum Susu] ➔ [Buka Tutup Botol]. Kibo tersedak!",
      question: "Apa bug (kesalahan logika) pada instruksi di atas?",
      codeSnippet: "1. Minum Susu;\n2. Buka Tutup Botol; // ERROR!",
      options: [
        { id: "A", label: "A", text: "Urutannya terbalik: harus Buka Tutup dulu baru Minum", isCorrect: true },
        { id: "B", label: "B", text: "Susu harus diganti air putih", isCorrect: false },
        { id: "C", label: "C", text: "Kibo tidak boleh minum", isCorrect: false },
        { id: "D", label: "D", text: "Botolnya harus dibuang", isCorrect: false },
      ],
      explanation: "Dalam koding urutan sangat penting! Botol harus dibuka sebelum isinya bisa diminum.",
    },
    {
      id: "dpb-2",
      storyPrompt: "Istilah 'Bug' dalam koding pertama kali terinspirasi dari serangga nyata yang masuk ke mesin komputer kuno.",
      question: "Apa arti istilah 'Debugging' bagi seorang programmer cilik?",
      codeSnippet: "Find Bug ➔ Fix Bug ➔ Clean Code ✨",
      options: [
        { id: "A", label: "A", text: "Mencari dan memperbaiki kesalahan kode", isCorrect: true },
        { id: "B", label: "B", text: "Menangkap serangga di kebun", isCorrect: false },
        { id: "C", label: "C", text: "Mematikan monitor komputer", isCorrect: false },
        { id: "D", label: "D", text: "Mengunduh video baru", isCorrect: false },
      ],
      explanation: "Debugging adalah proses mulia seorang coder untuk mendeteksi error dan membuatnya bekerja sempurna!",
    },
  ],
};

export function getQuestionsForGame(gameId: string, category: GameCategory): QuizQuestion[] {
  if (GAME_QUESTIONS_MAP[gameId]) {
    return GAME_QUESTIONS_MAP[gameId];
  }

  // Fallback to logic questions
  return GAME_QUESTIONS_MAP["logic-robot-labirin"] || [];
}
