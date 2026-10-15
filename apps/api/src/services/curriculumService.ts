import type { PrismaClient } from "@kibcode/database";
import type { GameDTO, GameCategory } from "@kibcode/types";
import {
  buildBalancedPromptContext,
  type StudentCurriculumProfile,
  type CurriculumCategory,
} from "@kibcode/utils";
import { aiService } from "./aiService.js";

export class CurriculumService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Generates a tailored 5-track coding game curriculum for a student
   * Starts immediately after onboarding becomes true.
   * Balances 50% Fundamental Coding with 50% Student Personal Preference.
   */
  async generateGamesTrackForStudent(studentId: string): Promise<GameDTO[]> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const profile: StudentCurriculumProfile = {
      grade: student.grade,
      schoolName: student.schoolName,
      hasCodingExp: student.hasCodingExp,
      codingExpLevel: student.codingExpLevel,
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
    };

    // The 6 core coding pillars for children
    const categories: Array<"logic" | "loops" | "conditionals" | "variables" | "debugging" | "algorithms"> = [
      "logic",
      "loops",
      "conditionals",
      "variables",
      "debugging",
      "algorithms",
    ];

    const generatedGames: GameDTO[] = [];

    // Check if the student already has generated games to avoid duplicating tracks
    const existingGames = await this.prisma.game.findMany({
      where: { studentId },
      orderBy: { difficulty: "asc" },
    });

    if (existingGames.length >= categories.length) {
      return existingGames.map((g) => ({
        id: g.id,
        title: g.title,
        category: g.category as GameCategory,
        difficulty: g.difficulty,
        description: g.description,
        questions: (g.questions as any) || undefined,
        studentId: g.studentId,
      }));
    }

    // Determine missing categories so we only generate what's needed
    const existingCategories = new Set(existingGames.map((g) => g.category));
    const categoriesToGenerate = categories.filter((c) => !existingCategories.has(c));

    for (const category of categoriesToGenerate) {
      const balancedContext = buildBalancedPromptContext(profile, "games", category);

      // Generate the game via Gemini with the 50:50 prompt context
      const gameData = await aiService.generateCodingGame({
        topic: balancedContext.topicName,
        category,
        grade: profile.grade,
        difficulty: balancedContext.pedagogy.suggestedDifficulty,
      });

      // Persist directly to Neon DB tied to this student
      const savedGame = await this.prisma.game.create({
        data: {
          title: gameData.title,
          category: gameData.category,
          difficulty: gameData.difficulty,
          description: gameData.description,
          questions: gameData.questions as any,
          studentId: student.id,
        },
      });

      generatedGames.push({
        id: savedGame.id,
        title: savedGame.title,
        category: savedGame.category as GameCategory,
        difficulty: savedGame.difficulty,
        description: savedGame.description,
        questions: (savedGame.questions as any) || undefined,
        studentId: savedGame.studentId,
      });
    }

    // Return all games for this student (existing + newly generated)
    const allGames = await this.prisma.game.findMany({
      where: { studentId },
      orderBy: { difficulty: "asc" },
    });

    return allGames.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category as GameCategory,
      difficulty: g.difficulty,
      description: g.description,
      questions: (g.questions as any) || undefined,
      studentId: g.studentId,
    }));
  }

  /**
   * Extensible Global Content Engine: Returns rich AI-generated learning modules for "Modul Belajar".
   * Caches results in the LearningModule DB table per student+category.
   * On first visit: generates all 6 via Gemini. On subsequent visits: returns from DB instantly.
   */
  async generateLearningModulesForStudent(studentId: string): Promise<any[]> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const profile: StudentCurriculumProfile = {
      grade: student.grade,
      schoolName: student.schoolName,
      hasCodingExp: student.hasCodingExp,
      codingExpLevel: student.codingExpLevel,
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
    };

    const targetCategories: CurriculumCategory[] = [
      "logic",
      "loops",
      "conditionals",
      "variables",
      "debugging",
      "algorithms",
    ];

    const categoryMeta: Record<CurriculumCategory, { icon: string; badgeColor: string }> = {
      logic: { icon: "🧩", badgeColor: "blue" },
      loops: { icon: "🔄", badgeColor: "amber" },
      conditionals: { icon: "⚡", badgeColor: "purple" },
      variables: { icon: "📦", badgeColor: "teal" },
      debugging: { icon: "🐛", badgeColor: "rose" },
      algorithms: { icon: "🧭", badgeColor: "emerald" },
      functions: { icon: "⚡", badgeColor: "purple" },
      events: { icon: "🎮", badgeColor: "indigo" },
      game_design: { icon: "🚀", badgeColor: "rose" },
    };

    // The 18 comprehensive learning module tracks for elementary students
    const eighteenTracks: Array<{
      trackKey: string;
      order: number;
      category: CurriculumCategory;
      difficulty: number;
      title: string;
      concept: string;
      summary: string;
      sampleCodePattern: string;
      starsReward: number;
    }> = [
      {
        trackKey: "logic-1",
        order: 1,
        category: "logic",
        difficulty: 1,
        title: "Sekuensial: Langkah Berurutan Kibo",
        concept: "Urutan Instruksi Komputer (Sequence)",
        summary: "Pahami bagaimana komputer membaca instruksi satu demi satu dari atas ke bawah agar robot tidak salah langkah.",
        sampleCodePattern: "[Maju 1 Langkah] -> [Maju 1 Langkah] -> [Ambil Bintang Emas]",
        starsReward: 60,
      },
      {
        trackKey: "logic-2",
        order: 2,
        category: "logic",
        difficulty: 2,
        title: "Sekuensial: Alur Eksekusi & Pemetaan Jalur",
        concept: "Pemetaan Alur Langkah Majemuk",
        summary: "Rancang jalur yang lebih menantang dengan kombinasi maju, belok, dan aksi interaktif yang rapi.",
        sampleCodePattern: "Maju(2);\nBelokKanan();\nMaju(1);\nBukaPintu();",
        starsReward: 70,
      },
      {
        trackKey: "loops-1",
        order: 3,
        category: "loops",
        difficulty: 1,
        title: "Perulangan: Pola Gerak Berulang Cerdas",
        concept: "Perulangan Tetap (Fixed Repeat Loop)",
        summary: "Gunakan blok Ulangi agar tidak perlu mengetik perintah yang sama berulang kali.",
        sampleCodePattern: "Ulangi 4 kali {\n  Maju 1 Langkah;\n  Ambil Koin;\n}",
        starsReward: 60,
      },
      {
        trackKey: "loops-2",
        order: 4,
        category: "loops",
        difficulty: 2,
        title: "Perulangan: Pencacah Nilai & Loop Berhitung",
        concept: "Loop Pencacah (Counter Loop)",
        summary: "Belajar membuat perulangan dengan hitungan langkah yang dinamis untuk menjelajahi labirin.",
        sampleCodePattern: "untuk (langkah = 1; langkah <= 5; langkah++) {\n  LompatKotak(langkah);\n}",
        starsReward: 75,
      },
      {
        trackKey: "conditionals-1",
        order: 5,
        category: "conditionals",
        difficulty: 1,
        title: "Percabangan: Keputusan Logika Jika-Maka",
        concept: "Percabangan Logika Sederhana (If-Else)",
        summary: "Ajari Robot Kibo memilih tindakan yang tepat saat mendeteksi rintangan atau jalan terbuka.",
        sampleCodePattern: "JIKA (ada_rintangan_depan) {\n  LompatRintangan();\n} LAINNYA {\n  Maju_1_Langkah();\n}",
        starsReward: 60,
      },
      {
        trackKey: "conditionals-2",
        order: 6,
        category: "conditionals",
        difficulty: 2,
        title: "Percabangan: Multi-Kondisi & Logika Sensor",
        concept: "Percabangan Bertingkat (If - Else If - Else)",
        summary: "Program robot agar mampu mengambil beberapa keputusan berbeda sesuai warna lampu atau sensor.",
        sampleCodePattern: "JIKA (warna == 'MERAH') {\n  Berhenti();\n} JIKA_LAIN (warna == 'KUNING') {\n  PelanPelan();\n} LAINNYA {\n  MajuCepat();\n}",
        starsReward: 80,
      },
      {
        trackKey: "variables-1",
        order: 7,
        category: "variables",
        difficulty: 1,
        title: "Variabel: Kotak Memori & Skor Bintang",
        concept: "Penyimpanan Nilai Data (Variables)",
        summary: "Kenalkan kotak memori ajaib untuk menyimpan skor, nama, dan jumlah nyawa pemain.",
        sampleCodePattern: "Kotak_Skor = 0;\nAmbilBintang();\nKotak_Skor = Kotak_Skor + 10;",
        starsReward: 60,
      },
      {
        trackKey: "variables-2",
        order: 8,
        category: "variables",
        difficulty: 2,
        title: "Variabel: Operasi Nilai & Status Karakter",
        concept: "Pembaruan Status & Kalkulasi Variabel",
        summary: "Pelajari bagaimana variabel nilai nyawa berkurang saat terkena rintangan dan bertambah saat menemukan hati.",
        sampleCodePattern: "Nyawa = 3;\nKenaJebakan();\nNyawa = Nyawa - 1;\ncekStatus(Nyawa);",
        starsReward: 75,
      },
      {
        trackKey: "debugging-1",
        order: 9,
        category: "debugging",
        difficulty: 1,
        title: "Detektif Bug: Menemukan Perintah yang Hilang",
        concept: "Identifikasi Kesalahan Kode (Debugging Syntax)",
        summary: "Latih ketelitianmu menjadi detektif koding untuk menemukan perintah yang salah tempat atau hilang.",
        sampleCodePattern: "// Bug: Robot salah belok!\nPerbaiki: BelokKanan() -> BelokKiri();\nMaju 2 Langkah;",
        starsReward: 65,
      },
      {
        trackKey: "debugging-2",
        order: 10,
        category: "debugging",
        difficulty: 2,
        title: "Detektif Bug: Mengatasi Loop Tanpa Henti",
        concept: "Pelacakan Bug Logika & Infinite Loop",
        summary: "Cari tahu penyebab robot bergerak berputar terus menerus dan berikan kondisi batas agar program berhenti dengan rapi.",
        sampleCodePattern: "Ulangi SELAMANYA { ... } // Bahaya!\nPerbaiki menjadi: Ulangi 3 kali { ... }",
        starsReward: 80,
      },
      {
        trackKey: "algorithms-1",
        order: 11,
        category: "algorithms",
        difficulty: 1,
        title: "Algoritma: Dekomposisi Tantangan Bertahap",
        concept: "Pemecahan Masalah Menjadi Langkah Kecil (Decomposition)",
        summary: "Pecah misi besar membangun game menjadi 3 langkah mudah yang teratur dan terencana.",
        sampleCodePattern: "Langkah 1: Siapkan Bahan -> Langkah 2: Rakit Rangka -> Langkah 3: Nyalakan Mesin",
        starsReward: 70,
      },
      {
        trackKey: "algorithms-2",
        order: 12,
        category: "algorithms",
        difficulty: 2,
        title: "Algoritma: Optimasi & Pencarian Jalur Terbaik",
        concept: "Efisiensi Langkah Komputasi (Optimization)",
        summary: "Bandingkan dua jalur berbeda dan pilih jalur dengan jumlah langkah paling sedikit dan hemat energi.",
        sampleCodePattern: "Jalur A = 5 langkah;\nJalur B = 9 langkah;\npilihJalur(Jalur A); // Paling efisien!",
        starsReward: 85,
      },
      {
        trackKey: "functions-1",
        order: 13,
        category: "functions",
        difficulty: 2,
        title: "Fungsi: Blok Mandiri Tanpa Pengulangan",
        concept: "Modularitas Kode & Pemanggilan Fungsi (Functions)",
        summary: "Kelompokkan gerakan tarian Kibo ke dalam satu fungsi agar bisa dipanggil berkali-kali dengan satu kata.",
        sampleCodePattern: "fungsi lompatGembira() {\n  TekukKaki();\n  LompatTinggi();\n}\n\nlompatGembira();",
        starsReward: 75,
      },
      {
        trackKey: "functions-2",
        order: 14,
        category: "functions",
        difficulty: 3,
        title: "Fungsi: Parameter & Kembalian Nilai",
        concept: "Fungsi dengan Input Parameter (Parameters & Return)",
        summary: "Beri nilai tambahan ke dalam fungsi, seperti seberapa jauh robot harus melompat atau berlari.",
        sampleCodePattern: "fungsi lariCepat(meter) {\n  kecepatan = meter * 2;\n  bergerak(kecepatan);\n}\n\nlariCepat(10);",
        starsReward: 90,
      },
      {
        trackKey: "events-1",
        order: 15,
        category: "events",
        difficulty: 2,
        title: "Event: Sensor Tombol Keyboard & Spasi",
        concept: "Deteksi Aksi Input Pengguna (Event Listener)",
        summary: "Buat karakter bereaksi seketika saat tombol panah atau tombol spasi ditekan oleh pemain.",
        sampleCodePattern: "saatTombolDitekan('SPASI', () => {\n  kiboMelompat();\n  suaraTing();\n});",
        starsReward: 75,
      },
      {
        trackKey: "events-2",
        order: 16,
        category: "events",
        difficulty: 3,
        title: "Event: Sensor Tabrakan & Respons Realtime",
        concept: "Deteksi Benturan & Interaksi Objek (Collision Event)",
        summary: "Program respons seru saat robot menyentuh koin emas atau menabrak rintangan balon udara.",
        sampleCodePattern: "saatMenyentuh('Koin_Emas', (objek) => {\n  tambahSkor(10);\n  hilangkan(objek);\n});",
        starsReward: 90,
      },
      {
        trackKey: "game_design-1",
        order: 17,
        category: "game_design",
        difficulty: 2,
        title: "Game Design: Merakit Game Loop Petualangan",
        concept: "Arsitektur Putaran Utama Game (Game Loop)",
        summary: "Gabungkan variabel skor, event tombol, dan pergerakan karakter menjadi satu game mini yang seru dimainkan.",
        sampleCodePattern: "gameLoop(() => {\n  perbaruiPosisi();\n  gambarLayar();\n  cekKemenangan();\n});",
        starsReward: 85,
      },
      {
        trackKey: "game_design-2",
        order: 18,
        category: "game_design",
        difficulty: 3,
        title: "Game Design: Integrasi Mekanik & Bos Glitch",
        concept: "Arsitektur Game Lengkap & State Kemenangan",
        summary: "Rancang level klimaks: hadapi Bos Glitch dengan timer hitung mundur dan layar perayaan piala kemenangan!",
        sampleCodePattern: "jika (skor >= 100 && bosKalah) {\n  tampilkanPiala();\n  mainkanMusikMenang();\n}",
        starsReward: 100,
      },
    ];

    // Fetch any already-cached modules for this student
    const cachedModules = await (this.prisma as any).learningModule.findMany({
      where: { studentId },
      orderBy: { createdAt: "asc" },
    });

    const cachedByCategory = new Map<string, any>(
      cachedModules.map((m: any) => [m.category, m.data])
    );

    const resultModules: any[] = [];

    for (const track of eighteenTracks) {
      const meta = categoryMeta[track.category] || { icon: "🧩", badgeColor: "blue" };
      const balanced = buildBalancedPromptContext(profile, "modules", track.category);

      // Use cached version if available
      if (cachedByCategory.has(track.trackKey)) {
        const cached = cachedByCategory.get(track.trackKey);
        resultModules.push({
          id: `module-${track.trackKey}`,
          order: track.order,
          category: track.category,
          icon: meta.icon,
          badgeColor: meta.badgeColor,
          difficulty: track.difficulty,
          starsReward: track.starsReward,
          theme: balanced.interest.themeContext,
          world: balanced.interest.worldName,
          ...cached,
        });
        continue;
      }

      // If old single-category cache exists (e.g. "logic" for track "logic-1"), use it
      if (cachedByCategory.has(track.category) && track.trackKey.endsWith("-1")) {
        const cached = cachedByCategory.get(track.category);
        resultModules.push({
          id: `module-${track.trackKey}`,
          order: track.order,
          category: track.category,
          icon: meta.icon,
          badgeColor: meta.badgeColor,
          difficulty: track.difficulty,
          starsReward: track.starsReward,
          theme: balanced.interest.themeContext,
          world: balanced.interest.worldName,
          ...cached,
        });
        continue;
      }

      // Prepare rich 3-unit module content (Hal 1, Hal 2, Hal 3 with 3 questions)
      const moduleContent = {
        order: track.order,
        title: track.title,
        concept: track.concept,
        summary: track.summary,
        starsReward: track.starsReward,
        units: [
          {
            id: `unit-${track.trackKey}-1`,
            title: `Teori & Konsep: ${track.concept}`,
            description: `Dalam koding, ${track.concept} adalah fondasi penting yang memungkinkan komputer bekerja secara konsisten. Komputer menjalankan instruksi dengan ketelitian tinggi, sehingga pemahaman tentang konsep ini akan membantumu merancang alur program yang tertib.`,
            analogy: `Bayangkan kamu sedang memandu Robot Kibo di dunia ${balanced.interest.worldName}. Setiap perintah yang kamu susun menentukan apakah Kibo berhasil mengumpulkan bintang atau tersesat di labirin rintangan!`,
            deepExplanation: `Saat program dieksekusi, komputer memproses baris instruksi satu demi satu. Dengan menerapkan ${track.concept}, kita memastikan bahwa setiap proses komputasi terjadi pada waktu dan urutan yang tepat.`,
            codePattern: "",
            miniQuiz: null,
          },
          {
            id: `unit-${track.trackKey}-2`,
            title: `Contoh Kode & Cara Kerjanya`,
            description: `Amati contoh blok instruksi berikut yang dirancang khusus untuk Robot Kibo di dunia ${balanced.interest.worldName}:`,
            analogy: "",
            deepExplanation: "",
            codePattern: track.sampleCodePattern,
            codeExplanation: `Kode di atas mendemonstrasikan penerapan ${track.concept}. Komputer membaca blok perintah ini, mengecek nilai dan kondisinya, kemudian menjalankan aksi fisik robot sesuai baris yang ditentukan.`,
            tips: `Tips Cerdas Robot Kibo: Selalu periksa kembali susunan perintah kodemu. Jika ada rintangan yang belum terselesaikan, lakukan debugging secara perlahan baris demi baris! ⭐`,
            miniQuiz: null,
          },
          {
            id: `unit-${track.trackKey}-3`,
            title: `Kuis Tantangan Pemahaman`,
            description: `Uji pemahamanmu setelah mempelajari materi teori di Hal. 1 dan pola kode di Hal. 2:`,
            analogy: "",
            deepExplanation: "",
            codePattern: "",
            miniQuiz: {
              question: `Apa tujuan utama dari memahami konsep ${track.concept} dalam koding?`,
              options: [
                {
                  id: "A",
                  text: `Agar program berjalan teratur, logis, dan komputer dapat mengeksekusinya tanpa error`,
                  isCorrect: true,
                },
                {
                  id: "B",
                  text: `Hanya untuk membuat teks kode terlihat panjang di layar`,
                  isCorrect: false,
                },
                {
                  id: "C",
                  text: `Supaya layar monitor komputer mati otomatis`,
                  isCorrect: false,
                },
              ],
              explanation: `Tepat sekali! Komputer membutuhkan instruksi yang logis dan jelas agar aplikasi dapat berjalan lancar.`,
              questions: [
                {
                  id: "q1",
                  question: `Berdasarkan penjelasan di Hal. 1, apa fungsi utama konsep ${track.concept}?`,
                  options: [
                    {
                      id: "A",
                      text: `Memberikan aturan dan alur yang jelas agar komputer mengeksekusi instruksi dengan benar`,
                      isCorrect: true,
                    },
                    {
                      id: "B",
                      text: `Menghapus semua file penting dari komputer`,
                      isCorrect: false,
                    },
                    {
                      id: "C",
                      text: `Mengganti warna kabel listrik di dalam komputer`,
                      isCorrect: false,
                    },
                  ],
                  explanation: `Benar! Konsep ${track.concept} adalah pondasi penting agar komputer dapat bekerja secara tertib dan akurat.`,
                },
                {
                  id: "q2",
                  question: `Perhatikan contoh kode di Hal. 2. Apa yang dilakukan komputer saat membaca blok kode tersebut?`,
                  options: [
                    {
                      id: "A",
                      text: `Membaca dan memproses setiap baris instruksi secara berurutan sesuai aturan logika`,
                      isCorrect: true,
                    },
                    {
                      id: "B",
                      text: `Mengacak semua perintah sehingga robot melompat tanpa arah`,
                      isCorrect: false,
                    },
                    {
                      id: "C",
                      text: `Menutup program sebelum perintah pertama dijalankan`,
                      isCorrect: false,
                    },
                  ],
                  explanation: `Tepat sekali! Komputer membaca kode baris demi baris secara teratur untuk memastikan aksinya tepat.`,
                },
                {
                  id: "q3",
                  question: `Jika Robot Kibo menghadapi kendala di dunia ${balanced.interest.worldName}, langkah programmer cilik terbaik adalah...`,
                  options: [
                    {
                      id: "A",
                      text: `Menganalisis kesalahan kode (debugging) dan memperbaiki logika perintahnya`,
                      isCorrect: true,
                    },
                    {
                      id: "B",
                      text: `Membiarkan robot terjebak dan tidak melanjutkan tantangan`,
                      isCorrect: false,
                    },
                    {
                      id: "C",
                      text: `Menekan tombol monitor sampai mati`,
                      isCorrect: false,
                    },
                  ],
                  explanation: `Hebat! Menjadi programmer handal berarti pantang menyerah dan teliti dalam mencari serta memperbaiki kesalahan kode.`,
                },
              ],
            },
          },
        ],
      };

      // Persist to DB for instant subsequent loads
      try {
        await (this.prisma as any).learningModule.create({
          data: {
            studentId,
            category: track.trackKey,
            data: moduleContent,
          },
        });
      } catch {
        // ignore unique constraint collisions if already inserted concurrently
      }

      resultModules.push({
        id: `module-${track.trackKey}`,
        category: track.category,
        icon: meta.icon,
        badgeColor: meta.badgeColor,
        difficulty: track.difficulty,
        theme: balanced.interest.themeContext,
        world: balanced.interest.worldName,
        ...moduleContent,
      });
    }

    return resultModules;
  }

  /**
   * Generates the next-level educational module automatically via Gemini AI
   * when a student finishes their current modules (progress fulfilled).
   */
  async generateNextLevelModuleForStudent(studentId: string): Promise<{
    message: string;
    module: any;
    alreadyUnlocked?: boolean;
  }> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const profile: StudentCurriculumProfile = {
      grade: student.grade,
      schoolName: student.schoolName,
      hasCodingExp: true,
      codingExpLevel: "intermediate",
      favoriteInterest: student.favoriteInterest,
      learningGoal: student.learningGoal,
    };

    // Advanced category sequence
    const advancedSequence: Array<{
      category: CurriculumCategory;
      icon: string;
      badgeColor: string;
    }> = [
      { category: "functions", icon: "⚡", badgeColor: "purple" },
      { category: "events", icon: "🎮", badgeColor: "indigo" },
      { category: "game_design", icon: "🚀", badgeColor: "rose" },
    ];

    const cachedModules = await (this.prisma as any).learningModule.findMany({
      where: { studentId },
      orderBy: { createdAt: "asc" },
    });

    const cachedCategories = new Set(cachedModules.map((m: any) => m.category));

    // Pick the next advanced category not yet created
    let nextTrack = advancedSequence.find((track) => !cachedCategories.has(track.category));

    // If all advanced tracks already created, create an interest-based Mastery Masterclass
    if (!nextTrack) {
      const masteryCategory: CurriculumCategory = "algorithms";
      nextTrack = {
        category: masteryCategory,
        icon: "🏆",
        badgeColor: "amber",
      };
    }

    const balanced = buildBalancedPromptContext(profile, "modules", nextTrack.category);

    // Call Gemini AI
    let aiResult: any;
    try {
      aiResult = await aiService.generateLearningModule({
        category: nextTrack.category,
        grade: Math.min(6, (profile.grade || 3) + 1),
        interest: profile.favoriteInterest || "games",
        topicName: `Tingkat Lanjut: ${balanced.fundamental.name}`,
        worldName: balanced.interest.worldName,
        fundamentalConcept: balanced.fundamental.fundamentalConcept,
        sampleCodePattern: balanced.fundamental.sampleCodePattern,
        codingExpLevel: profile.codingExpLevel || undefined,
        learningGoal: profile.learningGoal || undefined,
      });
    } catch {
      aiResult = {
        title: `Tingkat Lanjut: ${balanced.fundamental.name}`,
        concept: balanced.fundamental.fundamentalConcept,
        summary: `Pelajari konsep mahir ${balanced.fundamental.fundamentalConcept} bersama Robot Kibo di dunia ${balanced.interest.worldName}.`,
        units: [],
      };
    }

    const moduleDataToSave = {
      ...aiResult,
      icon: nextTrack.icon,
      badgeColor: nextTrack.badgeColor,
      difficulty: Math.min(6, (profile.grade || 3) + 1),
      theme: "Tingkat Lanjut (Advanced Mastery)",
      world: balanced.interest.worldName,
    };

    // Persist to DB for instant subsequent loads
    const saved = await (this.prisma as any).learningModule.create({
      data: {
        studentId,
        category: nextTrack.category,
        data: moduleDataToSave,
      },
    });

    const fullModule = {
      id: `module-${nextTrack.category}-${saved.id}`,
      category: nextTrack.category,
      icon: nextTrack.icon,
      badgeColor: nextTrack.badgeColor,
      difficulty: Math.min(6, (profile.grade || 3) + 1),
      theme: "Tingkat Lanjut (Advanced Mastery)",
      world: balanced.interest.worldName,
      ...moduleDataToSave,
    };

    return {
      message: "Modul tingkat berikutnya berhasil dirakit oleh Gemini AI!",
      module: fullModule,
    };
  }
}
