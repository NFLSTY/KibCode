import type { GameCategory } from "@kibcode/types";

export interface QuizQuestion {
  id: string;
  storyPrompt?: string;
  question: string;
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
  // Math: Penjumlahan Cepat
  "math-quick-sum": [
    {
      id: "mqs-1",
      storyPrompt: "Budi memiliki 24 apel. Ibu memberinya 18 apel lagi di keranjang.",
      question: "Berapa total apel yang dimiliki Budi sekarang?",
      equationVisual: { num1: 24, operator: "+", num2: 18, icon: "🍎" },
      options: [
        { id: "A", label: "A", text: "38", isCorrect: false },
        { id: "B", label: "B", text: "42", isCorrect: true },
        { id: "C", label: "C", text: "40", isCorrect: false },
        { id: "D", label: "D", text: "44", isCorrect: false },
      ],
      explanation: "24 + 18 = 42. Hebat sekali!",
    },
    {
      id: "mqs-2",
      storyPrompt: "Di perpustakaan ada 35 buku cerita. Datang kiriman 27 buku baru.",
      question: "Berapa jumlah semua buku di perpustakaan sekarang?",
      equationVisual: { num1: 35, operator: "+", num2: 27, icon: "📚" },
      options: [
        { id: "A", label: "A", text: "52", isCorrect: false },
        { id: "B", label: "B", text: "60", isCorrect: false },
        { id: "C", label: "C", text: "62", isCorrect: true },
        { id: "D", label: "D", text: "65", isCorrect: false },
      ],
      explanation: "35 + 27 = 62. Kamu luar biasa!",
    },
    {
      id: "mqs-3",
      storyPrompt: "Siti mengumpulkan 56 biji congklak. Ani membawa 39 biji congklak.",
      question: "Berapa total biji congklak mereka berdua?",
      equationVisual: { num1: 56, operator: "+", num2: 39, icon: "✨" },
      options: [
        { id: "A", label: "A", text: "95", isCorrect: true },
        { id: "B", label: "B", text: "85", isCorrect: false },
        { id: "C", label: "C", text: "92", isCorrect: false },
        { id: "D", label: "D", text: "96", isCorrect: false },
      ],
      explanation: "56 + 39 = 95. Hitunganmu sangat kilat!",
    },
    {
      id: "mqs-4",
      storyPrompt: "Paman menanam 45 pohon mangga dan 28 pohon jeruk di kebun.",
      question: "Berapa banyak pohon buah yang ditanam Paman?",
      equationVisual: { num1: 45, operator: "+", num2: 28, icon: "🌳" },
      options: [
        { id: "A", label: "A", text: "71", isCorrect: false },
        { id: "B", label: "B", text: "73", isCorrect: true },
        { id: "C", label: "C", text: "63", isCorrect: false },
        { id: "D", label: "D", text: "75", isCorrect: false },
      ],
      explanation: "45 + 28 = 73. Jawaban yang tepat!",
    },
    {
      id: "mqs-5",
      storyPrompt: "Di toko ada 50 kotak susu cokelat dan 38 kotak susu stroberi.",
      question: "Berapa kotak susu kesukaan anak-anak semuanya?",
      equationVisual: { num1: 50, operator: "+", num2: 38, icon: "🥛" },
      options: [
        { id: "A", label: "A", text: "78", isCorrect: false },
        { id: "B", label: "B", text: "80", isCorrect: false },
        { id: "C", label: "C", text: "88", isCorrect: true },
        { id: "D", label: "D", text: "90", isCorrect: false },
      ],
      explanation: "50 + 38 = 88. Sempurna!",
    },
  ],

  // Reading: Petualangan Fabel Kancil
  "reading-fabel-kancil": [
    {
      id: "rfk-1",
      storyPrompt: "Kancil ingin menyeberangi sungai deras untuk makan mentimun di seberang.",
      question: "Siapa hewan di sungai yang diminta Kancil berbaris untuk dihitung?",
      equationVisual: { num1: "Kancil", operator: "vs", num2: "Sungai", icon: "🐊" },
      options: [
        { id: "A", label: "A", text: "Ikan Mas", isCorrect: false },
        { id: "B", label: "B", text: "Buaya", isCorrect: true },
        { id: "C", label: "C", text: "Kura-kura", isCorrect: false },
        { id: "D", label: "D", text: "Bebek", isCorrect: false },
      ],
      explanation: "Kancil yang cerdik meminta kawanan Buaya berbaris!",
    },
    {
      id: "rfk-2",
      storyPrompt: "Kancil melompati punggung buaya satu demi satu sambil menghitung.",
      question: "Alasan utama Kancil menghitung buaya adalah untuk...",
      equationVisual: { num1: "Lompat", operator: "→", num2: "Seberang", icon: "👣" },
      options: [
        { id: "A", label: "A", text: "Menyeberang sungai dengan selamat", isCorrect: true },
        { id: "B", label: "B", text: "Mengajak buaya bermain petak umpet", isCorrect: false },
        { id: "C", label: "C", text: "Memberi buaya hadiah daging", isCorrect: false },
        { id: "D", label: "D", text: "Menunggu perahu nelayan lewat", isCorrect: false },
      ],
      explanation: "Kancil menyeberangi sungai dengan melompati punggung buaya.",
    },
    {
      id: "rfk-3",
      storyPrompt: "Setelah sampai di seberang, Kancil berterima kasih lalu lari ke kebun mentimun.",
      question: "Sifat utama Si Kancil dalam dongeng tersebut adalah...",
      equationVisual: { num1: "Kecerdikan", operator: "★", num2: "Moral", icon: "💡" },
      options: [
        { id: "A", label: "A", text: "Penakut dan pemalas", isCorrect: false },
        { id: "B", label: "B", text: "Cerdik dan banyak akal", isCorrect: true },
        { id: "C", label: "C", text: "Pemarah dan galak", isCorrect: false },
        { id: "D", label: "D", text: "Suka berkelahi", isCorrect: false },
      ],
      explanation: "Kancil dikenal cerdik dan pandai memecahkan masalah.",
    },
  ],

  // Spelling: Susun Kata Ceria
  "spelling-susun-kata": [
    {
      id: "ssk-1",
      storyPrompt: "Bantu Kibo menyusun huruf acak berikut menjadi nama buah segar:",
      question: "Huruf acak: [ P - E - L - A ]. Kata yang benar adalah...",
      equationVisual: { num1: "[P-E-L-A]", operator: "➜", num2: "Kata", icon: "🍎" },
      options: [
        { id: "A", label: "A", text: "APEL", isCorrect: true },
        { id: "B", label: "B", text: "PALE", isCorrect: false },
        { id: "C", label: "C", text: "LEPA", isCorrect: false },
        { id: "D", label: "D", text: "ELAP", isCorrect: false },
      ],
      explanation: "A-P-E-L adalah buah yang manis dan renyah!",
    },
    {
      id: "ssk-2",
      storyPrompt: "Susun huruf berikut menjadi benda tempat kita belajar di sekolah:",
      question: "Huruf acak: [ B - K - U - U ]. Kata yang benar adalah...",
      equationVisual: { num1: "[B-K-U-U]", operator: "➜", num2: "Kata", icon: "📖" },
      options: [
        { id: "A", label: "A", text: "KUBU", isCorrect: false },
        { id: "B", label: "B", text: "BUKU", isCorrect: true },
        { id: "C", label: "C", text: "UKUB", isCorrect: false },
        { id: "D", label: "D", text: "UBUK", isCorrect: false },
      ],
      explanation: "B-U-K-U adalah jendela ilmu pengetahuan!",
    },
    {
      id: "ssk-3",
      storyPrompt: "Manakah penulisan kata baku dalam bahasa Indonesia yang benar?",
      question: "Pilih kata yang ditulis dengan ejaan tepat:",
      equationVisual: { num1: "Ejaan", operator: "✓", num2: "KBBI", icon: "✏️" },
      options: [
        { id: "A", label: "A", text: "Apotek", isCorrect: true },
        { id: "B", label: "B", text: "Apotik", isCorrect: false },
        { id: "C", label: "C", text: "Apoteek", isCorrect: false },
        { id: "D", label: "D", text: "Apotie", isCorrect: false },
      ],
      explanation: "Sesuai KBBI, ejaan yang benar adalah Apotek.",
    },
  ],
};

// Generates fallback question bank for any game category or ID
export function getQuestionsForGame(gameId: string, category: GameCategory = "math"): QuizQuestion[] {
  const match = GAME_QUESTIONS_MAP[gameId];
  if (match && match.length > 0) {
    return match;
  }

  // Fallback by category
  if (category === "reading") {
    return GAME_QUESTIONS_MAP["reading-fabel-kancil"] ?? [];
  }
  if (category === "spelling") {
    return GAME_QUESTIONS_MAP["spelling-susun-kata"] ?? [];
  }
  return GAME_QUESTIONS_MAP["math-quick-sum"] ?? [];
}

