import { prisma } from "./db.js";

async function main() {
  const games = [
    {
      id: "math-quick-sum",
      title: "Penjumlahan Cepat",
      category: "math",
      difficulty: 1,
      description:
        "Hitung kilat puluhan dan ratusan, kumpulkan bintang emas sebanyak mungkin sebelum waktu habis!",
    },
    {
      id: "reading-fabel-kancil",
      title: "Petualangan Fabel Kancil",
      category: "reading",
      difficulty: 2,
      description:
        "Baca kisah dongeng seru nusantara dan jawab pertanyaan teka-teki moral cerdik bersama sahabat rimba.",
    },
    {
      id: "spelling-susun-kata",
      title: "Susun Kata Ceria",
      category: "spelling",
      difficulty: 1,
      description:
        "Bantu si Kibo menyusun huruf acak menjadi kata benda sehari-hari yang tepat sebelum keranjang penuh!",
    },
    {
      id: "math-perkalian-galaksi",
      title: "Perkalian Juara Galaksi",
      category: "math",
      difficulty: 3,
      description:
        "Luncurkan roket ke luar angkasa dengan memecahkan perkalian tabel 1-10 untuk menaklukkan planet baru!",
    },
    {
      id: "spelling-kosakata-ajaib",
      title: "Teka-Teki Kosakata Ajaib",
      category: "spelling",
      difficulty: 2,
      description:
        "Temukan sinonim dan antonim kata dalam labirin kata berwaktu untuk membebaskan kristal bahasa kuno.",
    },
    {
      id: "reading-raja-hutan",
      title: "Dongeng Sang Raja Hutan",
      category: "reading",
      difficulty: 2,
      description:
        "Dengarkan suara narator dan ikuti teks interaktif untuk melatih pemahaman bacaan dan kuis kecerdikan.",
    },
  ];

  console.log("Seeding games into database...");

  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: {
        title: game.title,
        category: game.category,
        difficulty: game.difficulty,
        description: game.description,
      },
      create: {
        id: game.id,
        title: game.title,
        category: game.category,
        difficulty: game.difficulty,
        description: game.description,
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
