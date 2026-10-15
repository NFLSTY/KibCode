# **KibCode — Coding Web Education for Kids (SD)**

> **Tema Kompetisi**: Innovating Education Through Technology  
> **Subtema**: Coding Web Education for Kids (untuk anak SD usia 7–12 tahun)  
> **Ajang**: M-ONE Telkomsel Coding Competition (Kategori Umum)

---

## 🌟 Tentang KibCode

**KibCode** adalah platform web edukasi interaktif inovatif yang dirancang khusus untuk memperkenalkan dasar-dasar koding, logika komputasional, dan kecerdasan buatan (AI) kepada siswa Sekolah Dasar di seluruh Indonesia.

Melalui pendekatan pembelajaran adaptif berbasis kecerdasan buatan (**Google Gemini**), KibCode mempersonalisasi setiap lintasan petualangan logika sesuai dengan jenjang kelas dan minat unik masing-masing anak—menjadikan proses belajar koding terasa seperti bermain game yang seru, mendidik, dan menyenangkan.

---

## 🎯 Target Pengguna & Prinsip Desain UI/UX

- **Target Pengguna**: Siswa Sekolah Dasar usia 7–12 tahun (Kelas 1 hingga 6 SD).
- **Desain Taktil Ramah Anak**: Menggunakan tombol 3D membal berbayang tegas (*tactile buttons*), sudut lengkung lembut (*rounded-3xl*), warna-warna cerah berkontras tinggi, dan maskot resmi **Robot Kibo**.
- **Tipografi Ceria**: Kombinasi Google Fonts **Fredoka** (ramah, ekspresif, mudah dikenali anak) dan **Nunito** (nyaman dibaca untuk materi penjelasan).
- **Aman & Bebas Iklan**: Lingkungan belajar bersih tanpa iklan, tanpa tautan luar berbahaya, dan privasi data siswa terlindungi.

---

## 🚀 Fitur Unggulan

1. **Onboarding Cerdas & Adaptif**
   - Menangkap jenjang kelas SD, minat favorit (Game, Sains, Luar Angkasa, Hewan), serta tingkat kemahiran koding awal siswa untuk menyusun materi yang seimbang.
2. **Game Edukasi Koding Berbasis AI**
   - Tantangan logika interaktif (10 soal per game) yang dirancang cerdas oleh AI: mengombinasikan 50% kurikulum fundamental koding SD dengan 50% preferensi minat siswa. Dilengkapi penyimpanan sesi otomatis (dapat melanjutkan dari nomor terakhir jika berhenti di tengah jalan), tinjauan performa Kibo, dan statistik pencapaian bintang (Level 1, 2, 3).
3. **Modul Belajar Koding Berjenjang (18 Modul)**
   - Kurikulum koding bertingkat dengan pola 3 halaman (konsep & analogi dunia nyata, contoh kode interaktif, dan kuis validasi pemahaman dengan syarat kelulusan maksimal 1 kesalahan). Hasil generasi materi di-cache di database **Neon** agar dapat dibuka seketika.
4. **Arena Koding: Pixel Pattern Builder**
   - Ruang praktik logika interaktif di mana anak menyusun blok perintah visual (Maju, Warnai Pixel, Putar, dan Ulangi) untuk melukis pola seni piksel (*pixel art*).
5. **Sahabat AI: Tutor Robot Kibo**
   - Asisten koding ramah anak berbasis LLM yang membimbing siswa memahami logika tanpa membocorkan jawaban langsung, lengkap dengan penyimpanan sesi obrolan yang dapat di-reset kapan saja.
6. **Profil Petualang & Sinkronisasi Avatar Real-Time**
   - Sistem gamifikasi terintegrasi dengan perolehan Bintang Belajar, api *Streak* harian, Level Pangkat Petualang, galeri lencana prestasi, dan pemilihan avatar karakter yang otomatis tersinkronisasi di seluruh aplikasi.

---

## 🛠️ Tech Stack & Ekosistem Monorepo

| Layer | Teknologi | Peran |
| :--- | :--- | :--- |
| **Monorepo** | **pnpm workspace + Turborepo** | Manajemen multi-paket, caching pipeline, dan orkestrasi build cepat |
| **Frontend** | **Next.js 14 (App Router) + TypeScript** | Antarmuka interaktif, SSR/CSR, Tailwind CSS, Lucide Icons |
| **Backend** | **Fastify + TypeScript** | Server REST API performa tinggi, middleware JWT, Zod validation |
| **Database** | **PostgreSQL (Neon Serverless)** | Database cloud serverless dengan pooling koneksi yang aman & cepat |
| **ORM** | **Prisma ORM** | Schema migration, query builder type-safe, dan data modeling |
| **AI Engine** | **Google Gemini (Flash Models)** | Generasi tantangan koding adaptif, modul materi, & asisten Robot Kibo |

---

## 🏛️ Arsitektur Monorepo & Clean Architecture

Platform ini menerapkan prinsip pemisahan tanggung jawab (*Clean Architecture*) secara ketat:

```bash
KibCode/
├── apps/
│   ├── web/                    # Frontend Next.js 14 (App Router)
│   │   ├── app/                # Halaman: landing, games, kurikulum, coding, tutor, profile
│   │   ├── components/         # Komponen taktil 3D ramah anak SD & Kibo mascot
│   │   └── lib/                # Client pemanggil API terisolasi (api-client.ts)
│   └── api/                    # Backend server Fastify
│       ├── src/controllers/    # HTTP controllers
│       ├── src/services/       # Business logic & integrasi Gemini AI (aiService.ts)
│       └── src/routes/         # Endpoint API
├── packages/
│   ├── database/               # Satu-satunya layer akses Prisma ORM ke Neon PostgreSQL
│   ├── types/                  # Single Source of Truth (SSOT) DTOs & TypeScript interfaces
│   ├── utils/                  # Utilitas kalkulasi bintang, XP, Zod validator, & kurikulum
│   ├── typescript-config/      # Konfigurasi TypeScript terpusat (base, nextjs, node)
│   └── eslint-config/          # Standar aturan linting kode
├── pnpm-workspace.yaml         # Definisi workspace monorepo
├── turbo.json                  # Konfigurasi pipeline build & caching Turborepo
└── package.json                # Skrip manajemen root
```

### 🔒 Aturan Arsitektur Penting:
- **Frontend (`apps/web`) dilarang mengakses database secara langsung.** Seluruh interaksi data wajib melewati REST API `apps/api`.
- **Akses Prisma hanya melalui `packages/database`.** Tidak ada inisialisasi Prisma Client ganda di dalam `apps/api`.
- **Kontrak DTO didefinisikan di `packages/types`** dan dipakai bersama oleh frontend dan backend tanpa duplikasi kode.

---

## 🗄️ Database: Neon Serverless PostgreSQL

KibCode menggunakan **Neon (Serverless Postgres)** sebagai penyedia basis data utama:
- Mendukung koneksi berkinerja tinggi melalui *connection pooling* (`sslmode=require`).
- Skema data mencakup akun siswa (`Student`), sesi autentikasi (`StudentSession`), game koding dinamis (`Game`), riwayat progres (`GameProgress`), modul kurikulum (`LearningModule`), dan obrolan tutor (`TutorSession` & `TutorMessage`).
- Seluruh perubahan skema disinkronkan secara aman ke Neon menggunakan perintah `pnpm --filter @kibcode/database db:push`.

---

## 💻 Panduan Instalasi & Menjalankan Proyek Lokal

### 1. Prasyarat Sistem
- **Node.js**: Versi `20.x` atau lebih baru
- **Package Manager**: `pnpm` (versi `9.x` atau lebih baru):
  ```bash
  npm install -g pnpm
  ```
- **Akun Neon PostgreSQL**: Dapatkan connection string database dari [Neon Console](https://console.neon.tech/).
- **Google Gemini API Key**: Dapatkan API key dari [Google AI Studio](https://aistudio.google.com/).

### 2. Kloning Repositori & Instalasi Dependensi
```bash
# Clone repositori
git clone https://github.com/your-username/kibcode.git
cd kibcode

# Install seluruh dependensi monorepo
pnpm install
```

### 3. Konfigurasi Environment Variables

#### A. Konfigurasi Backend (`apps/api/.env`)
Salin file `apps/api/.env.example` menjadi `apps/api/.env`:
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

#### B. Konfigurasi Database (`packages/database/.env`)
Pastikan file `.env` di dalam `packages/database/` memiliki connection string Neon PostgreSQL:
```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

#### C. Konfigurasi Frontend (`apps/web/.env.local` - Opsional)
Secara default `apps/web` telah mengarahkan request ke `http://localhost:3001`. Jika ingin menyesuaikan endpoint API secara manual:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Sinkronisasi Skema Database ke Neon
Dorong skema Prisma langsung ke database Neon dan generate Prisma Client:
```bash
# Push skema ke database Neon
pnpm --filter @kibcode/database db:push

# Generate client Prisma terbaru
pnpm --filter @kibcode/database db:generate

# (Opsional) Mengisi data awal kurikulum dan demo
pnpm --filter @kibcode/database db:seed
```

### 5. Menjalankan Aplikasi Secara Bersamaan
Jalankan dev server frontend dan backend secara paralel melalui Turborepo:
```bash
pnpm dev
```

Aplikasi akan otomatis aktif pada:
- **Frontend (Web)**: `http://localhost:3000`
- **Backend (API)**: `http://localhost:3001`
- **Healthcheck API**: `http://localhost:3001/api/health`

### 6. Panduan Deployment Produksi (Platform-Agnostik)

KibCode dirancang fleksibel untuk dideploy pada platform cloud pilihanmu (Docker, VPS, PaaS, atau Container Serverless):

#### A. Membangun Bundle Produksi
```bash
# Build seluruh workspace melalui Turborepo
pnpm build
```

#### B. Konfigurasi Environment Produksi
Pastikan variabel lingkungan berikut diset pada platform hosting kamu:

1. **Layanan Backend (`apps/api`)**:
   - `DATABASE_URL`: Connection string Neon PostgreSQL dengan SSL (`postgresql://...?sslmode=require`).
   - `JWT_SECRET`: String acak aman minimal 32 karakter untuk penandatanganan token JWT.
   - `PORT`: Port yang disediakan platform (default: `3001`, server otomatis mengikat ke `0.0.0.0`).
   - `CORS_ORIGIN`: Domain publik frontend web produksi kamu (contoh: `https://edukids.com`).
   - `GEMINI_API_KEY`: Kunci API Google Gemini (mendukung round-robin multi-key dengan koma: `key1,key2`).

2. **Layanan Frontend (`apps/web`)**:
   - `NEXT_PUBLIC_API_URL`: URL publik dari layanan backend kamu (contoh: `https://api.edukids.com`). Next.js secara otomatis merutekan panggilan `/api/*` ke URL ini.

#### C. Menjalankan Layanan di Server Produksi
- **Menjalankan Backend**:
  ```bash
  pnpm --filter @kibcode/api start
  # atau langsung: node apps/api/dist/index.js
  ```
- **Menjalankan Frontend**:
  ```bash
  pnpm --filter @kibcode/web start
  ```

---

## 📜 Daftar Skrip Monorepo

| Perintah | Fungsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan seluruh aplikasi (`web` dan `api`) secara bersamaan |
| `pnpm build` | Membangun bundle produksi untuk semua aplikasi dan paket |
| `pnpm check-types` | Melakukan verifikasi tipe TypeScript ketat di seluruh monorepo |
| `pnpm lint` | Menjalankan pemeriksaan ESLint di seluruh workspace |
| `pnpm format` | Menyelaraskan format kode dengan Prettier |
| `pnpm --filter @kibcode/database db:generate` | Membuat skema tabel `schema.prisma` untuk database |
| `pnpm --filter @kibcode/database db:push` | Menyinkronkan model `schema.prisma` ke database **Neon** |
| `pnpm --filter @kibcode/database db:studio` | Membuka antarmuka visual Prisma Studio di peramban |

---

## 📄 Lisensi & Hak Cipta

Dibuat dengan dedikasi penuh untuk **M-ONE Telkomsel Coding Competition**.  
Hak Cipta © 2026 **KibCode**. *Belajar Ceria, Tumbuh Hebat!*
