"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://your-app.up.railway.app/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to register");
      }

      setSuccess("Registration successful! Please login.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/4cfc7af2-b958-4cf7-b8c1-d454ebd9e4e4/5a5e6d5e-2f38-4264-9af3-52f3c3d7d5b6/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center">
      <div className="h-screen w-full bg-black bg-opacity-60 flex items-center justify-center">
        <div className="bg-black bg-opacity-80 p-12 rounded-md w-full max-w-md">
          <h1 className="text-red-600 text-4xl font-bold mb-6">Netflix</h1>
          <h2 className="text-white text-2xl font-semibold mb-6">Sign Up</h2>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-md bg-gray-800 text-white outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md bg-gray-800 text-white outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md bg-gray-800 text-white outline-none"
              required
            />
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md mt-2">
              Sign Up
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}

          <p className="text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
