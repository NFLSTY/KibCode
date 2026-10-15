# **@kibcode/types**

Paket kontrak tipe data (TypeScript DTOs & Interfaces) bersama yang digunakan oleh antarmuka frontend (`apps/web`) dan server backend (`apps/api`) di monorepo **KibCode**.

---

## 🎯 Tujuan & Prinsip

1. **Single Source of Truth (SSOT)**:
   - Menghindari duplikasi deklarasi tipe request/response antara frontend dan backend.
   - Perubahan format API cukup didefinisikan satu kali di paket ini, lalu otomatis terdeteksi oleh sistem type-check di seluruh aplikasi.
2. **Type Safety End-to-End**:
   - Memastikan data yang dikirim oleh Fastify tepat dan valid sesuai ekspektasi komponen React di Next.js.
3. **Zero Runtime Overhead**:
   - Paket ini murni berisi deklarasi tipe data TypeScript (`interface`, `type`, `enum`) tanpa menyertakan kode runtime yang memberatkan bundle.

---

## 📁 Struktur Modul Tipe

```bash
packages/types/
├── src/
│   ├── index.ts           # Barrel export utama seluruh tipe
│   ├── api/
│   │   ├── student.ts     # DTO autentikasi, registrasi, login, & profil siswa
│   │   ├── game.ts        # DTO game edukasi, kuis, pilihan ganda, & submit progress
│   │   ├── progress.ts    # DTO rangkuman statistik bintang, streak, & histori belajar
│   │   ├── module.ts      # DTO modul belajar kurikulum koding SD
│   │   └── tutor.ts       # DTO percakapan Tutor AI Robot Kibo
│   └── database/
│       └── index.ts       # Tipe entitas dasar model database
├── package.json
└── tsconfig.json
```

---

## 📋 Contoh DTO Utama

### 1. Game & Kuis Koding (`GameDTO`, `GameQuestionDTO`)
```typescript
export interface GameQuestionDTO {
  id: string;
  scenario: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface SubmitGameScoreDTO {
  gameId: string;
  score: number;
  accuracy: number;
  timeSpentSeconds: number;
}
```

### 2. Modul Belajar Berbasis AI (`LearningModuleDTO`)
```typescript
export interface LearningModuleDTO {
  id: string;
  category: string;
  title: string;
  description: string;
  units: LearningUnitDTO[];
  gradeLevel: number;
}
```

### 3. Percakapan Tutor AI (`TutorChatRequestDTO`, `TutorChatResponseDTO`)
```typescript
export interface TutorChatRequestDTO {
  message: string;
}

export interface TutorChatResponseDTO {
  reply: string;
  suggestedChips?: string[];
  suggestedAction?: {
    label: string;
    href: string;
  };
}
```

---

## 🚀 Penggunaan

Import tipe yang dibutuhkan di aplikasi web atau backend:

```typescript
// Di frontend apps/web atau backend apps/api
import type { GameDTO, StudentDTO, TutorChatResponseDTO } from "@kibcode/types";
```