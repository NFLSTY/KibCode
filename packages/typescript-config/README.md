# **@kibcode/typescript-config**

Paket konfigurasi dasar TypeScript terpusat untuk seluruh aplikasi dan paket internal di monorepo **KibCode**.

---

## 🎯 Tujuan

- Menjaga keseragaman standar kompilasi TypeScript (`strict mode`, `target`, `module resolution`).
- Mencegah inkonsistensi pengaturan antar paket (`apps/web`, `apps/api`, `packages/database`, dll).
- Memastikan performa *type-checking* secepat mungkin melalui Turborepo caching.

---

## 📁 Daftar Konfigurasi Tersedia

| File Preset | Target Lingkungan | Digunakan Oleh |
| :--- | :--- | :--- |
| **`base.json`** | Pengaturan ketat dasar (ES2022, strict, isolatedModules) | Basis semua konfigurasi & paket utilitas |
| **`nextjs.json`** | Preset Next.js 14 App Router, JSX preserve, DOM libs | `apps/web` |
| **`node.json`** | Preset Node.js runtime, NodeNext module resolution | `apps/api` & `packages/database` |
| **`react-library.json`** | Preset komponen React internal | Paket UI bersama |

---

## 🚀 Cara Penggunaan

Cukup cantumkan pada `tsconfig.json` di aplikasi atau paket terkait menggunakan opsi `extends`:

### 1. Aplikasi Next.js (`apps/web/tsconfig.json`)
```json
{
  "extends": "@kibcode/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### 2. Aplikasi Backend Fastify (`apps/api/tsconfig.json`)
```json
{
  "extends": "@kibcode/typescript-config/node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```
