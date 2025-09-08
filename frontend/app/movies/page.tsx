"use client";

import { useEffect, useState } from "react";
import { fetchMovies, Movie } from "../../lib/api";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading movies...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border rounded shadow hover:shadow-lg transition"
          >
            <img src={movie.poster} alt={movie.title} className="rounded-t" />
            <div className="p-2">
              <h2 className="font-bold text-lg">{movie.title}</h2>
              <p className="text-sm line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
