import { Router } from "express";

const router = Router();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get("/", async (_req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    // 👇 explicitly type the response
    const data: { results: any[] } = await response.json();

    // ✅ safely map results
    const movies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));

    res.json(movies);
  } catch (error) {
    console.error("❌ Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

export default router;
