# **@kibcode/web — Frontend Web Application**

Aplikasi web edukasi interaktif untuk platform **KibCode** yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, dan **Tailwind CSS**. 

Dirancang khusus untuk siswa Sekolah Dasar (usia 7–12 tahun) dengan antarmuka yang ceria, elemen 3D taktil ramah sentuhan, kontras warna yang nyaman, serta maskot resmi **Robot Kibo**.

---

## 🎨 Karakteristik Desain & Target Pengguna SD

- **Tipografi Ramah Anak**: Menggunakan perpaduan font Google Fonts **Fredoka** (untuk judul ceria dan ekspresif) serta **Nunito** (untuk keterbacaan teks yang jelas).
- **Elemen 3D Taktil & Kontras Tinggi**: Tombol dan kartu berbayang tegas (*solid tactile shadow*) dengan animasi klik membal yang memuaskan saat disentuh (*playful tactile feedback*).
- **Bebas Distraksi & 100% Aman**: Tidak mengandung iklan, navigasi dibuat besar dan tidak membingungkan anak-anak.
- **Arsitektur Tanpa Akses Database Langsung**: Frontend tidak pernah menyentuh database secara langsung. Semua data diakses via komunikasi type-safe HTTP ke backend Fastify (`apps/api`) yang terhubung ke **Neon PostgreSQL**.

---

## 🌟 Halaman & Fitur Utama

### 1. **Beranda Interaktif (`/`)**
- Hero banner petualangan dengan maskot SVG Kibo interaktif.
- Demo koding mini interaktif di halaman depan tanpa harus login terlebih dahulu.
- Rangkuman kurikulum 3 tingkat (Pemula, Penjelajah, Ahli Cilik).
- Fitur spotlight Tutor AI dan jaminan keamanan belajar.

### 2. **Wizard Onboarding (`/onboarding`)**
- Kustomisasi profil petualang baru: pemilihan nama panggilan, jenjang kelas SD (1–6), minat favorit (Game, Sains, Luar Angkasa, Hewan), serta tingkat kemahiran koding.
- Menjadi data masukan bagi kecerdasan buatan Gemini untuk mempersonalisasi track tantangan siswa.

### 3. **Dashboard Petualang (`/dashboard`)**
- Sambutan ceria personal sesuai nama dan jenjang kelas siswa.
- Gamifikasi terpadu: pelacak Bintang Belajar, *Streak* harian api menyala, dan Pangkat Petualang (Level).
- Avatar petualang yang tersinkronisasi otomatis dengan pilihan di halaman profil (tersembunyi secara cerdas di layar responsif ponsel karena sudah tampil pada bilah navigasi atas).
- Target mingguan dan rekomendasi misi tantangan harian.

### 4. **Game Edukasi Koding (`/games`)**
- Daftar lintasan koding dinamis hasil generasi AI (10 soal per game) yang disesuaikan dengan preferensi minat siswa.
- Filter kategori koding berbasis ikon Lucide dengan navigasi panah geser horizontal dan opsi urutan cerdas.
- Tombol maskot Kibo interaktif dengan modal statistik penguasaan bintang (Level 1, 2, dan 3).
- Status progres real-time per game card (Selesai X%, Rekor Skor, tombol "Lanjut Main" atau "Main Lagi").

### 5. **Arena Kuis Koding Interaktif (`/games/[gameId]`)**
- 10 tantangan logika koding bertingkat dari observasi konsep, tracing alur kode, hingga pemecahan teka-teki.
- Penyimpanan progres otomatis: jika siswa keluar di tengah kuis, kuis dapat dilanjutkan dari nomor soal terakhir.
- Opsi jawaban kartu taktil interaktif dengan penjelasan edukatif ramah anak di setiap akhir soal.
- Tombol petunjuk pintar Kibo AI (*Ask Kibo AI Hint*) dan papan coretan logika siswa.

### 6. **Modul Belajar Koding (`/kurikulum`)**
- 18 modul kurikulum koding SD berjenjang terstruktur dengan pola 3 halaman (Konsep & Analogi Dunia Nyata, Contoh Kode & Eksplorasi, serta Kuis Validasi Kelulusan).
- Data modul di-cache di database **Neon** melalui backend untuk pemuatan instan.
- Syarat kelulusan kuis modul yang ketat (maksimal 1 kesalahan) untuk membuka modul berikutnya secara berurutan.

### 7. **Arena Koding: Pixel Pattern Builder (`/coding`)**
- Ruang praktik logika koding kreatif di luar kuis pilihan ganda.
- Siswa menuliskan sekuensial instruksi (Maju, Warnai Pixel, Putar Arah, dan Loop Ulangi) untuk mereproduksi pola seni piksel (*pixel art*) pada kanvas interaktif.
- Menumbuhkan pemahaman sekuensial dan perulangan secara visual.

### 8. **Tutor AI Robot Kibo (`/ai-tutor`)**
- Ruang obrolan interaktif bersama Sahabat AI Robot Kibo berlogo resmi Kibo.
- Menjawab pertanyaan koding, logika komputasi, dan tugas sekolah dengan gaya bahasa bersahabat.
- Dilengkapi *chip* saran topik instan dan tombol pembersihan sesi obrolan yang tersinkronisasi ke database **Neon**.

### 9. **Profil Siswa & Koleksi Lencana (`/profile`)**
- Penampil kartu identitas petualang koding.
- Pemilih Avatar Karakter interaktif (Kibo Klasik, Astronot Cilik, Detektif Kode, Gamer Juara, Ilmuwan AI, Singa Pemberani) yang tersinkronisasi ke seluruh bilah navigasi dan dashboard.
- Galeri lencana prestasi koding (Coding, Math, Streak, Adventure).

---

## 🗂️ Struktur Direktori

```bash
apps/web/
├── app/
│   ├── layout.tsx                   # Root layout, Google Fonts (Fredoka & Nunito), provider
│   ├── page.tsx                     # Landing page KibCode
│   ├── onboarding/page.tsx          # Wizard preferensi belajar siswa baru
│   ├── dashboard/page.tsx           # Dashboard utama progres siswa
│   ├── games/
│   │   ├── page.tsx                 # Katalog game edukasi koding
│   │   └── [gameId]/page.tsx        # Arena kuis koding interaktif
│   ├── kurikulum/page.tsx           # Halaman modul belajar kurikulum SD
│   ├── coding/page.tsx              # Arena koding pixel pattern builder
│   ├── ai-tutor/page.tsx            # Ruang chat Tutor AI Robot Kibo
│   ├── profile/page.tsx             # Halaman profil, badge, & ganti avatar
│   ├── login/page.tsx               # Halaman masuk akun siswa
│   └── register/page.tsx            # Halaman daftar akun baru
├── components/
│   ├── ui/                          # Komponen dasar (KiboLogo, Button, Modal, Card)
│   ├── landing/                     # Komponen beranda (Navbar, Hero, Demo, Footer)
│   ├── dashboard/                   # Komponen dashboard (Greeting, Navbar, Stats)
│   ├── catalog/                     # Komponen katalog game & filter kategori
│   ├── quiz/                        # Komponen papan kuis & progress bar
│   └── profile/                     # Komponen profil, badge, & AvatarPickerModal
├── lib/
│   ├── api-client.ts                # Client pemanggil Fastify API yang aman & type-safe
│   └── hooks/                       # Custom hooks (useAuth)
├── public/                          # Aset statis & ikon
├── package.json
└── tsconfig.json
```

---

## ⚙️ Konfigurasi Environment (`.env.local` — Opsional)

Secara bawaan, aplikasi web telah mengarahkan panggilan API ke `http://localhost:3001` (dapat langsung berjalan tanpa file `.env.local`). Jika ingin menentukan URL endpoint backend API Fastify secara manual, buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🚀 Menjalankan Frontend Lokal

Jalankan perintah berikut dari root monorepo:

```bash
# Menjalankan frontend Next.js dev server (http://localhost:3000)
pnpm --filter @kibcode/web dev

# Build produksi
pnpm --filter @kibcode/web build

# Memulai server produksi
pnpm --filter @kibcode/web start

# Verifikasi type check TypeScript
pnpm --filter @kibcode/web check-types
```