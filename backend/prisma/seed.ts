import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const movies = [
    {
      title: "Inception",
      description: "A thief enters dreams to steal secrets.",
      poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    },
    {
      title: "The Dark Knight",
      description: "Batman faces the Joker in Gotham City.",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      title: "Interstellar",
      description: "Explorers travel through a wormhole in space.",
      poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    },
  ];

  for (const movie of movies) {
    await prisma.movie.upsert({
      where: { title: movie.title }, // ✅ title is unique
      update: {}, // if already exists, do nothing
      create: movie, // otherwise create
    });
  }

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1); // ✅ requires @types/node
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
