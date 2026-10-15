# **@kibcode/eslint-config**

Paket konfigurasi standar ESLint terpusat untuk menjaga kualitas, konsistensi gaya kode, dan mencegah potensi bug di seluruh monorepo **KibCode**.

---

## 🎯 Manfaat & Karakteristik

- **Standar Kode Bersih**: Menegakkan aturan penulisan kode modern TypeScript dan JavaScript.
- **Dukungan Next.js & React**: Mengintegrasikan rekomendasi Core Web Vitals, React Hooks rules, dan Next.js best practices.
- **Konfigurasi Modular**: Memisahkan aturan umum dengan aturan khusus framework agar fleksibel dan tidak tumpang tindih.

---

## 📁 Daftar Konfigurasi Tersedia

| File Preset | Cakupan Aturan | Digunakan Oleh |
| :--- | :--- | :--- |
| **`base.js`** | Aturan umum JavaScript & TypeScript, deteksi variabel tak terpakai, formatting | Seluruh proyek monorepo |
| **`next.js`** | Aturan optimasi halaman Next.js, image optimization, link prefetching | `apps/web` |
| **`react-internal.js`** | Aturan siklus hidup React hooks dan penulisan komponen | Paket komponen React |

---

## 🚀 Cara Penggunaan

Gunakan pada file konfigurasi ESLint (`eslint.config.mjs` atau `.eslintrc.js`):

```javascript
import { config } from "@kibcode/eslint-config/base";

export default [
  ...config,
  {
    rules: {
      // Aturan spesifik proyek tambahan
    },
  },
];
```
