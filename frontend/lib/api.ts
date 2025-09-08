export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster: string;
}

// ✅ Register new user
export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to register");
  }

  return res.json();
}

// ✅ Login user
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to login");
  }

  return res.json();
}

// ✅ Fetch movies from backend (protected route if JWT exists)
export async function fetchMovies(): Promise<Movie[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to fetch movies");
  }

  return res.json();
}
