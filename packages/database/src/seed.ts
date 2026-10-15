import { prisma } from "./db.js";

async function main() {
  console.log("Purging all hardcoded / dummy games and progress from database...");
  // Clear any existing game progress and hardcoded games so all content is AI generated
  await prisma.gameProgress.deleteMany();
  await prisma.game.deleteMany();
  console.log("Database clean: All dummy game data purged.");
}

main()
  .catch((e) => {
    console.error("Purge error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
