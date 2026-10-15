# **@kibcode/utils**

Koleksi fungsi utilitas murni, formatters, kalkulator gamifikasi, validasi skema Zod, dan konfigurasi kurikulum koding SD bersama untuk monorepo **KibCode**.

---

## 🎯 Lingkup & Fitur

Paket ini menyediakan fungsi-fungsi terisolasi tanpa efek samping (*pure functions*) yang aman dieksekusi di lingkungan Node.js (backend) maupun browser (frontend).

### 1. Validasi Input (Zod Schemas)
- Validasi data registrasi dan login siswa (format email, panjang password, nama panggilan).
- Validasi wizard onboarding (pilihan minat, pengalaman koding, jenjang kelas SD 1–6).
- Validasi pengiriman jawaban kuis dan percakapan AI Tutor.

### 2. Kalkulasi Gamifikasi & Metrik
- Perhitungan akurasi kuis koding SD: `accuracy = (correct / total) * 100`.
- Penentuan perolehan Bintang (1–3 Bintang) berdasarkan ambang batas akurasi.
- Perhitungan level petualang (`Level = Math.floor(totalStars / 200) + 1`) dan sisa XP ke jenjang berikutnya.
- Logika pelacakan *streak* belajar harian anak.

### 3. Formatters Ramah Anak
- Pemformatan durasi belajar detik ke menit dan detik (`"2m 45d"` atau `"15 Menit"`).
- Pemformatan angka skor ribuan dan penanggalan berbahasa Indonesia (`id-ID`).
- Pembersihan format string judul AI (menghilangkan prefiks redundan seperti *"Tantangan Logika:"*).

### 4. Konfigurasi Kurikulum Global (`curriculumConfig.ts`)
- Standarisasi kategori topik koding anak SD:
  1. **Algoritma & Sekuensial Dasar** (Urutan instruksi harian dan robotik).
  2. **Loop & Perulangan Cerdas** (Pola perulangan berulang yang hemat instruksi).
  3. **Logika Kondisional (If-Else)** (Pengambilan keputusan sensorik).
  4. **Variabel & Wadah Data** (Penyimpanan memori, skor, dan inventori).
  5. **Pengenalan Pola & Berpikir Komputasional** (Menganalisis pola masalah).
  6. **Kecerdasan Buatan (AI) Ramah Anak** (Konsep mesin mengenali objek & data).

---

## 📁 Struktur Direktori

```bash
packages/utils/
├── src/
│   ├── index.ts              # Export sentral seluruh utilitas
│   ├── validators.ts         # Skema validasi Zod
│   ├── formatters.ts         # Fungsi pemformat teks, waktu, & angka
│   ├── calculations.ts       # Logika kalkulasi gamifikasi, XP, & bintang
│   ├── constants.ts          # Nilai konstanta aplikasi
│   └── curriculumConfig.ts   # Konfigurasi topik & kurikulum koding SD
├── package.json
└── tsconfig.json
```

---

## 🚀 Penggunaan

```typescript
import { 
  calculateQuizStars, 
  formatDurationMinutes, 
  CURRICULUM_CATEGORIES 
} from "@kibcode/utils";

// Menghitung bintang kuis
const stars = calculateQuizStars(85); // 3 Bintang

// Menampilkan format durasi
const displayTime = formatDurationMinutes(180); // "3 Menit"
```