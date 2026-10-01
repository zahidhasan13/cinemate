"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export interface SimilarMovieItem {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number;
  release_date?: string;
}

interface SimilarMoviesProps {
  movies?: SimilarMovieItem[];
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies = [] }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  // Top 10 similar movies show korbar jonno slice
  const displayedMovies = movies.slice(0, 10);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
        More Like This
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {displayedMovies.map((movie) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png";

          const releaseYear = movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A";

          return (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="group cursor-pointer bg-zinc-900 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between">
                <div className="relative w-full aspect-[2/3] bg-zinc-800">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    className="object-cover"
                  />
                  {movie.vote_average !== undefined && (
                    <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-white font-semibold text-xs sm:text-sm group-hover:text-red-500 transition-colors truncate">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-[11px] sm:text-xs mt-1">
                    {releaseYear}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SimilarMovies;
