# **@kibcode/database**

Paket database terpusat untuk platform **KibCode** yang mengelola skema data, migrasi, dan inisialisasi **Prisma ORM** yang terhubung langsung ke **Neon Serverless PostgreSQL**.

---

## 📌 Prinsip Arsitektur

- **Single Source of Database Access**: Seluruh akses database di monorepo KibCode **hanya** boleh melewati paket ini.
- **Frontend Isolation**: Aplikasi frontend (`apps/web`) dilarang keras mengimpor Prisma atau mengakses database secara langsung.
- **Backend Consumption**: Backend (`apps/api`) mengimpor Prisma Client langsung dari paket `@kibcode/database`.

---

## 🗄️ Koneksi Database: Neon PostgreSQL

Proyek ini memanfaatkan **Neon (Serverless Postgres)** untuk penyimpanan data relasional yang skalabel dan efisien:

- Mendukung arsitektur *serverless* dengan branching database untuk kemudahan pengembangan.
- Menggunakan koneksi *connection pooling* bawaan Neon yang aman (`sslmode=require`).
- Sangat optimal untuk skenario komputasi Fastify dan prisma query engine.

### Format Environment Variable (`.env`)

```env
# Koneksi Neon PostgreSQL (Pooled Connection)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

---

## 📋 Entitas Skema Prisma (`schema.prisma`)

Skema database dirancang khusus untuk kebutuhan edukasi koding anak SD:

1. **`Student`**
   - Menyimpan akun siswa SD: nama, email, password hash, jenjang kelas (Kelas 1–6 SD), preferensi koding, minat favorit, dan flag onboarding.
2. **`StudentSession`**
   - Refresh token rotation session untuk autentikasi JWT yang aman.
3. **`Game`**
   - Katalog game edukasi koding. Game dibuat secara dinamis berbasis AI (Gemini) sesuai minat dan jenjang kelas siswa, dengan fallback materi kurikulum SD.
4. **`GameProgress`**
   - Melacak riwayat permainan siswa: status penyelesaian (`completed`), skor perolehan, akurasi jawaban, total waktu bermain (detik), dan bintang yang diraih.
5. **`TutorSession` & `TutorMessage`**
   - Menyimpan riwayat obrolan sesi interaktif siswa bersama Sahabat Robot Kibo AI. Sesi ini dapat dibersihkan dan diperbarui secara instan saat siswa memulai topik baru.
6. **`LearningModule`**
   - Menyimpan materi belajar koding berbasis AI yang di-cache per kategori dan per siswa di Neon, memastikan waktu muat super cepat tanpa harus memanggil AI berulang kali.

---

## 🚀 Perintah Operasional

Jalankan perintah berikut melalui root monorepo atau di dalam direktori `packages/database`:

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm --filter @kibcode/database db:generate` | Menghasilkan TypeScript Prisma Client terbaru |
| `pnpm --filter @kibcode/database db:push` | Menyinkronkan perubahan skema `schema.prisma` langsung ke database Neon |
| `pnpm --filter @kibcode/database db:seed` | Mengisi data awal master kurikulum dan game dasar ke database Neon |
| `pnpm --filter @kibcode/database db:studio` | Membuka antarmuka visual Prisma Studio di browser |

---

## 💻 Penggunaan dalam Kode Backend

```typescript
import { prisma } from "@kibcode/database";

// Mengambil data profil siswa
const student = await prisma.student.findUnique({
  where: { id: studentId },
  include: { progress: true },
});
```