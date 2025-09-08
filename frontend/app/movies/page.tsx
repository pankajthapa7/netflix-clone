"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  genre?: string;
}

export default function MoviesPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // if no token, redirect
      return;
    }

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/movies`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // send JWT
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li key={movie.id} className="border rounded p-3 shadow hover:shadow-lg">
            <h2 className="font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.genre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
