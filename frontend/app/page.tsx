// app/page.tsx
import React from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

async function fetchMovies(): Promise<Movie[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies`;
  console.log("Fetching movies from:", url);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error("Failed to load movies, status:", res.status);
    throw new Error('Failed to load movies');
  }
  return res.json();
}

export default async function Page() {
  let movies: Movie[] = [];
  try {
    movies = await fetchMovies();
  } catch (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
        <p className="text-red-500">Failed to load movies. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        className="border rounded p-2 mb-6 w-full max-w-md"
        // Add your search logic here
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded shadow overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{movie.title}</h2>
              <p className="text-gray-700 text-sm line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
