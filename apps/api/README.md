# **@kibcode/api — Backend Server**

Backend REST API untuk platform **KibCode** yang dibangun menggunakan framework **Fastify** dan **TypeScript**. Bertindak sebagai penyedia logika bisnis, orkestrasi kurikulum koding, autentikasi siswa, integrasi AI, serta penghubung tunggal ke database **Neon (PostgreSQL Serverless)**.

---

## 🏗️ Arsitektur & Prinsip Desain

- **Fastify High Performance**: Menghadirkan respon API dengan latensi minimal dan overhead memori rendah.
- **Layered Clean Architecture**:
  - `routes/`: Deklarasi endpoint, skema URL, dan registrasi pre-handler plugin.
  - `controllers/`: Penanganan request/response, ekstraksi parameter, dan formatting status HTTP.
  - `services/`: Inti logika bisnis, pemanggilan AI Gemini, kalkulasi gamifikasi, dan eksekusi query data.
  - `plugins/`: Integrasi eksternal (CORS, JWT Authentication, Prisma Database).
- **Zod Input Validation**: Semua input dari klien divalidasi secara ketat sebelum diproses oleh sistem.
- **Prisma & Neon Integration**: Akses data sepenuhnya melalui `@kibcode/database` yang tersambung ke **Neon PostgreSQL**. Tidak ada duplikasi Prisma Client di dalam backend.
- **Shared DTOs**: Tipe data request/response memakai `@kibcode/types`.

---

## 🤖 Integrasi AI: Google Gemini (Flash Models)

Backend mengintegrasikan Google Gemini melalui `AIService` untuk menghasilkan konten edukasi yang dinamis, adaptif, dan ramah anak:

1. **Dynamic Game Generation (`generateCodingGame`)**:
   - Menghasilkan track game edukasi koding unik (10 soal per game) berbasis profil siswa (50% materi fundamental koding SD + 50% preferensi minat siswa seperti game, luar angkasa, sains, atau hewan).
   - Menghasilkan narasi soal cerita bertahap, blok visual kode, pilihan jawaban logis, dan penjelasan interaktif.
2. **AI Learning Modules (`generateLearningModule`)**:
   - Menghasilkan unit-unit modul pembelajaran terstruktur 3 halaman dengan analogi kehidupan sehari-hari anak SD, tips koding Kibo, dan kuis pemahaman konsep.
   - Hasil generasi modul di-cache langsung di tabel database **Neon** (`LearningModule`) agar tidak menguras kuota API dan dapat diakses instan pada kunjungan berikutnya.
3. **AI Tutor Robot Kibo (`chatWithTutor`)**:
   - Asisten AI pintar ramah anak dengan *guardrail* edukatif (tidak pernah memberikan jawaban koding langsung secara mentah, melainkan membimbing langkah demi langkah).
   - Riwayat sesi obrolan disimpan di tabel **Neon** (`TutorSession` & `TutorMessage`) dan dapat di-reset kapan saja oleh siswa.
4. **Resilient Fallback Mechanism**:
   - Jika terjadi kendala kuota rate limit atau kegagalan jaringan eksternal ke Gemini, backend secara cerdas beralih ke *fallback catalog* terstruktur ([gameFallbackData.ts](src/services/gameFallbackData.ts)) sehingga siswa tetap dapat belajar tanpa gangguan (*zero-downtime learning*).

---

## 🗂️ Struktur Direktori

```bash
apps/api/
├── src/
│   ├── index.ts                     # Entry point server Fastify
│   ├── server.ts                    # Registrasi plugin, middleware, & route aggregators
│   ├── routes/
│   │   ├── auth.ts                  # /api/auth (register, login, refresh)
│   │   ├── students.ts              # /api/students (me, onboarding, tutor chat, reset session)
│   │   ├── games.ts                 # /api/games (katalog game, detail kuis, submit skor)
│   │   ├── progress.ts              # /api/progress (riwayat belajar & leaderboard)
│   │   ├── curriculum.ts            # /api/curriculum (modul pembelajaran berjenjang)
│   │   └── health.ts                # /api/health (healthcheck server)
│   ├── controllers/
│   │   ├── studentController.ts     # Penanganan data profil & tutor
│   │   ├── gameController.ts        # Penanganan permainan & jawaban
│   │   └── progressController.ts    # Penanganan metrik perkembangan
│   ├── services/
│   │   ├── aiService.ts             # Orkestrasi Google Gemini API
│   │   ├── gameFallbackData.ts      # Bank 10 soal fallback terstruktur per kategori
│   │   ├── curriculumService.ts     # Engine kurikulum & caching modul Neon
│   │   ├── gameService.ts           # Logika game & penyimpanan riwayat
│   │   └── studentService.ts        # Autentikasi & manajemen akun
│   ├── plugins/
│   │   ├── db.ts                    # Registrasi Prisma client (@kibcode/database)
│   │   ├── jwt.ts                   # JWT authentication handler
│   │   └── cors.ts                  # Fastify CORS configuration
│   └── utils/
│       ├── logger.ts                # Logger Pino terstruktur
│       └── validators.ts            # Schema Zod validator
├── .env.example                     # Dokumentasi konfigurasi environment
├── package.json
└── tsconfig.json
```

---

## 🔌 Endpoint API Utama

### 1. Autentikasi (`/api/auth`)
- `POST /api/auth/register`: Mendaftarkan akun siswa baru.
- `POST /api/auth/login`: Masuk akun dan menerima *access token* & *refresh token*.
- `POST /api/auth/refresh`: Memperbarui token kadaluwarsa melalui *refresh token rotation*.

### 2. Siswa & Onboarding (`/api/students`)
- `GET /api/students/me`: Mengambil data profil siswa yang sedang login.
- `POST /api/students/onboarding`: Menyimpan preferensi belajar, minat, dan kelas SD siswa.
- `POST /api/students/tutor/chat`: Mengirim pesan tanya jawab koding ke Robot Kibo AI.
- `DELETE /api/students/tutor/session`: Menghapus sesi percakapan aktif untuk memulai obrolan baru.

### 3. Game Edukasi (`/api/games`)
- `GET /api/games/tracks`: Mengambil daftar 6 game edukasi yang dipersonalisasi oleh AI.
- `GET /api/games/:gameId`: Mengambil detail game, narasi tantangan, dan daftar pertanyaan kuis.
- `POST /api/games/:gameId/submit`: Mengirim jawaban kuis, kalkulasi bintang, akurasi, dan waktu pengerjaan.

### 4. Modul Belajar (`/api/curriculum`)
- `GET /api/curriculum/modules`: Mengambil seluruh modul belajar terstruktur berbasis AI (dengan Neon DB caching).
- `GET /api/curriculum/modules/:category`: Mengambil detail unit modul untuk topik tertentu.

### 5. Progres & Statistik (`/api/progress`)
- `GET /api/progress/summary`: Mengambil total bintang, level petualang, streak harian, dan total game selesai.

---

## ⚙️ Konfigurasi Environment (`.env`)

Buat file `.env` di dalam `apps/api/` dengan menyalin file `.env.example`:

```env
# Database (from Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# JWT Secret (minimum 32 characters)
JWT_SECRET=super-secret-jwt-key-change-this-in-production

# Server Port
PORT=3001

# CORS Allowed Origin
CORS_ORIGIN=http://localhost:3000

# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🚀 Menjalankan Server Lokal

Jalankan perintah berikut dari root monorepo:

```bash
# Menjalankan backend dalam mode watch/development
pnpm --filter @kibcode/api dev

# Build ke file Javascript (dist/)
pnpm --filter @kibcode/api build

# Type check TypeScript
pnpm --filter @kibcode/api check-types
```