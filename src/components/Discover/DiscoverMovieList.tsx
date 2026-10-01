"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Film, AlertCircle } from "lucide-react";

// TMDB Movie Interface
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
}

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies = [],
  isLoading,
  isError,
}) => {
  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900 aspect-[2/3] rounded-2xl border border-zinc-800/50"
          />
        ))}
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-zinc-900/40 rounded-2xl border border-zinc-800">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <h3 className="text-base font-semibold text-white">
          Failed to load movies
        </h3>
        <p className="text-xs text-zinc-400">
          Something went wrong while fetching the data. Please try again.
        </p>
      </div>
    );
  }

  // 3. Empty Results State
  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-zinc-900/40 rounded-2xl border border-zinc-800">
        <Film className="w-10 h-10 text-zinc-500" />
        <h3 className="text-base font-semibold text-white">No movies found</h3>
        <p className="text-xs text-zinc-400">
          Try adjusting your filters to find what you are looking for.
        </p>
      </div>
    );
  }

  // 4. Movie Grid Render
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
      {movies.map((movie) => {
        // TMDB Poster Full Image URL Generator
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder-poster.png"; // Placeholder image fallback

        const releaseYear = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : "N/A";

        return (
          <div
            key={movie.id}
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/20 flex flex-col"
          >
            {/* Poster Section */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
              <Image
                src={posterUrl}
                alt={movie.title || "Movie Poster"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Rating Badge */}
              <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-lg">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-white">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                </span>
              </div>
            </div>

            {/* Movie Info Section */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3
                  className="font-bold text-sm md:text-base text-white group-hover:text-red-500 transition-colors line-clamp-1"
                  title={movie.title}
                >
                  {movie.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">{releaseYear}</p>
              </div>

              <Link
                href={`/movie/${movie.id}`}
                className="w-full mt-2 py-2 rounded-lg bg-zinc-800/60 hover:bg-red-600 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center transition-all duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
