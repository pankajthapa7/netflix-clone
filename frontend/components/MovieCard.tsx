"use client";
import React from "react";

type MovieCardProps = {
  movie: {
    id: number | string;
    title: string;
    poster_path?: string; // TMDB gives this
  };
};

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png"; // fallback image

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-200">
      <img
        src={posterUrl || "/fallback.jpg"}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-3">
        <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
      </div>
    </div>
  );
}
