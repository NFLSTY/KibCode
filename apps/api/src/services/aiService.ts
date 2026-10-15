import type {
  GameCategory,
  QuizQuestionDTO,
  CreateGameDTO,
  AskHintResponseDTO,
  ReviewGameResponseDTO,
} from "@kibcode/types";

interface GeminiGenerationConfig {
  responseMimeType?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class AIService {
  private apiKeys: string[] = [];
  private currentKeyIndex = 0;
  private primaryModel = "gemini-3.5-flash-lite";
  private fallbackModel = "gemini-3.1-flash-lite";

  // In-memory TTL caches to protect Free Tier quota (0 token consumption for repeat requests)
  private hintCache = new Map<string, CacheEntry<AskHintResponseDTO>>();
  private reviewCache = new Map<string, CacheEntry<ReviewGameResponseDTO>>();
  private inFlightRequests = new Map<string, Promise<string>>();

  constructor(apiKey?: string) {
    const rawKeys = apiKey || process.env.GEMINI_API_KEY || "";
    this.apiKeys = rawKeys
      .split(",")
      .map((k) => k.trim().replace(/^["']|["']$/g, "").trim())
      .filter((k) => k.length > 0);
  }

  private cleanOldCache() {
    const now = Date.now();
    if (this.hintCache.size > 200) {
      for (const [key, val] of this.hintCache.entries()) {
        if (val.expiresAt < now) this.hintCache.delete(key);
      }
    }
    if (this.reviewCache.size > 200) {
      for (const [key, val] of this.reviewCache.entries()) {
        if (val.expiresAt < now) this.reviewCache.delete(key);
      }
    }
  }

  private async callGemini(
    prompt: string,
    systemInstruction?: string,
    config?: GeminiGenerationConfig
  ): Promise<string> {
    if (this.apiKeys.length === 0) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // Deduplicate identical simultaneous requests
    const dedupKey = `${prompt.slice(0, 80)}::${config?.temperature}`;
    if (this.inFlightRequests.has(dedupKey)) {
      return this.inFlightRequests.get(dedupKey)!;
    }

    const executeCall = async (): Promise<string> => {
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        systemInstruction: systemInstruction
          ? {
              parts: [{ text: systemInstruction }],
            }
          : undefined,
        generationConfig: {
          responseMimeType: config?.responseMimeType || "application/json",
          temperature: config?.temperature ?? 0.7,
          maxOutputTokens: config?.maxOutputTokens,
        },
      };

      const tryModels = [this.primaryModel, this.fallbackModel];
      let lastError: Error | null = null;

      // Distribute traffic evenly across the keys via Round-Robin
      const startIndex = this.currentKeyIndex;
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
      const orderedKeys = [
        ...this.apiKeys.slice(startIndex),
        ...this.apiKeys.slice(0, startIndex),
      ];

      for (const key of orderedKeys) {
        for (const model of tryModels) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": key,
              },
              body: JSON.stringify(payload),
            });

            if (!response.ok) {
              const errText = await response.text();
              throw new Error(`Gemini API error (${response.status}): ${errText}`);
            }

            const data = (await response.json()) as any;
            const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!candidate) {
              throw new Error("No text returned by Gemini");
            }

            return candidate;
          } catch (err: unknown) {
            lastError = err instanceof Error ? err : new Error(String(err));
            // Automatically try next model or next API key in round-robin sequence
          }
        }
      }

      throw lastError || new Error("Failed to call Gemini API");
    };

    const promise = executeCall().finally(() => {
      this.inFlightRequests.delete(dedupKey);
    });

    this.inFlightRequests.set(dedupKey, promise);
    return promise;
  }

  /**
   * Gemini Touchpoint 1: Generate a brand new Coding Game for Elementary Kids
   */
  async generateCodingGame(params: {
    topic: string;
    category?: GameCategory;
    grade?: number;
    difficulty?: number;
  }): Promise<CreateGameDTO> {
    const grade = params.grade || 3;
    const difficulty = params.difficulty || 2;
    const requestedCategory = params.category || "logic";
    const topic = params.topic || "Petualangan Robot Kibo";

    const systemInstruction = `Kamu adalah perancang kurikulum koding edukatif untuk anak SD (usia 7-12 tahun) di platform KibCode.
Karakter utamamu adalah "Robot Kibo", robot sahabat belajar koding yang ceria, ramah, dan memotivasi.
Fokus pembelajaran HANYA tentang konsep CODING dasar:
- Sekuensial / Urutan Instruksi (Sequence / Logic)
- Perulangan (Loops)
- Percabangan Kondisi (Conditionals / If-Else)
- Mencari dan Memperbaiki Bug (Debugging)
- Variabel & Algoritma (Variables / Algorithms)

Bahasa: Bahasa Indonesia ramah anak SD.
Output HARUS murni JSON yang valid sesuai skema yang diminta, tanpa markdown fences.`;

    const prompt = `Buat 1 game edukasi koding baru bertema: "${topic}".
Untuk siswa SD Kelas: ${grade}, Tingkat Kesulitan: ${difficulty} (1=Mudah, 2=Sedang, 3=Tantangan).
Kategori yang disarankan: "${requestedCategory}".

Skema JSON yang WAJIB dihasilkan:
{
  "title": "${topic}",
  "category": "logic" | "loops" | "conditionals" | "variables" | "debugging" | "algorithms",
  "difficulty": ${difficulty},
  "description": "Deskripsi misi seru untuk anak (1-2 kalimat)",
  "questions": [
    {
      "id": "q1",
      "storyPrompt": "Cerita skenario singkat bergambar imajinasi anak SD",
      "question": "Pertanyaan logika koding yang jelas",
      "codeSnippet": "Contoh blok kode visual atau pseudocode sederhana (opsional tapi disarankan)",
      "options": [
        { "id": "A", "label": "A", "text": "Jawaban pilihan A", "isCorrect": false },
        { "id": "B", "label": "B", "text": "Jawaban pilihan B", "isCorrect": true },
        { "id": "C", "label": "C", "text": "Jawaban pilihan C", "isCorrect": false },
        { "id": "D", "label": "D", "text": "Jawaban pilihan D", "isCorrect": false }
      ],
      "explanation": "Penjelasan ramah anak mengapa jawaban tersebut benar"
    }
  ]
}
Catatan Penting: Gunakan judul tema "${topic}" langsung sebagai "title". JANGAN tambahkan awalan "Tantangan Logika:".
Buat tepat 4 soal kuis logika koding interaktif berkualitas tinggi yang mendidik dan menyenangkan!`;

    try {
      const rawJson = await this.callGemini(prompt, systemInstruction, {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 3500,
      });

      let cleanJson = rawJson.trim();
      if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/, "")
          .trim();
      }

      const parsed = JSON.parse(cleanJson);

      let cleanTitle = (parsed.title || topic).trim();
      cleanTitle = cleanTitle.replace(/^Tantangan\s+Logika\s*:\s*/i, "").trim();
      if (!cleanTitle.startsWith("Misi ") && topic.startsWith("Misi ")) {
        cleanTitle = topic;
      }

      return {
        title: cleanTitle,
        category: (parsed.category as GameCategory) || requestedCategory,
        difficulty: Number(parsed.difficulty) || difficulty,
        description: parsed.description || "Petualangan koding ceria bersama Kibo!",
        questions: Array.isArray(parsed.questions) && parsed.questions.length > 0
          ? parsed.questions
          : this.getCategoryFallbackQuestions(requestedCategory, topic),
      };
    } catch (err) {
      console.warn("Gemini generation fallback triggered:", err);

      // Category-Specific Procedural Fallback so every game has unique, tailored questions
      return {
        title: topic,
        category: requestedCategory,
        difficulty,
        description: `Bantu si Kibo memecahkan misi koding bertema ${topic} menggunakan urutan blok perintah yang benar!`,
        questions: this.getCategoryFallbackQuestions(requestedCategory, topic),
      };
    }
  }

  /**
   * Generates 4 category-tailored educational questions when an API or network cutoff occurs
   */
  private getCategoryFallbackQuestions(
    category: GameCategory,
    topic: string
  ): QuizQuestionDTO[] {
    const ts = Date.now();
    switch (category) {
      case "loops":
        return [
          {
            id: `fb-loop-${ts}-1`,
            storyPrompt: `Di arena ${topic}, Robot Kibo melihat 4 buah baterai energi berjejer lurus dengan jarak yang sama.`,
            question: "Perintah manakah yang paling ringkas untuk mengambil semua baterai?",
            codeSnippet: "Ulangi 4 kali {\n  Maju_1_Langkah();\n  Ambil_Baterai();\n}",
            options: [
              { id: "A", label: "A", text: "Ulangi 4 kali: [Maju 1 Langkah, Ambil Baterai]", isCorrect: true },
              { id: "B", label: "B", text: "Maju 1 Langkah lalu Matikan Robot", isCorrect: false },
              { id: "C", label: "C", text: "Belok Kanan 4 kali tanpa maju", isCorrect: false },
              { id: "D", label: "D", text: "Mundur 4 Langkah", isCorrect: false },
            ],
            explanation: "Perulangan (Loop) menyederhanakan kode agar kita tidak perlu menulis perintah yang sama berkali-kali!",
          },
          {
            id: `fb-loop-${ts}-2`,
            storyPrompt: `Kibo ingin membuat pola lampu kelap-kelip menyala dan padam sebanyak 5 kali.`,
            question: "Berapa angka pengulangan yang harus ditulis pada blok loop?",
            codeSnippet: "Ulangi (?) kali {\n  Nyalakan_Lampu();\n  Tunggu(1_detik);\n  Matikan_Lampu();\n}",
            options: [
              { id: "A", label: "A", text: "3 kali", isCorrect: false },
              { id: "B", label: "B", text: "5 kali", isCorrect: true },
              { id: "C", label: "C", text: "1 kali saja", isCorrect: false },
              { id: "D", label: "D", text: "0 kali", isCorrect: false },
            ],
            explanation: "Karena Kibo ingin lampu kelap-kelip 5 kali, maka angka pengulangan adalah 5!",
          },
          {
            id: `fb-loop-${ts}-3`,
            storyPrompt: `Kibo harus melompat melewati 3 batu sungai di arena ${topic}.`,
            question: "Apa yang terjadi jika perintah pengulangan diatur ke 'Ulangi 2 kali'?",
            codeSnippet: "Ulangi 2 kali {\n  Lompat_Batu();\n}",
            options: [
              { id: "A", label: "A", text: "Kibo sampai ke seberang dengan sempurna", isCorrect: false },
              { id: "B", label: "B", text: "Kibo hanya melewati 2 batu dan belum sampai seberang", isCorrect: true },
              { id: "C", label: "C", text: "Kibo berbalik arah", isCorrect: false },
              { id: "D", label: "D", text: "Kibo melompati 5 batu", isCorrect: false },
            ],
            explanation: "Jumlah perulangan harus pas dengan jumlah target batu agar misi berhasil!",
          },
          {
            id: `fb-loop-${ts}-4`,
            storyPrompt: `Kibo ingin membersihkan 6 ubin kotor di laboratorium arena ${topic}.`,
            question: "Manakah blok perulangan yang benar?",
            codeSnippet: "Ulangi 6 kali {\n  Pel_Ubin();\n  Maju_1_Langkah();\n}",
            options: [
              { id: "A", label: "A", text: "Ulangi 6 kali: Pel Ubin -> Maju", isCorrect: true },
              { id: "B", label: "B", text: "Ulangi 1 kali: Pel Ubin", isCorrect: false },
              { id: "C", label: "C", text: "Ulangi 100 kali: Berputar", isCorrect: false },
              { id: "D", label: "D", text: "Diam di tempat", isCorrect: false },
            ],
            explanation: "Blok perulangan 6 kali akan mengepel seluruh 6 ubin secara tuntas!",
          },
        ];

      case "conditionals":
        return [
          {
            id: `fb-cond-${ts}-1`,
            storyPrompt: `Di jalur arena ${topic}, sensor Kibo mendeteksi lubang air di depannya.`,
            question: "Bagaimana perintah percabangan logika yang aman?",
            codeSnippet: "JIKA (ada_lubang_air) {\n  Lompat();\n} LAINNYA {\n  Jalan_Biasa();\n}",
            options: [
              { id: "A", label: "A", text: "JIKA ada lubang: Lompat, LAINNYA: Jalan Biasa", isCorrect: true },
              { id: "B", label: "B", text: "JIKA ada lubang: Jatuh ke air", isCorrect: false },
              { id: "C", label: "C", text: "Maju terus tanpa melihat sensor", isCorrect: false },
              { id: "D", label: "D", text: "Matikan sensor robot", isCorrect: false },
            ],
            explanation: "Percabangan Jika-Maka (If-Else) memungkinkan robot mengambil keputusan cerdas saat menghadapi kondisi khusus!",
          },
          {
            id: `fb-cond-${ts}-2`,
            storyPrompt: `Kibo melihat gerbang keamanan di arena ${topic}. Gerbang hanya terbuka jika Kibo memiliki kartu akses.`,
            question: "Apa yang akan dijalankan Kibo jika kartunya belum ditemukan?",
            codeSnippet: "JIKA (punya_kartu_akses) {\n  Buka_Gerbang();\n} LAINNYA {\n  Cari_Kartu();\n}",
            options: [
              { id: "A", label: "A", text: "Buka Gerbang", isCorrect: false },
              { id: "B", label: "B", text: "Cari Kartu", isCorrect: true },
              { id: "C", label: "C", text: "Menabrak gerbang", isCorrect: false },
              { id: "D", label: "D", text: "Tidur di depan gerbang", isCorrect: false },
            ],
            explanation: "Karena kondisi punya_kartu bernilai salah, komputer mengeksekusi blok LAINNYA (Cari_Kartu)!",
          },
          {
            id: `fb-cond-${ts}-3`,
            storyPrompt: `Sensor baterai Kibo berbunyi peringatan: Baterai tersisa kurang dari 20%.`,
            question: "Instruksi darurat apa yang harus ada di dalam blok JIKA?",
            codeSnippet: "JIKA (baterai < 20%) {\n  // Instruksi darurat di sini\n}",
            options: [
              { id: "A", label: "A", text: "Menari gembira", isCorrect: false },
              { id: "B", label: "B", text: "Pergi ke Stasiun Pengisian Daya (Charge)", isCorrect: true },
              { id: "C", label: "C", text: "Lari secepat mungkin", isCorrect: false },
              { id: "D", label: "D", text: "Menghapus memori", isCorrect: false },
            ],
            explanation: "Kondisi baterai lemah harus memicu aksi pengisian daya agar robot tidak kehabisan energi!",
          },
          {
            id: `fb-cond-${ts}-4`,
            storyPrompt: `Kibo bertemu lampu lalu lintas koding: Lampu menyala HIJAU.`,
            question: "Aksi apa yang sesuai dengan aturan?",
            codeSnippet: "JIKA (lampu == 'HIJAU') {\n  Maju_Jalan();\n} LAINNYA {\n  Berhenti();\n}",
            options: [
              { id: "A", label: "A", text: "Maju Jalan", isCorrect: true },
              { id: "B", label: "B", text: "Berhenti", isCorrect: false },
              { id: "C", label: "C", text: "Mundur", isCorrect: false },
              { id: "D", label: "D", text: "Belok putar arah", isCorrect: false },
            ],
            explanation: "Kondisi lampu HIJAU terpenuhi, maka robot mengeksekusi Maju_Jalan()!",
          },
        ];

      case "variables":
        return [
          {
            id: `fb-var-${ts}-1`,
            storyPrompt: `Kibo memiliki kotak memori bernama 'Skor_Bintang'. Di awal petualangan, nilainya adalah 0.`,
            question: "Ketika Kibo menemukan bintang emas bernilai 10, bagaimana perintah variabel yang benar?",
            codeSnippet: "Skor_Bintang = 0;\nAmbil_Bintang() -> Skor_Bintang = Skor_Bintang + 10;",
            options: [
              { id: "A", label: "A", text: "Skor_Bintang = Skor_Bintang + 10", isCorrect: true },
              { id: "B", label: "B", text: "Skor_Bintang = 0", isCorrect: false },
              { id: "C", label: "C", text: "Hapus Skor_Bintang", isCorrect: false },
              { id: "D", label: "D", text: "Skor_Bintang = Skor_Bintang - 10", isCorrect: false },
            ],
            explanation: "Variabel adalah kotak penyimpan data. Kita menambahkan 10 ke nilai lama agar skor bertambah!",
          },
          {
            id: `fb-var-${ts}-2`,
            storyPrompt: `Kibo memiliki variabel 'Sisa_Nyawa' yang bernilai 3. Kibo terkena sengatan listrik kecil dan kehilangan 1 nyawa.`,
            question: "Berapa nilai variabel 'Sisa_Nyawa' sekarang?",
            codeSnippet: "Sisa_Nyawa = 3;\nSisa_Nyawa = Sisa_Nyawa - 1;",
            options: [
              { id: "A", label: "A", text: "4 nyawa", isCorrect: false },
              { id: "B", label: "B", text: "2 nyawa", isCorrect: true },
              { id: "C", label: "C", text: "0 nyawa", isCorrect: false },
              { id: "D", label: "D", text: "3 nyawa", isCorrect: false },
            ],
            explanation: "3 dikurangi 1 sama dengan 2. Nilai baru disimpan ke variabel Sisa_Nyawa!",
          },
          {
            id: `fb-var-${ts}-3`,
            storyPrompt: `Kibo ingin menyimpan nama pemain ke dalam komputer.`,
            question: "Tipe kotak variabel apa yang paling tepat untuk menyimpan nama?",
            codeSnippet: "Nama_Hero = 'Kibo Juara';",
            options: [
              { id: "A", label: "A", text: "Teks (String / Kata)", isCorrect: true },
              { id: "B", label: "B", text: "Angka Matematika", isCorrect: false },
              { id: "C", label: "C", text: "Kamera", isCorrect: false },
              { id: "D", label: "D", text: "Kabel Listrik", isCorrect: false },
            ],
            explanation: "Nama dan kata-kata disimpan dalam variabel bertipe Teks (String) menggunakan tanda petik!",
          },
          {
            id: `fb-var-${ts}-4`,
            storyPrompt: `Di arena ${topic}, Kibo mengumpulkan 3 koin perak (+5) dan 1 koin emas (+10). Nilai awal koin adalah 0.`,
            question: "Berapa total nilai variabel 'Dompet_Koin' Kibo sekarang?",
            codeSnippet: "Dompet_Koin = (3 * 5) + 10;",
            options: [
              { id: "A", label: "A", text: "25 koin", isCorrect: true },
              { id: "B", label: "B", text: "15 koin", isCorrect: false },
              { id: "C", label: "C", text: "30 koin", isCorrect: false },
              { id: "D", label: "D", text: "50 koin", isCorrect: false },
            ],
            explanation: "3 x 5 = 15, ditambah 10 = 25 koin tersimpan di variabel Dompet_Koin!",
          },
        ];

      case "debugging":
        return [
          {
            id: `fb-debug-${ts}-1`,
            storyPrompt: `Kibo harus belok ke kiri untuk menghindari jebakan, tetapi robot malah belok ke kanan dan terjebak.`,
            question: "Apa bug (kesalahan kode) pada program Kibo?",
            codeSnippet: "// Program yang salah:\nMaju_1_Langkah();\nBelok_Kanan(); // <-- BUG!",
            options: [
              { id: "A", label: "A", text: "Ganti Belok_Kanan() menjadi Belok_Kiri()", isCorrect: true },
              { id: "B", label: "B", text: "Hapus semua kode", isCorrect: false },
              { id: "C", label: "C", text: "Matikan komputer", isCorrect: false },
              { id: "D", label: "D", text: "Tambah perintah Belok_Kanan() 10 kali lagi", isCorrect: false },
            ],
            explanation: "Debugging adalah mencari dan memperbaiki kesalahan. Mengubah arah belok ke kiri menyelesaikan masalah!",
          },
          {
            id: `fb-debug-${ts}-2`,
            storyPrompt: `Robot Kibo berjalan berputar-putar tanpa henti dan tidak pernah berhenti.`,
            question: "Kesalahan jenis apa yang sedang dialami robot?",
            codeSnippet: "Ulangi SELAMANYA {\n  Berputar();\n}",
            options: [
              { id: "A", label: "A", text: "Perulangan tanpa henti (Infinite Loop)", isCorrect: true },
              { id: "B", label: "B", text: "Komputer rusak terbakar", isCorrect: false },
              { id: "C", label: "C", text: "Robot kehabisan baterai", isCorrect: false },
              { id: "D", label: "D", text: "Baterai terlalu penuh", isCorrect: false },
            ],
            explanation: "Infinite loop terjadi ketika perintah perulangan tidak memiliki batas berhenti!",
          },
          {
            id: `fb-debug-${ts}-3`,
            storyPrompt: `Kibo ingin membuka pintu tetapi mencoba memutar kunci sebelum memasukkannya ke lubang kunci.`,
            question: "Bagaimana urutan instruksi yang telah diperbaiki?",
            codeSnippet: "// Urutan yang salah:\nPutar_Kunci();\nMasukkan_Kunci();",
            options: [
              { id: "A", label: "A", text: "1. Masukkan_Kunci() -> 2. Putar_Kunci()", isCorrect: true },
              { id: "B", label: "B", text: "1. Putar_Kunci() -> 2. Lempar_Kunci()", isCorrect: false },
              { id: "C", label: "C", text: "1. Rusak_Pintu()", isCorrect: false },
              { id: "D", label: "D", text: "Tidak perlu kunci", isCorrect: false },
            ],
            explanation: "Instruksi harus dijalankan dalam urutan logis yang benar agar berhasil membuka pintu!",
          },
          {
            id: `fb-debug-${ts}-4`,
            storyPrompt: `Program Kibo tidak bisa berjalan karena ada tanda kurung tutup yang hilang: 'Ulangi 3 kali {'`,
            question: "Bagaimana cara memperbaikinya?",
            codeSnippet: "Ulangi 3 kali {\n  Maju_1_Langkah();\n// Kurung tutup hilang!",
            options: [
              { id: "A", label: "A", text: "Tambahkan tanda kurung kurawal tutup '}' di akhir blok", isCorrect: true },
              { id: "B", label: "B", text: "Hapus kata 'Ulangi'", isCorrect: false },
              { id: "C", label: "C", text: "Ganti dengan angka 0", isCorrect: false },
              { id: "D", label: "D", text: "Biarkan saja", isCorrect: false },
            ],
            explanation: "Setiap blok yang dibuka dengan kurung kurawal buka '{' wajib ditutup dengan '}'!",
          },
        ];

      case "algorithms":
        return [
          {
            id: `fb-algo-${ts}-1`,
            storyPrompt: `Kibo ingin merancang algoritma untuk membuat segelas susu cokelat.`,
            question: "Langkah manakah yang paling tepat sebagai langkah awal (Langkah 1)?",
            codeSnippet: "Langkah 1: (?)\nLangkah 2: Masukkan bubuk cokelat ke gelas\nLangkah 3: Tuang air hangat lalu aduk",
            options: [
              { id: "A", label: "A", text: "Siapkan gelas bersih dan sendok", isCorrect: true },
              { id: "B", label: "B", text: "Minum susu sampai habis", isCorrect: false },
              { id: "C", label: "C", text: "Cuci gelas yang sudah kosong", isCorrect: false },
              { id: "D", label: "D", text: "Tiduran di sofa", isCorrect: false },
            ],
            explanation: "Algoritma selalu dimulai dari langkah persiapan awal sebelum melakukan aksi berikutnya!",
          },
          {
            id: `fb-algo-${ts}-2`,
            storyPrompt: `Kibo ingin menemukan jalan terpendek menuju stasiun roket di arena ${topic}. Jalur A butuh 5 langkah, Jalur B butuh 8 langkah.`,
            question: "Jalur manakah yang lebih efisien menurut algoritma?",
            codeSnippet: "Jalur_A = 5 langkah;\nJalur_B = 8 langkah;",
            options: [
              { id: "A", label: "A", text: "Jalur A (karena lebih hemat langkah dan energi)", isCorrect: true },
              { id: "B", label: "B", text: "Jalur B (karena lebih jauh)", isCorrect: false },
              { id: "C", label: "C", text: "Kedua jalur sama saja", isCorrect: false },
              { id: "D", label: "D", text: "Tidak memilih jalur mana pun", isCorrect: false },
            ],
            explanation: "Algoritma yang baik memilih solusi terpendek dan paling efisien untuk mencapai tujuan!",
          },
          {
            id: `fb-algo-${ts}-3`,
            storyPrompt: `Metode Dekomposisi: Memecah tugas besar 'Membangun Robot' menjadi bagian-bagian kecil.`,
            question: "Manakah pecahan tugas kecil yang tepat?",
            codeSnippet: "Tugas Besar: Bangun Robot Kibo\n1. Rakit Kaki -> 2. Pasang Badan -> 3. Pasang Kepala & Sensor",
            options: [
              { id: "A", label: "A", text: "Rakit Kaki -> Pasang Badan -> Pasang Kepala & Sensor", isCorrect: true },
              { id: "B", label: "B", text: "Langsung terbangkan robot ke angkasa", isCorrect: false },
              { id: "C", label: "C", text: "Bongkar semua barang", isCorrect: false },
              { id: "D", label: "D", text: "Cat dinding rumah", isCorrect: false },
            ],
            explanation: "Dekomposisi algoritma mempermudah kita menyelesaikan masalah kompleks dengan membaginya menjadi langkah teratur!",
          },
          {
            id: `fb-algo-${ts}-4`,
            storyPrompt: `Kibo mengurutkan 3 angka acak [9, 2, 5] dari yang terkecil ke yang terbesar.`,
            question: "Bagaimana hasil urutan algoritma pengurutan (Sorting) yang benar?",
            codeSnippet: "Acak: [9, 2, 5] -> Algoritma Sorting -> Hasil: (?)",
            options: [
              { id: "A", label: "A", text: "[2, 5, 9]", isCorrect: true },
              { id: "B", label: "B", text: "[9, 5, 2]", isCorrect: false },
              { id: "C", label: "C", text: "[5, 2, 9]", isCorrect: false },
              { id: "D", label: "D", text: "[2, 9, 5]", isCorrect: false },
            ],
            explanation: "Algoritma pengurutan mengatur data dari nilai terkecil (2), lalu (5), hingga terbesar (9)!",
          },
        ];

      case "logic":
      default:
        return [
          {
            id: `fb-logic-${ts}-1`,
            storyPrompt: `Robot Kibo berdiri di titik awal arena ${topic}. Kibo perlu melangkah 3 langkah ke depan untuk mencapai bendera kemenangan.`,
            question: "Urutan perintah manakah yang benar untuk sampai ke bendera?",
            codeSnippet: "[Maju 1 Langkah] -> [Maju 1 Langkah] -> [Maju 1 Langkah] -> [Raih Bendera]",
            options: [
              { id: "A", label: "A", text: "Maju 1 Langkah, Maju 1 Langkah, Maju 1 Langkah", isCorrect: true },
              { id: "B", label: "B", text: "Mundur 3 Langkah", isCorrect: false },
              { id: "C", label: "C", text: "Belok Kiri 3 kali di tempat", isCorrect: false },
              { id: "D", label: "D", text: "Diam tanpa bergerak", isCorrect: false },
            ],
            explanation: "Tiga perintah maju berurutan akan membawa robot melangkah 3 kotak ke depan tepat ke bendera!",
          },
          {
            id: `fb-logic-${ts}-2`,
            storyPrompt: `Kibo ingin mengambil kunci emas di sebelah kanannya setelah melangkah 1 kali ke depan.`,
            question: "Bagaimana sekuensial (urutan) instruksi yang tepat?",
            codeSnippet: "Langkah 1: Maju 1 Langkah;\nLangkah 2: Belok Kanan;\nLangkah 3: Ambil Kunci;",
            options: [
              { id: "A", label: "A", text: "Maju 1 Langkah -> Belok Kanan -> Ambil Kunci", isCorrect: true },
              { id: "B", label: "B", text: "Ambil Kunci -> Maju 1 Langkah -> Mundur", isCorrect: false },
              { id: "C", label: "C", text: "Belok Kiri -> Lompat -> Berhenti", isCorrect: false },
              { id: "D", label: "D", text: "Maju 10 Langkah langsung", isCorrect: false },
            ],
            explanation: "Program harus dijalankan berurutan: robot harus mendekati kunci lalu belok dan mengambilnya!",
          },
          {
            id: `fb-logic-${ts}-3`,
            storyPrompt: `Kibo menghadapi jalan buntu di arena ${topic}. Untuk berbalik ke arah belakang, berapa kali Kibo harus belok kanan?`,
            question: "Berapa kali putaran 'Belok Kanan' (90 derajat) untuk putar balik?",
            codeSnippet: "Putar Balik (180 derajat) = Belok Kanan (?) kali",
            options: [
              { id: "A", label: "A", text: "1 kali", isCorrect: false },
              { id: "B", label: "B", text: "2 kali", isCorrect: true },
              { id: "C", label: "C", text: "4 kali", isCorrect: false },
              { id: "D", label: "D", text: "0 kali", isCorrect: false },
            ],
            explanation: "Dua kali belok 90 derajat menghasilkan putaran 180 derajat yang memutar balik arah robot!",
          },
          {
            id: `fb-logic-${ts}-4`,
            storyPrompt: `Kibo harus menyalakan 2 saklar berurutan: Saklar A dulu baru Saklar B.`,
            question: "Manakah urutan instruksi yang tepat?",
            codeSnippet: "[Nyalakan Saklar A] -> [Nyalakan Saklar B]",
            options: [
              { id: "A", label: "A", text: "Nyalakan Saklar A lalu Nyalakan Saklar B", isCorrect: true },
              { id: "B", label: "B", text: "Nyalakan Saklar B lalu Matikan Saklar A", isCorrect: false },
              { id: "C", label: "C", text: "Matikan kedua saklar", isCorrect: false },
              { id: "D", label: "D", text: "Lewati kedua saklar", isCorrect: false },
            ],
            explanation: "Prinsip sekuensial adalah mengeksekusi instruksi pertama sampai selesai sebelum instruksi kedua!",
          },
        ];
    }
  }

  /**
   * Gemini Touchpoint 2: Real-time In-Quiz Smart Hint from Kibo AI
   */
  async generateHint(params: {
    question: string;
    storyPrompt?: string;
    codeSnippet?: string;
    grade?: number;
  }): Promise<AskHintResponseDTO> {
    const cacheKey = `${params.question}::${params.codeSnippet || ""}::${params.grade || 3}`;
    const cached = this.hintCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const prompt = `Soal kuis koding anak SD:
Cerita: "${params.storyPrompt || "-"}"
Pertanyaan: "${params.question}"
Kode: "${params.codeSnippet || "-"}"
Siswa: SD Kelas ${params.grade || 3}.

Berikan 1 atau 2 kalimat petunjuk ramah, hangat, dan mendidik sebagai Robot Kibo.
ATURAN: JANGAN beri tahu langsung pilihan jawaban (A, B, C, D). Ajak anak berpikir logis tentang urutan atau kondisi!
Output JSON: { "hint": "petunjuk di sini" }`;

    try {
      const rawJson = await this.callGemini(prompt, undefined, {
        responseMimeType: "application/json",
        temperature: 0.5,
        maxOutputTokens: 120,
      });
      const parsed = JSON.parse(rawJson);
      const result: AskHintResponseDTO = {
        hint: parsed.hint || "Pikirkan urutan langkahnya dari awal ya! Kamu pasti bisa!",
      };

      this.cleanOldCache();
      this.hintCache.set(cacheKey, {
        data: result,
        expiresAt: Date.now() + 1000 * 60 * 30, // 30 minutes TTL
      });

      return result;
    } catch {
      return {
        hint: "💡 Coba baca lagi ceritanya perlahan dan perhatikan urutan perintah yang harus dilakukan si Kibo lebih dulu!",
      };
    }
  }

  /**
   * Gemini Touchpoint 3: Post-Game Personalized Review & Motivation
   */
  async generateReview(params: {
    gameTitle: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    durationSeconds: number;
    grade?: number;
  }): Promise<ReviewGameResponseDTO> {
    const scoreBucket = Math.round(params.score / 10) * 10;
    const cacheKey = `${params.gameTitle}::${scoreBucket}::${params.grade || 3}`;
    const cached = this.reviewCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const prompt = `Siswa SD Kelas ${params.grade || 3} baru saja menyelesaikan game koding: "${params.gameTitle}".
Hasil:
- Skor: ${params.score}/100
- Soal Benar: ${params.correctAnswers} dari ${params.totalQuestions}
- Waktu: ${params.durationSeconds} detik

Sebagai Robot Kibo, berikan apresiasi hangat dan 1 tips koding singkat untuk belajar selanjutnya.
Output JSON:
{
  "message": "Pesan apresiasi penyemangat ceria (1 kalimat)",
  "tip": "Tips koding ringkas aplikatif untuk dicoba selanjutnya (1 kalimat)"
}`;

    try {
      const rawJson = await this.callGemini(prompt, undefined, {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 150,
      });
      const parsed = JSON.parse(rawJson);
      const result: ReviewGameResponseDTO = {
        message: parsed.message || "Hebat sekali usahamu di petualangan koding kali ini!",
        tip: parsed.tip || "Terus latih logikamu dengan mencoba tantangan perulangan berikutnya ya!",
      };

      this.cleanOldCache();
      this.reviewCache.set(cacheKey, {
        data: result,
        expiresAt: Date.now() + 1000 * 60 * 60, // 1 hour TTL
      });

      return result;
    } catch {
      return {
        message: "Luar biasa! Setiap kali mencoba, kemampuan berpikir logismu makin terasah!",
        tip: "Ingat prinsip koding: periksa baris demi baris secara teliti!",
      };
    }
  }

  /**
   * Gemini Touchpoint 4: Interactive Kid-Friendly AI Coding Tutor Conversation
   */
  async askAITutor(params: {
    message: string;
    grade?: number;
    interest?: string;
  }): Promise<{ reply: string; suggestedChips: string[]; suggestedAction?: { label: string; href: string } }> {
    const grade = params.grade || 3;
    const interest = params.interest || "games";

    const systemInstruction = `Kamu adalah "Robot Kibo", sahabat dan tutor belajar koding ceria untuk anak SD (Kelas ${grade} SD, usia 7-12 tahun).
Gaya bicaramu:
1. Sangat ramah, antusias, menggunakan Bahasa Indonesia yang mudah dimengerti anak SD.
2. Gunakan analogi seru dari kehidupan sehari-hari (seperti resep masakan, balok LEGO, lampu lalu lintas, atau petualangan game).
3. Selalu sematkan 1-2 emoji ceria (🤖, ✨, 🚀, 💡, 🎮).
4. Buat jawaban padat dan jelas (2-4 kalimat saja), jangan bertele-tele agar anak tidak bosan.
5. Jika anak bertanya di luar tema koding atau teknologi, arahkan kembali dengan lembut dan ceria ke petualangan koding.
Output HARUS format JSON valid:
{
  "reply": "Jawaban penjelasan ceria Robot Kibo di sini",
  "suggestedChips": ["Pertanyaan lanjut 1 (maks 4 kata)", "Pertanyaan lanjut 2 (maks 4 kata)"],
  "suggestedAction": { "label": "Tombol aksi (opsional)", "href": "/games atau /coding atau /kurikulum" }
}`;

    const prompt = `Pesan dari siswa Kelas ${grade} SD (minat: ${interest}):
"${params.message}"

Jawablah sebagai Robot Kibo dengan ramah dan edukatif!`;

    try {
      const rawJson = await this.callGemini(prompt, systemInstruction, {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 600,
      });

      let cleanJson = rawJson.trim();
      if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/, "")
          .trim();
      }

      const parsed = JSON.parse(cleanJson);
      return {
        reply: parsed.reply || "Halo teman kecil! Aku Robot Kibo, siap membantumu belajar koding dengan seru!",
        suggestedChips: Array.isArray(parsed.suggestedChips) && parsed.suggestedChips.length > 0
          ? parsed.suggestedChips
          : ["Apa itu Loop?", "Bagaimana cara If-Else bekerja?", "Kenapa koding ada bug?"],
        suggestedAction: parsed.suggestedAction || { label: "Main Game Edukasi", href: "/games" },
      };
    } catch (err) {
      console.warn("AI Tutor fallback triggered:", err);
      // Fast delightful procedural fallback
      const lower = params.message.toLowerCase();
      if (lower.includes("loop") || lower.includes("ulang")) {
        return {
          reply: "Loop itu seperti memutar lagu favoritmu berulang kali! Daripada menyuruh robot 'Maju, Maju, Maju', kita cukup bilang 'Ulangi 3 kali: Maju!'. Keren dan hemat instruksi kan? 🔄✨",
          suggestedChips: ["Beri contoh Loop!", "Apa bedanya Loop dan If?"],
          suggestedAction: { label: "Coba Game Loop", href: "/games?category=loops" },
        };
      } else if (lower.includes("bug") || lower.includes("error")) {
        return {
          reply: "Bug adalah kata lucu untuk kesalahan di dalam kode! Dulu, ada serangga sungguhan yang masuk ke mesin komputer kuno. Tugas kita sebagai programmer cilik adalah menjadi detektif untuk membetulkannya! 🐛🔍",
          suggestedChips: ["Bagaimana cara cari bug?", "Mau latihan debugging!"],
          suggestedAction: { label: "Latihan Pemburu Bug", href: "/games?category=debugging" },
        };
      } else if (lower.includes("if") || lower.includes("jika")) {
        return {
          reply: "If-Else itu seperti payung saat hujan! JIKA di luar hujan, kita bawa payung. KALAU TIDAK, kita pakai topi. Komputer juga mengambil keputusan pintar seperti itu! ⚡☔",
          suggestedChips: ["Contoh If di Game?", "Apa itu Else?"],
          suggestedAction: { label: "Coba Game If-Else", href: "/games?category=conditionals" },
        };
      } else {
        return {
          reply: `Halo sahabat programmer cilik! Koding itu seperti memberi petunjuk ajaib ke robot agar mereka bisa bergerak, bermain game, dan memecahkan teka-teki seru bersamamu! Apa yang ingin kamu tanyakan hari ini? 🤖🚀`,
          suggestedChips: ["Apa itu Algoritma?", "Bikin Game itu gimana?", "Apa itu Variabel?"],
          suggestedAction: { label: "Eksplor Modul Belajar", href: "/kurikulum" },
        };
      }
    }
  }
  /**
   * Gemini Touchpoint 5: Generate a rich AI-powered Learning Module for "Modul Belajar"
   * Returns a full module with 3 units, each with a deep explanation, analogy, code pattern, and mini quiz.
   */
  async generateLearningModule(params: {
    category: string;
    grade: number;
    interest: string;
    topicName: string;
    worldName: string;
    fundamentalConcept: string;
    sampleCodePattern: string;
  }): Promise<any> {
    const { category, grade, interest, topicName, worldName, fundamentalConcept, sampleCodePattern } = params;

    const systemInstruction = `Kamu adalah perancang kurikulum koding interaktif untuk anak SD (kelas ${grade}, usia 7-12 tahun) di platform KibCode.
Buatlah modul belajar yang sangat kaya, menyenangkan, dan mendidik tentang konsep "${fundamentalConcept}".
Karakter: Robot Kibo, sahabat belajar ceria.
Dunia tematik: "${worldName}" (minat siswa: ${interest}).
Output HARUS murni JSON valid sesuai skema. Bahasa Indonesia ramah anak SD.`;

    const prompt = `Buat 1 modul belajar koding bertema "${topicName}" untuk siswa SD Kelas ${grade}.
Kategori: ${category} (${fundamentalConcept}).
Dunia tema: ${worldName}.

Skema JSON WAJIB:
{
  "title": "Judul modul menarik (tidak pakai awalan 'Modul Belajar:')",
  "concept": "Nama konsep coding singkat",
  "summary": "Deskripsi 2-3 kalimat menarik tentang isi modul ini",
  "units": [
    {
      "id": "unit-${category}-1",
      "title": "Judul unit 1: Pengenalan",
      "description": "Penjelasan panjang dan mendalam (4-6 kalimat) tentang konsep ${fundamentalConcept} dengan bahasa anak SD. Sertakan contoh nyata dari dunia ${worldName}. Jelaskan MENGAPA konsep ini penting dan BAGAIMANA cara kerjanya secara detail.",
      "analogy": "Analogi unik dan seru dari kehidupan sehari-hari anak (bukan resep kue biasa, cari yang kreatif dan relevan dengan ${worldName})",
      "codePattern": "${sampleCodePattern}",
      "miniQuiz": {
        "question": "Pertanyaan pemahaman spesifik tentang ${fundamentalConcept}",
        "options": [
          { "id": "A", "text": "Jawaban benar yang menunjukkan pemahaman konsep", "isCorrect": true },
          { "id": "B", "text": "Jawaban salah tapi masuk akal", "isCorrect": false },
          { "id": "C", "text": "Jawaban salah yang lucu", "isCorrect": false }
        ],
        "explanation": "Penjelasan 2-3 kalimat mengapa jawaban A benar dan apa yang bisa dipelajari"
      }
    },
    {
      "id": "unit-${category}-2",
      "title": "Judul unit 2: Eksplorasi Pola",
      "description": "Penjelasan mendalam (4-6 kalimat) tentang bagaimana pola ${fundamentalConcept} digunakan. Berikan 2-3 contoh penggunaan nyata dalam game atau kehidupan. Jelaskan variasi-variasinya.",
      "analogy": "Analogi berbeda dari unit 1, lebih interaktif",
      "codePattern": "Contoh kode berbeda yang menunjukkan variasi pola ${category}",
      "miniQuiz": {
        "question": "Pertanyaan yang menguji kemampuan menerapkan pola ${fundamentalConcept}",
        "options": [
          { "id": "A", "text": "Jawaban benar", "isCorrect": true },
          { "id": "B", "text": "Jawaban salah", "isCorrect": false },
          { "id": "C", "text": "Jawaban salah", "isCorrect": false }
        ],
        "explanation": "Penjelasan mendalam mengapa ini benar"
      }
    },
    {
      "id": "unit-${category}-3",
      "title": "Judul unit 3: Misi Praktik",
      "description": "Penjelasan (4-6 kalimat) tentang bagaimana menerapkan ${fundamentalConcept} dalam proyek nyata atau game. Berikan tips dan trik dari Robot Kibo. Ceritakan kisah sukses menggunakan konsep ini.",
      "analogy": "Analogi misi petualangan yang memotivasi siswa untuk praktek",
      "codePattern": "Contoh kode misi akhir yang menggabungkan semua yang dipelajari",
      "miniQuiz": {
        "question": "Pertanyaan motivasi dan refleksi tentang ${fundamentalConcept}",
        "options": [
          { "id": "A", "text": "Jawaban positif dan percaya diri", "isCorrect": true },
          { "id": "B", "text": "Jawaban pesimis", "isCorrect": false }
        ],
        "explanation": "Kata-kata penyemangat dari Robot Kibo tentang perjalanan belajar"
      }
    }
  ]
}
Pastikan setiap 'description' benar-benar panjang (4-6 kalimat) dan informatif. JANGAN gunakan deskripsi yang pendek atau generik!`;

    try {
      const rawJson = await this.callGemini(prompt, systemInstruction, {
        responseMimeType: "application/json",
        temperature: 0.75,
        maxOutputTokens: 4000,
      });

      let cleanJson = rawJson.trim();
      if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/, "")
          .trim();
      }

      const parsed = JSON.parse(cleanJson);
      return {
        title: parsed.title || topicName,
        concept: parsed.concept || fundamentalConcept,
        summary: parsed.summary || `Pelajari konsep ${fundamentalConcept} bersama Robot Kibo di dunia ${worldName}.`,
        units: Array.isArray(parsed.units) && parsed.units.length >= 3
          ? parsed.units
          : this.getModuleFallbackUnits(category, topicName, worldName, fundamentalConcept, sampleCodePattern),
      };
    } catch (err) {
      console.warn("Module generation fallback triggered:", err);
      return {
        title: topicName,
        concept: fundamentalConcept,
        summary: `Pelajari konsep ${fundamentalConcept} bersama Robot Kibo di dunia ${worldName}.`,
        units: this.getModuleFallbackUnits(category, topicName, worldName, fundamentalConcept, sampleCodePattern),
      };
    }
  }

  private getModuleFallbackUnits(
    category: string,
    topicName: string,
    worldName: string,
    fundamentalConcept: string,
    sampleCodePattern: string
  ): any[] {
    return [
      {
        id: `unit-${category}-1`,
        title: `Pengenalan Dasar: ${fundamentalConcept}`,
        description: `Konsep ${fundamentalConcept} adalah salah satu fondasi paling penting dalam dunia koding. Bayangkan kamu sedang menjadi sutradara film di dunia ${worldName} — kamu perlu memberikan instruksi yang tepat dan berurutan kepada para aktor (robot) agar cerita berjalan dengan benar. ${fundamentalConcept} bekerja persis seperti itu: memberikan urutan perintah yang logis sehingga komputer tahu apa yang harus dilakukan selangkah demi selangkah. Tanpa konsep ini, program akan bingung dan tidak tahu harus memulai dari mana. Itulah mengapa para programmer selalu mempelajari ${fundamentalConcept} sebagai langkah pertama belajar koding!`,
        analogy: `Bayangkan kamu bermain di dunia ${worldName} dan Robot Kibo harus melewati rintangan. Kamu tidak bisa berteriak "Sampai di tujuan!" begitu saja — kamu harus memberikan petunjuk langkah per langkah: "Maju 3 kotak, belok kanan, lompat batu!" Itulah inti dari ${fundamentalConcept}!`,
        codePattern: sampleCodePattern,
        miniQuiz: {
          question: `Mengapa konsep ${fundamentalConcept} sangat penting dalam pemrograman?`,
          options: [
            { id: "A", text: "Agar komputer mengerti perintah secara teratur dan tidak bingung dalam menjalankan program", isCorrect: true },
            { id: "B", text: "Hanya untuk membuat layar komputer terlihat lebih bagus dan berwarna-warni", isCorrect: false },
            { id: "C", text: "Supaya komputer menjadi lebih cepat panas saat digunakan", isCorrect: false },
          ],
          explanation: `Komputer adalah mesin yang sangat cerdas, tetapi ia hanya bisa mengikuti instruksi yang terstruktur dan berurutan. Konsep ${fundamentalConcept} memastikan program berjalan lancar tanpa error karena setiap langkah jelas dan logis!`,
        },
      },
      {
        id: `unit-${category}-2`,
        title: `Eksplorasi Pola: ${fundamentalConcept}`,
        description: `Setelah memahami dasar ${fundamentalConcept}, saatnya kita menjelajahi pola-pola seru yang bisa dibuat! Di dunia ${worldName}, ada begitu banyak situasi yang membutuhkan keahlian ${fundamentalConcept} — mulai dari mengatur pergerakan robot, mengelola sumber daya game, hingga membangun sistem yang rumit. Pola ${category} sangat fleksibel: kamu bisa menggunakannya berulang kali dengan cara berbeda untuk memecahkan berbagai jenis masalah. Para programmer profesional menggunakan pola ini setiap hari! Misalnya, aplikasi media sosial yang kamu suka menggunakan prinsip ini untuk menampilkan postingan, dan game favoritmu menggunakannya untuk menggerakkan karakter. Dengan berlatih berbagai pola, kamu akan semakin mahir dalam berpikir secara logis dan terstruktur seperti seorang programmer sejati!`,
        analogy: `Di dunia ${worldName}, setiap misi punya pola unik tersendiri. Seperti melodi musik yang bisa dimainkan dengan variasi berbeda namun tetap indah, begitu pula pola ${fundamentalConcept} yang bisa diterapkan dalam berbagai situasi koding!`,
        codePattern: `// Variasi Pola di ${worldName}\n${sampleCodePattern}\n// Pola ini bisa dimodifikasi sesuai kebutuhan!`,
        miniQuiz: {
          question: "Apa yang terjadi jika urutan instruksi dalam program diubah secara sembarangan?",
          options: [
            { id: "A", text: "Hasil program bisa berbeda atau robot akan salah arah dan tidak mencapai tujuan", isCorrect: true },
            { id: "B", text: "Program selalu menghasilkan hasil yang benar apapun urutannya", isCorrect: false },
            { id: "C", text: "Monitor komputer akan berubah menjadi warna emas berkilau", isCorrect: false },
          ],
          explanation: "Urutan instruksi menentukan seluruh alur kerja komputer. Sama seperti resep masakan — jika kamu memanggang tepung sebelum mencampurnya, hasilnya akan sangat berbeda! Urutan yang benar adalah kunci keberhasilan program.",
        },
      },
      {
        id: `unit-${category}-3`,
        title: `Misi Praktik: ${topicName}`,
        description: `Selamat! Kamu sudah mempelajari teori dan pola ${fundamentalConcept}. Kini saatnya misi sesungguhnya dimulai! Robot Kibo menunggumu di arena tantangan dunia ${worldName} untuk membuktikan bahwa kamu sudah siap menjadi programmer cilik yang hebat. Ingat tips penting dari Kibo: selalu rencanakan langkahmu sebelum mulai menulis kode, pecah masalah besar menjadi langkah-langkah kecil, dan jangan takut untuk mencoba lagi jika ada kesalahan — setiap error adalah pelajaran berharga! Para programmer terkenal dunia seperti yang menciptakan game favoritmu pun sering mengalami bug. Yang membedakan programmer hebat adalah mereka tidak menyerah dan terus belajar dari setiap percobaan. Kamu bisa melakukannya!`,
        analogy: `Bayangkan kamu adalah pahlawan di dunia ${worldName} yang sudah menyelesaikan pelatihan. Sekarang saatnya membuktikan kemampuanmu di medan pertempuran sesungguhnya! Setiap tantangan yang kamu selesaikan akan menambah kekuatan dan kebijaksanaanmu sebagai programmer!`,
        codePattern: `// Misi Final: Gabungkan semua yang telah dipelajari!\nMisi_Selesai() -> Dapatkan_Trofi("${topicName}", 50_Bintang);\nRobot_Kibo.berkata("Luar biasa! Kamu adalah bintang koding! ⭐");`,
        miniQuiz: {
          question: "Siapa programmer cilik terhebat yang siap menaklukkan tantangan koding bersama Robot Kibo?",
          options: [
            { id: "A", text: "Aku! Karena aku rajin belajar, tidak takut mencoba, dan selalu semangat bersama Robot Kibo!", isCorrect: true },
            { id: "B", text: "Tidak ada yang bisa menjadi programmer hebat, koding itu terlalu sulit", isCorrect: false },
          ],
          explanation: "Dengan terus mencoba, tidak takut salah, dan belajar dari setiap pengalaman, kamu pasti akan menjadi programmer cilik yang luar biasa! Robot Kibo selalu ada untuk mendukungmu dalam setiap langkah petualangan koding! 🤖⭐",
        },
      },
    ];
  }
}

export const aiService = new AIService();
