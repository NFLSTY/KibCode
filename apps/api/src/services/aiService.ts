import type {
  GameCategory,
  QuizQuestionDTO,
  CreateGameDTO,
  AskHintResponseDTO,
  ReviewGameResponseDTO,
} from "@kibcode/types";
import { getCategoryFallbackQuestions } from "./gameFallbackData.js";

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

    const prompt = `Rancang 1 game edukasi koding interaktif bertema: "${topic}".
Untuk siswa SD Kelas: ${grade}, Tingkat Kesulitan: ${difficulty} (1=Mudah, 2=Sedang, 3=Tantangan).
Kategori koding: "${requestedCategory}".

Skema JSON yang WAJIB dihasilkan:
{
  "title": "${topic}",
  "category": "${requestedCategory}",
  "difficulty": ${difficulty},
  "description": "Deskripsi petualangan game singkat yang seru untuk anak (1-2 kalimat)",
  "questions": [
    {
      "id": "q1",
      "storyPrompt": "Cerita skenario tantangan game yang seru dan memotivasi anak",
      "question": "Pertanyaan teka-teki logika koding yang jelas dan terarah",
      "codeSnippet": "Blok visual kode atau pseudocode ramah anak",
      "options": [
        { "id": "A", "label": "A", "text": "Jawaban pilihan A", "isCorrect": false },
        { "id": "B", "label": "B", "text": "Jawaban pilihan B", "isCorrect": true },
        { "id": "C", "label": "C", "text": "Jawaban pilihan C", "isCorrect": false },
        { "id": "D", "label": "D", "text": "Jawaban pilihan D", "isCorrect": false }
      ],
      "explanation": "Penjelasan singkat ramah anak mengapa jawaban tersebut benar"
    }
  ]
}
Catatan Penting:
1. Judul tema "${topic}" langsung sebagai "title". JANGAN tambahkan awalan "Tantangan Logika:".
2. Buat TEPAT 10 soal kuis tantangan koding interaktif (questions berjumlah 10 buah berturut-turut dari id q1 sampai q10).
3. Soal 1-3: Pemahaman konsep dasar & observasi pola blok perintah
4. Soal 4-7: Penelusuran alur eksekusi (tracing kode / deteksi rintangan / percabangan)
5. Soal 8-10: Strategi pemecahan teka-teki logika koding terapan
6. Karakter Kibo membimbing ramah dalam setiap skenario petualangan.`;

    try {
      const rawJson = await this.callGemini(prompt, systemInstruction, {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 6000,
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
   * Generates 10 category-tailored educational questions when an API or network cutoff occurs
   */
  private getCategoryFallbackQuestions(
    category: GameCategory,
    topic: string
  ): QuizQuestionDTO[] {
    return getCategoryFallbackQuestions(category, topic);
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
   * Pattern:
   * - Hal 1: Explanation, theory, with Analogy placed in the middle, and deep computation link.
   * - Hal 2: Real code example with step-by-step explanation and Kibo tips.
   * - Hal 3: Quiz covering the previous unit materials with relevant questions and correct answers.
   */
  async generateLearningModule(params: {
    category: string;
    grade: number;
    interest: string;
    topicName: string;
    worldName: string;
    fundamentalConcept: string;
    sampleCodePattern: string;
    codingExpLevel?: string;
    learningGoal?: string;
  }): Promise<any> {
    const {
      category,
      grade,
      interest,
      topicName,
      worldName,
      fundamentalConcept,
      sampleCodePattern,
      codingExpLevel,
      learningGoal,
    } = params;

    const safeGrade = Math.min(6, Math.max(1, grade || 3));
    let difficultyGuidance = "";
    if (safeGrade <= 2) {
      difficultyGuidance = `Tingkat SD Kelas ${safeGrade} (Usia 6-8 tahun): Gunakan kosakata sangat sederhana, bahasa ceria, kalimat ringkas, dan visual blok perintah berpanah [Maju] -> [Belok]. Analogi dari mainan atau aktivitas harian sederhana.`;
    } else if (safeGrade <= 4) {
      difficultyGuidance = `Tingkat SD Kelas ${safeGrade} (Usia 8-10 tahun): Bahasa santun, ramah, dan interaktif. Gunakan blok instruksi dengan parameter (misal: ulang(3) { maju(); }). Analogi terhubung dengan petualangan di dunia ${worldName}.`;
    } else {
      difficultyGuidance = `Tingkat SD Kelas ${safeGrade} (Usia 10-12 tahun): Bahasa komputasional yang menarik (efisiensi, algoritma, variabel, kondisi logis). Kode berformat pseudocode rapi. Analogi pemecahan masalah (problem solving).`;
    }

    const expGuidance = codingExpLevel
      ? `Pengalaman koding siswa: ${codingExpLevel}. Sesuaikan kedalaman materi agar menantang namun mudah dipahami.`
      : "Siswa pemula, utamakan penjelasan yang mudah dimengerti.";

    const systemInstruction = `Kamu adalah perancang kurikulum koding interaktif untuk anak SD (Kelas ${safeGrade}, usia 7-12 tahun) di platform KibCode.
Karakter: Robot Kibo, sahabat belajar ceria dan suportif.
Dunia tematik: "${worldName}" (minat siswa: ${interest}).
Target Pedagogi: Konsep "${fundamentalConcept}".
Pedoman Kesulitan: ${difficultyGuidance}
${expGuidance}
Output HARUS murni JSON valid sesuai skema yang diminta, tanpa markdown fences. Gunakan Bahasa Indonesia yang ramah, hangat, dan mendidik.`;

    const prompt = `Rancang 1 modul belajar koding bertema "${topicName}" untuk siswa SD Kelas ${safeGrade}.
Kategori: ${category} (${fundamentalConcept}).
Dunia tema: ${worldName}.
Tujuan belajar siswa: ${learningGoal || "Menguasai koding dasar dengan gembira"}.

ATURAN STRUKTUR MODUL WAJIB:
Modul harus terdiri dari tepat 3 unit yang merepresentasikan 3 Halaman Pembelajaran berurutan:
- Hal 1 (unit 1): Teori & Pengenalan Konsep (Penjelasan teori awal, diletakkan ANALOGI dunia nyata di bagian tengah, dilanjutkan penjelasan mendalam).
- Hal 2 (unit 2): Contoh Kode & Penjelasannya (Contoh kode praktis yang relevan dengan ${worldName}, diikuti penjelasan baris demi baris dan tips dari Robot Kibo).
- Hal 3 (unit 3): Kuis Pemahaman Materi (Menguji konsep teori dari Hal 1 dan logika kode dari Hal 2 dengan pertanyaan relevan dan opsi jawaban jelas).

Skema JSON WAJIB:
{
  "title": "Judul modul menarik dan ramah anak (tanpa awalan 'Modul:')",
  "concept": "${fundamentalConcept}",
  "summary": "Ringkasan 2-3 kalimat menarik tentang isi materi yang akan dipelajari bersama Robot Kibo",
  "units": [
    {
      "id": "unit-${category}-1",
      "title": "Teori & Konsep: ${fundamentalConcept}",
      "description": "Penjelasan teori awal yang ramah anak (3-4 kalimat) mengenai apa itu konsep ${fundamentalConcept} dan mengapa komputer memerlukannya.",
      "analogy": "Analogi dunia nyata yang kreatif dan sangat akrab bagi anak SD (diletakkan di tengah sebagai jembatan pemahaman).",
      "deepExplanation": "Penjelasan lanjutan (3-4 kalimat) yang menghubungkan analogi tersebut dengan cara kerja koding pada program atau robot.",
      "codePattern": "",
      "miniQuiz": null
    },
    {
      "id": "unit-${category}-2",
      "title": "Contoh Kode & Cara Kerjanya",
      "description": "Pengantar singkat contoh kode.",
      "analogy": "",
      "deepExplanation": "",
      "codePattern": "${sampleCodePattern}",
      "codeExplanation": "Penjelasan mendalam dan mudah dipahami (4-5 kalimat) tentang bagaimana setiap perintah dalam contoh kode di atas dijalankan selangkah demi selangkah.",
      "tips": "Tips cerdas atau trik seru dari Robot Kibo untuk menghindari kesalahan saat menyusun kode ini.",
      "miniQuiz": null
    },
    {
      "id": "unit-${category}-3",
      "title": "Kuis Tantangan Pemahaman",
      "description": "Rangkuman singkat dan motivasi sebelum menjawab kuis pemahaman.",
      "analogy": "",
      "deepExplanation": "",
      "codePattern": "",
      "miniQuiz": {
        "question": "Pertanyaan pemahaman konseptual dari materi Hal 1",
        "options": [
          { "id": "A", "text": "Pilihan tepat", "isCorrect": true },
          { "id": "B", "text": "Pilihan keliru", "isCorrect": false },
          { "id": "C", "text": "Pilihan salah", "isCorrect": false }
        ],
        "explanation": "Penjelasan ramah mengapa jawaban A benar.",
        "questions": [
          {
            "id": "q1",
            "question": "Pertanyaan 1 menguji konsep teori dan analogi dari Hal 1...",
            "options": [
              { "id": "A", "text": "Jawaban yang benar dan tepat menunjukkan pemahaman konsep", "isCorrect": true },
              { "id": "B", "text": "Jawaban yang salah namun masuk akal", "isCorrect": false },
              { "id": "C", "text": "Jawaban yang salah dan lucu", "isCorrect": false }
            ],
            "explanation": "Penjelasan konsep teori Hal 1."
          },
          {
            "id": "q2",
            "question": "Pertanyaan 2 menguji analisis contoh kode dari Hal 2...",
            "options": [
              { "id": "A", "text": "Jawaban salah", "isCorrect": false },
              { "id": "B", "text": "Jawaban yang benar sesuai alur kode Hal 2", "isCorrect": true },
              { "id": "C", "text": "Jawaban keliru", "isCorrect": false }
            ],
            "explanation": "Penjelasan cara kerja baris kode Hal 2."
          },
          {
            "id": "q3",
            "question": "Pertanyaan 3 skenario aplikasi dan logika pemecahan masalah...",
            "options": [
              { "id": "A", "text": "Jawaban yang tepat untuk menyelesaikan skenario", "isCorrect": true },
              { "id": "B", "text": "Jawaban yang salah", "isCorrect": false },
              { "id": "C", "text": "Jawaban yang membingungkan komputer", "isCorrect": false }
            ],
            "explanation": "Penjelasan penyelesaian masalah bersama Robot Kibo."
          }
        ]
      }
    }
  ]
}
Pastikan seluruh kalimat komunikatif, edukatif, dan tidak generik!`;

    try {
      const rawJson = await this.callGemini(prompt, systemInstruction, {
        responseMimeType: "application/json",
        temperature: 0.7,
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
          : this.getModuleFallbackUnits(category, topicName, worldName, fundamentalConcept, sampleCodePattern, safeGrade),
      };
    } catch (err) {
      console.warn("Module generation fallback triggered:", err);
      return {
        title: topicName,
        concept: fundamentalConcept,
        summary: `Pelajari konsep ${fundamentalConcept} bersama Robot Kibo di dunia ${worldName}.`,
        units: this.getModuleFallbackUnits(category, topicName, worldName, fundamentalConcept, sampleCodePattern, safeGrade),
      };
    }
  }

  private getModuleFallbackUnits(
    category: string,
    topicName: string,
    worldName: string,
    fundamentalConcept: string,
    sampleCodePattern: string,
    grade: number = 3
  ): any[] {
    const q1 = {
      id: "q1",
      question: `Berdasarkan materi di Hal. 1, apa alasan utama kita membutuhkan konsep ${fundamentalConcept} dalam pemrograman?`,
      options: [
        {
          id: "A",
          text: `Agar komputer mengerti dan mengeksekusi instruksi secara teratur tanpa kesalahan`,
          isCorrect: true,
        },
        {
          id: "B",
          text: `Hanya agar kode terlihat rumit dan layar monitor mengeluarkan bunyi bising`,
          isCorrect: false,
        },
        {
          id: "C",
          text: `Supaya komputer bisa langsung membaca pikiran kita tanpa perlu instruksi`,
          isCorrect: false,
        },
      ],
      explanation: `Tepat sekali! Komputer membutuhkan instruksi yang logis dan jelas. Konsep ${fundamentalConcept} menjadi panduan agar aksi program berjalan sesuai yang kita harapkan.`,
    };

    const q2 = {
      id: "q2",
      question: `Perhatikan contoh kode di Hal. 2. Apa yang akan terjadi jika kita menjalankan blok instruksi tersebut langkah demi langkah?`,
      options: [
        {
          id: "A",
          text: `Komputer mematikan semua program seketika`,
          isCorrect: false,
        },
        {
          id: "B",
          text: `Robot Kibo membaca baris instruksi dari atas ke bawah dan menjalankan aksinya secara berurutan`,
          isCorrect: true,
        },
        {
          id: "C",
          text: `Instruksi dilewati secara acak sehingga robot melompat tanpa arah`,
          isCorrect: false,
        },
      ],
      explanation: `Benar! Komputer membaca perintah baris demi baris, memastikan setiap tindakan pada kode dijalankan sesuai urutannya.`,
    };

    const q3 = {
      id: "q3",
      question: `Jika Robot Kibo menghadapi rintangan tak terduga di dunia ${worldName}, bagaimana kita menerapkan ${fundamentalConcept} untuk memperbaikinya?`,
      options: [
        {
          id: "A",
          text: `Memeriksa urutan instruksi kembali dan memastikan logika perintah sudah tepat`,
          isCorrect: true,
        },
        {
          id: "B",
          text: `Menghapus seluruh file dan membiarkan robot terjebak`,
          isCorrect: false,
        },
        {
          id: "C",
          text: `Menekan semua tombol keyboard sekaligus dengan cepat`,
          isCorrect: false,
        },
      ],
      explanation: `Hebat! Sebagai programmer cerdas, kita menganalisis alur logika dan urutan perintah untuk menyelesaikan rintangan dengan tepat.`,
    };

    return [
      {
        id: `unit-${category}-1`,
        title: `Teori & Konsep: ${fundamentalConcept}`,
        description: `Konsep ${fundamentalConcept} adalah salah satu fondasi paling penting dalam dunia koding. Komputer adalah mesin yang sangat patuh, namun ia tidak bisa menebak apa yang ada di pikiran kita. Itulah mengapa kita membutuhkan ${fundamentalConcept} agar komputer mengerti instruksi yang harus dijalankannya tanpa ragu!`,
        analogy: `Bayangkan kamu sedang memandu Robot Kibo di dunia ${worldName}. Jika kamu menyuruhnya melompat sebelum ia mendekati rintangan, Kibo bisa menabrak. Sama seperti kehidupan sehari-hari, kita harus memahami aturan dan urutan agar segala sesuatu berjalan dengan rapi.`,
        deepExplanation: `Dalam koding, ${fundamentalConcept} membantu kita merancang instruksi yang jelas dan terarah. Setiap baris kode yang kamu tulis akan diproses oleh komputer secara pasti, sehingga aplikasi atau game yang kamu buat berjalan lancar tanpa kebingungan.`,
        codePattern: "",
        miniQuiz: null,
      },
      {
        id: `unit-${category}-2`,
        title: `Contoh Kode & Cara Kerjanya`,
        description: `Perhatikan blok kode di bawah ini yang digunakan Robot Kibo di dunia ${worldName}:`,
        analogy: "",
        deepExplanation: "",
        codePattern: sampleCodePattern,
        codeExplanation: `Pada contoh kode di atas, Robot Kibo menjalankan perintah secara terstruktur. Komputer akan membaca perintah dari blok pertama, memproses kondisinya, lalu melanjutkan ke blok berikutnya hingga target tercapai. Dengan cara ini, kode menjadi rapi dan mudah dibaca oleh siapa saja!`,
        tips: `Tips Cerdas Robot Kibo: Selalu periksa kembali setiap baris kodemu. Jika ada langkah yang terlewat, jangan khawatir! Debugging atau memperbaiki kode adalah bagian paling seru dari menjadi seorang programmer!`,
        miniQuiz: null,
      },
      {
        id: `unit-${category}-3`,
        title: `Kuis Tantangan Pemahaman`,
        description: `Uji pemahamanmu setelah mempelajari teori di Hal. 1 dan contoh kode di Hal. 2:`,
        analogy: "",
        deepExplanation: "",
        codePattern: "",
        miniQuiz: {
          question: q1.question,
          options: q1.options,
          explanation: q1.explanation,
          questions: [q1, q2, q3],
        },
        quizQuestions: [q1, q2, q3],
      },
    ];
  }
}

export const aiService = new AIService();
