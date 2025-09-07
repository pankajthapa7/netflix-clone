import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const tmdbKey = process.env.TMDB_API_KEY;
    if (!tmdbKey) {
      return res.status(500).json({ error: "TMDB_API_KEY not configured" });
    }

    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${tmdbKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: "TMDB fetch failed", details: text });
    }

    const data: any = await response.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    // Map into clean shape with full poster URL
    const movies = results.map((m: any) => ({
      id: m.id,
      title: m.title ?? m.name,
      posterUrl: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : null,
      overview: m.overview ?? null,
      release_date: m.release_date ?? null,
    }));

    res.json(movies);
  } catch (err) {
    console.error("Error in /movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
