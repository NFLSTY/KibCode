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
}

export class AIService {
  private apiKey: string;
  private primaryModel = "gemini-2.5-flash";
  private fallbackModel = "gemini-1.5-flash";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || "";
  }

  private async callGemini(
    prompt: string,
    systemInstruction?: string,
    config?: GeminiGenerationConfig
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

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
      },
    };

    const tryModels = [this.primaryModel, this.fallbackModel];
    let lastError: Error | null = null;

    for (const model of tryModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        // Try fallback model if available
      }
    }

    throw lastError || new Error("Failed to call Gemini API");
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
  "title": "Judul Game Menarik dan Ramah Anak (maks 5 kata)",
  "category": "logic" | "loops" | "conditionals" | "debugging" | "algorithms",
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
Buat tepat 4 soal kuis logika koding interaktif berkualitas tinggi yang mendidik dan menyenangkan!`;

    try {
      const rawJson = await this.callGemini(prompt, systemInstruction, {
        responseMimeType: "application/json",
        temperature: 0.7,
      });

      const parsed = JSON.parse(rawJson);

      return {
        title: parsed.title || `Misi Koding: ${topic}`,
        category: (parsed.category as GameCategory) || requestedCategory,
        difficulty: Number(parsed.difficulty) || difficulty,
        description: parsed.description || "Petualangan koding ceria bersama Kibo!",
        questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      };
    } catch (err) {
      console.warn("Gemini generation fallback triggered:", err);

      // Intelligent Procedural Fallback so app never breaks
      return {
        title: `Tantangan Logika: ${topic}`,
        category: requestedCategory,
        difficulty,
        description: `Bantu si Kibo memecahkan misi koding bertema ${topic} menggunakan urutan blok perintah yang benar!`,
        questions: [
          {
            id: `gen-${Date.now()}-1`,
            storyPrompt: `Robot Kibo sedang menjelajahi arena ${topic}. Kibo perlu melangkah 3 kali ke depan untuk sampai ke target.`,
            question: "Manakah perintah koding yang paling tepat dan hemat?",
            codeSnippet: "// Arena: " + topic + "\nUlangi 3 kali {\n  Maju 1 Langkah;\n}",
            options: [
              { id: "A", label: "A", text: "Ulangi 3 kali: [Maju 1 Langkah]", isCorrect: true },
              { id: "B", label: "B", text: "Mundur 3 kali", isCorrect: false },
              { id: "C", label: "C", text: "Belok Kiri 5 kali", isCorrect: false },
              { id: "D", label: "D", text: "Diam tanpa bergerak", isCorrect: false },
            ],
            explanation: "Perulangan 3 kali menjalankan perintah maju secara teratur dan efisien!",
          },
          {
            id: `gen-${Date.now()}-2`,
            storyPrompt: `Di jalur ${topic}, sensor mendeteksi dinding di depan Kibo. Jalan aman ada di sebelah kiri.`,
            question: "Apa instruksi yang harus dijalankan Kibo?",
            codeSnippet: "JIKA (ada_rintangan_depan) {\n  Belok_Kiri();\n}",
            options: [
              { id: "A", label: "A", text: "Belok Kanan", isCorrect: false },
              { id: "B", label: "B", text: "Belok Kiri", isCorrect: true },
              { id: "C", label: "C", text: "Lompat menabrak dinding", isCorrect: false },
              { id: "D", label: "D", text: "Matikan sistem", isCorrect: false },
            ],
            explanation: "Belok Kiri mengarahkan robot menjauhi rintangan dan melanjutkan perjalanan!",
          },
        ],
      };
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
      });
      const parsed = JSON.parse(rawJson);
      return {
        hint: parsed.hint || "Pikirkan urutan langkahnya dari awal ya! Kamu pasti bisa!",
      };
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
      });
      const parsed = JSON.parse(rawJson);
      return {
        message: parsed.message || "Hebat sekali usahamu di petualangan koding kali ini!",
        tip: parsed.tip || "Terus latih logikamu dengan mencoba tantangan perulangan berikutnya ya!",
      };
    } catch {
      return {
        message: "Luar biasa! Setiap kali mencoba, kemampuan berpikir logismu makin terasah!",
        tip: "Ingat prinsip koding: periksa baris demi baris secara teliti!",
      };
    }
  }
}

export const aiService = new AIService();
