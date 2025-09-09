"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api"; // adjust path if needed

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  // ✅ Typed ChangeEvent for input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Typed FormEvent for form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(formData.email, formData.password);

      // store token (if backend returns one)
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      router.push("/movies"); // redirect after login
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

        {error && (
          <p className="bg-red-600 text-white text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded text-white font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          New to Netflix?{" "}
          <a href="/register" className="text-white hover:underline">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}
