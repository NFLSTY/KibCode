import { prisma } from "./db.js";

async function main() {
  const codingGames = [
    {
      id: "logic-robot-labirin",
      title: "Petualangan Robot Labirin",
      category: "logic",
      difficulty: 1,
      description:
        "Bantu si Robot Kibo menyusun urutan perintah langkah (Maju, Belok Kanan, Belok Kiri) untuk mengumpulkan bintang di labirin!",
      questions: [
        {
          id: "lrl-1",
          storyPrompt:
            "Robot Kibo berada di petak awal menghadap ke Timur. Di depannya ada 2 petak kosong, lalu sebuah bintang emas.",
          question: "Urutan perintah kode manakah yang tepat agar Kibo berhasil mengambil bintang?",
          codeSnippet: "// Target: Kibo ➔ Bintang ⭐\n[Maju] -> [Maju] -> [Ambil Bintang]",
          options: [
            { id: "A", label: "A", text: "Maju ➔ Maju ➔ Ambil Bintang", isCorrect: true },
            { id: "B", label: "B", text: "Belok Kanan ➔ Maju ➔ Mundur", isCorrect: false },
            { id: "C", label: "C", text: "Maju ➔ Belok Kiri ➔ Maju", isCorrect: false },
            { id: "D", label: "D", text: "Diam di tempat ➔ Ambil Bintang", isCorrect: false },
          ],
          explanation: "Robot Kibo perlu bergerak maju 2 kali lurus ke depan, lalu mengambil bintang emas!",
        },
        {
          id: "lrl-2",
          storyPrompt:
            "Kibo melangkah 1 petak maju, tetapi di depannya ada dinding batu. Jalan terbuka ada di sebelah kanan Kibo.",
          question: "Perintah apa yang harus dijalankan Kibo sebelum melangkah lagi?",
          codeSnippet: "[Maju 1 Langkah] -> [ ??? ] -> [Maju 1 Langkah]",
          options: [
            { id: "A", label: "A", text: "Belok Kiri", isCorrect: false },
            { id: "B", label: "B", text: "Belok Kanan", isCorrect: true },
            { id: "C", label: "C", text: "Lompat ke atas", isCorrect: false },
            { id: "D", label: "D", text: "Mundur 3 petak", isCorrect: false },
          ],
          explanation: "Karena jalan terbuka ada di kanan, Kibo harus memutar badan dengan perintah Belok Kanan!",
        },
        {
          id: "lrl-3",
          storyPrompt: "Dalam koding, menyusun perintah langkah demi langkah secara berurutan disebut...",
          question: "Konsep dasar koding apakah ini?",
          codeSnippet: "Langkah 1 ➔ Langkah 2 ➔ Langkah 3",
          options: [
            { id: "A", label: "A", text: "Sekuensial / Urutan Logika", isCorrect: true },
            { id: "B", label: "B", text: "Menghapus Game", isCorrect: false },
            { id: "C", label: "C", text: "Koneksi Wifi", isCorrect: false },
            { id: "D", label: "D", text: "Tombol Rahasia", isCorrect: false },
          ],
          explanation: "Sekuensial (Sequence) adalah menjalankan instruksi baris per baris secara teratur dari atas ke bawah.",
        },
        {
          id: "lrl-4",
          storyPrompt:
            "Kibo ingin membuat pola jalan berbentuk kotak persegi (4 sisi yang sama panjang).",
          question: "Berapa kali Kibo harus mengulang kombinasi [Maju 1 Langkah] lalu [Belok Kanan]?",
          codeSnippet: "Ulangi ( ... kali ) {\n  Maju 1 Langkah;\n  Belok Kanan;\n}",
          options: [
            { id: "A", label: "A", text: "2 Kali", isCorrect: false },
            { id: "B", label: "B", text: "3 Kali", isCorrect: false },
            { id: "C", label: "C", text: "4 Kali", isCorrect: true },
            { id: "D", label: "D", text: "10 Kali", isCorrect: false },
          ],
          explanation: "Persegi memiliki 4 sisi dan 4 sudut siku-siku, jadi Kibo mengulangnya sebanyak 4 kali!",
        },
      ],
    },
    {
      id: "loops-taman-safari",
      title: "Taman Safari Perulangan",
      category: "loops",
      difficulty: 2,
      description:
        "Hemat baris kodemu menggunakan Perulangan (Loop)! Pelajari cara mengulang perintah tanpa mengetik berkali-kali.",
      questions: [
        {
          id: "lts-1",
          storyPrompt:
            "Kibo menulis kode: Maju, Maju, Maju, Maju, Maju. Kodemu terasa sangat panjang dan membosankan.",
          question: "Bagaimana cara menyederhanakan kode tersebut menggunakan blok Loop?",
          codeSnippet: "// Kode lama:\nMaju; Maju; Maju; Maju; Maju;\n\n// Kode baru yang lebih rapi:",
          options: [
            { id: "A", label: "A", text: "Ulangi 5 kali: [Maju]", isCorrect: true },
            { id: "B", label: "B", text: "Ulangi 2 kali: [Maju]", isCorrect: false },
            { id: "C", label: "C", text: "Hapus semua kode", isCorrect: false },
            { id: "D", label: "D", text: "Ulangi 10 kali: [Mundur]", isCorrect: false },
          ],
          explanation: "Blok Loop 'Ulangi 5 kali [Maju]' menjalankan perintah Maju sebanyak 5 kali secara otomatis dan ringkas!",
        },
        {
          id: "lts-2",
          storyPrompt:
            "Kibo menjalankan kode: Ulangi 3 kali { Kumpulkan 2 Pisang }. Berapa total pisang yang didapat Kibo?",
          question: "Hitung total pisang yang berhasil dikumpulkan robot Kibo!",
          codeSnippet: "loop (3 kali) {\n  ambil_pisang(2);\n}",
          options: [
            { id: "A", label: "A", text: "5 Pisang", isCorrect: false },
            { id: "B", label: "B", text: "6 Pisang", isCorrect: true },
            { id: "C", label: "C", text: "3 Pisang", isCorrect: false },
            { id: "D", label: "D", text: "2 Pisang", isCorrect: false },
          ],
          explanation: "3 kali pengulangan x 2 pisang = 6 pisang terkumpul!",
        },
        {
          id: "lts-3",
          storyPrompt: "Di taman safari, robot Kibo ingin membunyikan klakson 'Tiiit!' setiap kali melihat zebra.",
          question: "Jika ada 4 zebra di sepanjang lintasan, kode loop yang tepat adalah:",
          codeSnippet: "for (zebra = 1; zebra <= 4; zebra++) {\n  bunyikan_klakson();\n}",
          options: [
            { id: "A", label: "A", text: "Ulangi 4 kali: [Bunyikan Klakson]", isCorrect: true },
            { id: "B", label: "B", text: "Ulangi 1 kali: [Bunyikan Klakson]", isCorrect: false },
            { id: "C", label: "C", text: "Matikan Mesin", isCorrect: false },
            { id: "D", label: "D", text: "Belok Kiri 4 kali", isCorrect: false },
          ],
          explanation: "Karena ada 4 zebra, instruksi membunyikan klakson dijalankan berulang sebanyak 4 kali.",
        },
      ],
    },
    {
      id: "conditionals-sensor-warna",
      title: "Detektif Sensor Warna",
      category: "conditionals",
      difficulty: 2,
      description:
        "Beri kecerdasan pada robot Kibo dengan percabangan Jika-Maka (If-Else) sesuai kondisi yang ditemui di jalan!",
      questions: [
        {
          id: "csw-1",
          storyPrompt:
            "Kibo mendekati lampu lalu lintas pintar. Sensor membaca lampu berwarna MERAH.",
          question: "Berdasarkan kode di bawah, aksi apa yang akan dilakukan robot Kibo?",
          codeSnippet: "JIKA (lampu == 'MERAH') {\n  Berhenti();\n} LAINNYA {\n  Maju();\n}",
          options: [
            { id: "A", label: "A", text: "Berhenti", isCorrect: true },
            { id: "B", label: "B", text: "Maju", isCorrect: false },
            { id: "C", label: "C", text: "Belok Balik", isCorrect: false },
            { id: "D", label: "D", text: "Tidur", isCorrect: false },
          ],
          explanation: "Kondisi 'lampu == MERAH' bernilai BENAR (True), sehingga balok kode Berhenti() yang dijalankan!",
        },
        {
          id: "csw-2",
          storyPrompt:
            "Sensor mendeteksi energi baterai Kibo tinggal 10%. Kibo punya aturan keselamatan baterai.",
          question: "Manakah kondisi If-Else yang tepat untuk mengisi daya saat baterai di bawah 20%?",
          codeSnippet: "if (baterai < 20) {\n  cari_stasiun_cas();\n}",
          options: [
            { id: "A", label: "A", text: "JIKA baterai < 20 MAKA Pergi ke Tempat Cas", isCorrect: true },
            { id: "B", label: "B", text: "JIKA baterai > 90 MAKA Pergi ke Tempat Cas", isCorrect: false },
            { id: "C", label: "C", text: "JIKA baterai == 100 MAKA Berhenti", isCorrect: false },
            { id: "D", label: "D", text: "Selalu jalan terus sampai mati", isCorrect: false },
          ],
          explanation: "Simbol '< 20' berarti lebih kecil dari 20%, tepat untuk mendeteksi baterai lemah!",
        },
        {
          id: "csw-3",
          storyPrompt: "Dalam koding, blok logika yang memilih tindakan berdasarkan syarat benar atau salah dinamakan...",
          question: "Apakah nama konsep pemrograman tersebut?",
          codeSnippet: "IF (Kondisi) { ... } ELSE { ... }",
          options: [
            { id: "A", label: "A", text: "Percabangan Kondisi (Conditionals)", isCorrect: true },
            { id: "B", label: "B", text: "Koneksi Mouse", isCorrect: false },
            { id: "C", label: "C", text: "Printer Kertas", isCorrect: false },
            { id: "D", label: "D", text: "Kabel Listrik", isCorrect: false },
          ],
          explanation: "Conditionals (If-Else) memungkinkan komputer membuat keputusan pintar seperti manusia!",
        },
      ],
    },
    {
      id: "debugging-pemburu-bug",
      title: "Pemburu Bug Cilik",
      category: "debugging",
      difficulty: 2,
      description:
        "Jadilah detektif koding handal! Temukan kesalahan (bug) pada baris kode dan perbaiki agar robot berjalan lancar.",
      questions: [
        {
          id: "dpb-1",
          storyPrompt:
            "Kibo ingin meminum susu cokelat di meja. Kode yang ditulis: [Minum Susu] ➔ [Buka Tutup Botol]. Kibo tersedak!",
          question: "Apa bug (kesalahan logika) pada instruksi di atas?",
          codeSnippet: "1. Minum Susu;\n2. Buka Tutup Botol; // ERROR!",
          options: [
            { id: "A", label: "A", text: "Urutannya terbalik: harus Buka Tutup dulu baru Minum", isCorrect: true },
            { id: "B", label: "B", text: "Susu harus diganti air putih", isCorrect: false },
            { id: "C", label: "C", text: "Kibo tidak boleh minum", isCorrect: false },
            { id: "D", label: "D", text: "Botolnya harus dibuang", isCorrect: false },
          ],
          explanation: "Dalam koding urutan sangat penting! Botol harus dibuka sebelum isinya bisa diminum.",
        },
        {
          id: "dpb-2",
          storyPrompt:
            "Kode berikut membuat Kibo melangkah terus tanpa pernah berhenti: 'Ulangi Selamanya { Maju 1 Langkah }'.",
          question: "Masalah kode di mana perulangan tidak pernah berhenti disebut apa?",
          codeSnippet: "while (true) {\n  maju(); // Tidak pernah selesai!\n}",
          options: [
            { id: "A", label: "A", text: "Infinite Loop (Perulangan Tak Henti)", isCorrect: true },
            { id: "B", label: "B", text: "Kecepatan Super", isCorrect: false },
            { id: "C", label: "C", text: "Hemat Energi", isCorrect: false },
            { id: "D", label: "D", text: "Kemenangan Kilat", isCorrect: false },
          ],
          explanation: "Infinite Loop adalah bug saat perulangan lupa diberi kondisi henti sehingga komputer bekerja tanpa henti.",
        },
        {
          id: "dpb-3",
          storyPrompt: "Istilah 'Bug' dalam koding pertama kali terinspirasi dari serangga nyata yang masuk ke mesin komputer kuno.",
          question: "Apa arti istilah 'Debugging' bagi seorang programmer cilik?",
          codeSnippet: "Find Bug ➔ Fix Bug ➔ Clean Code ✨",
          options: [
            { id: "A", label: "A", text: "Mencari dan memperbaiki kesalahan kode", isCorrect: true },
            { id: "B", label: "B", text: "Menangkap serangga di kebun", isCorrect: false },
            { id: "C", label: "C", text: "Mematikan monitor komputer", isCorrect: false },
            { id: "D", label: "D", text: "Mengunduh video baru", isCorrect: false },
          ],
          explanation: "Debugging adalah proses mulia seorang coder untuk mendeteksi error dan membuatnya bekerja sempurna!",
        },
      ],
    },
    {
      id: "algorithms-kotak-variabel",
      title: "Kotak Variabel Ajaib",
      category: "algorithms",
      difficulty: 3,
      description:
        "Pahami konsep Variabel sebagai kotak ajaib penyimpan data: skor bintang, nama pemain, dan jumlah nyawa!",
      questions: [
        {
          id: "akv-1",
          storyPrompt:
            "Kibo punya kotak berlabel 'skor'. Awalnya skor = 10. Kibo menemukan koin bernilai 5 poin.",
          question: "Berapa isi kotak variabel 'skor' setelah kode 'skor = skor + 5' dijalankan?",
          codeSnippet: "let skor = 10;\nskor = skor + 5;",
          options: [
            { id: "A", label: "A", text: "15", isCorrect: true },
            { id: "B", label: "B", text: "10", isCorrect: false },
            { id: "C", label: "C", text: "50", isCorrect: false },
            { id: "D", label: "D", text: "5", isCorrect: false },
          ],
          explanation: "Variabel menyimpan nilai baru: 10 + 5 = 15!",
        },
        {
          id: "akv-2",
          storyPrompt:
            "Kita ingin menyimpan nama pemain 'Budi' ke dalam komputer agar robot bisa menyapanya.",
          question: "Tipe data apakah 'Budi' (kumpulan huruf teks) dalam dunia pemrograman?",
          codeSnippet: "let namaPemain = \"Budi\";",
          options: [
            { id: "A", label: "A", text: "String (Teks)", isCorrect: true },
            { id: "B", label: "B", text: "Number (Angka)", isCorrect: false },
            { id: "C", label: "C", text: "Boolean (Benar/Salah)", isCorrect: false },
            { id: "D", label: "D", text: "Gambar Kartun", isCorrect: false },
          ],
          explanation: "Di dunia koding, teks di dalam tanda kutip disebut String!",
        },
        {
          id: "akv-3",
          storyPrompt: "Variabel bernilai benar (True) atau salah (False) seperti saklar lampu ON/OFF disebut tipe data...",
          question: "Tipe data apakah ini?",
          codeSnippet: "let lampuMenyala = true;",
          options: [
            { id: "A", label: "A", text: "Boolean", isCorrect: true },
            { id: "B", label: "B", text: "Float", isCorrect: false },
            { id: "C", label: "C", text: "Array", isCorrect: false },
            { id: "D", label: "D", text: "Folder", isCorrect: false },
          ],
          explanation: "Tipe data Boolean hanya memiliki 2 kemungkinan nilai: True (Benar) atau False (Salah).",
        },
      ],
    },
    {
      id: "loops-roket-antariksa",
      title: "Hitung Mundur Roket",
      category: "loops",
      difficulty: 3,
      description:
        "Rancang urutan algoritma hitung mundur roket 5.. 4.. 3.. 2.. 1.. LUNCUR! bersama modul perulangan.",
      questions: [
        {
          id: "lra-1",
          storyPrompt:
            "Roket antariksa Kibo siap meluncur. Komputer harus menghitung mundur dari 3 sampai 1 lalu meluncurkan roket.",
          question: "Urutan cetak yang dihasilkan kode pengulangan berikut adalah:",
          codeSnippet: "for (let i = 3; i >= 1; i--) {\n  tampilkan(i);\n}\ntampilkan(\"Luncur! 🚀\");",
          options: [
            { id: "A", label: "A", text: "3, 2, 1, Luncur! 🚀", isCorrect: true },
            { id: "B", label: "B", text: "1, 2, 3, Luncur! 🚀", isCorrect: false },
            { id: "C", label: "C", text: "3, 3, 3, Berhenti", isCorrect: false },
            { id: "D", label: "D", text: "Luncur! 🚀 langsung tanpa hitung", isCorrect: false },
          ],
          explanation: "Nilai i berkurang satu per satu (i--): dari 3, lalu 2, lalu 1, kemudian mencetak 'Luncur! 🚀'!",
        },
        {
          id: "lra-2",
          storyPrompt: "Di luar angkasa, roket perlu mengumpulkan 3 kristal energi sebelum melompat ke portal bintang.",
          question: "Kondisi perulangan 'while (kristal < 3)' akan berhenti saat...",
          codeSnippet: "while (kristal < 3) {\n  ambil_kristal();\n}",
          options: [
            { id: "A", label: "A", text: "Kristal sudah terkumpul 3 buah", isCorrect: true },
            { id: "B", label: "B", text: "Kristal masih 0 buah", isCorrect: false },
            { id: "C", label: "C", text: "Baterai komputer habis", isCorrect: false },
            { id: "D", label: "D", text: "Roket putar balik ke bumi", isCorrect: false },
          ],
          explanation: "Begitu kristal mencapai 3, syarat 'kristal < 3' bernilai Salah sehingga loop selesai!",
        },
      ],
    },
  ];

  console.log("Seeding coding games into Neon database...");

  for (const game of codingGames) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: {
        title: game.title,
        category: game.category,
        difficulty: game.difficulty,
        description: game.description,
        questions: game.questions,
      },
      create: {
        id: game.id,
        title: game.title,
        category: game.category,
        difficulty: game.difficulty,
        description: game.description,
        questions: game.questions,
      },
    });
  }

  console.log("Seeding pure coding games completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
