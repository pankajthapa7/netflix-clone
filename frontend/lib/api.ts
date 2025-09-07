// frontend/api.ts

// Define movie type
export type Movie = {
  id: number;
  title: string;
  posterUrl?: string | null;
  overview?: string;
  release_date?: string;
};

// Fetch movies from your backend instead of TMDB
export async function fetchMovies(): Promise<Movie[]> {
  // In development, point to your local backend
  // In production, change this to your Railway backend domain
  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const res = await fetch(`${backendUrl}/movies`);

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }

  const data: Movie[] = await res.json();
  return data;
}
