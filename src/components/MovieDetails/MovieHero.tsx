"use client";

import React from "react";
import Image from "next/image";
import { Star, Play, Plus, Info } from "lucide-react";
import Link from "next/link";

interface Genre {
  id: number;
  name: string;
}

interface MovieHeroProps {
  movie: {
    title?: string;
    backdrop_path?: string;
    poster_path?: string;
    vote_average?: number;
    release_date?: string;
    runtime?: number;
    overview?: string;
    genres?: Genre[];
  };
  onPlayTrailer?: () => void;
  onAddToList?: () => void;
  onMoreInfo?: () => void;
}

const MovieHero: React.FC<MovieHeroProps> = ({
  movie,
  onPlayTrailer,
  onAddToList,
  onMoreInfo,
}) => {
  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const runtimeFormatted = movie?.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  const matchPercent = movie?.vote_average
    ? Math.round(movie.vote_average * 10)
    : null;

  return (
    <section className="relative w-full h-[560px] sm:h-[680px] text-white overflow-hidden bg-[#141414]">
      {/* One-time entrance animation (respects reduced motion) */}
      <style>{`
        @keyframes heroFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes heroZoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        @media (prefers-reduced-motion: no-preference) {
          .hero-content { animation: heroFade .8s cubic-bezier(.2,.7,.2,1) both; }
          .hero-poster { animation: heroFade .9s .15s cubic-bezier(.2,.7,.2,1) both; }
          .hero-bg { animation: heroZoom 1.6s cubic-bezier(.2,.7,.2,1) both; }
        }
      `}</style>

      {/* Backdrop */}
      <div className="hero-bg absolute inset-0">
        {movie?.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie?.title || "Movie Backdrop"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_top] sm:object-top"
          />
        ) : (
          <div className="absolute inset-0 sm:bg-linear-to-br from-zinc-800 via-zinc-900 to-black" />
        )}
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-[#141414]/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-[#141414]/20 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      {/* Blend into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#141414] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-end md:items-center gap-10 pb-16 md:pb-0">
        {/* Poster */}
        <div className="hero-poster hidden md:block relative w-64 lg:w-72 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-zinc-900 ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <Image
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie?.title || "Movie Poster"}
            fill
            sizes="288px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Info */}
        <div className="hero-content flex-1 max-w-2xl space-y-4 sm:space-y-5">
          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {movie?.title || "Untitled Movie"}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base font-medium">
            {matchPercent !== null && (
              <span className="text-[#46d369] font-bold">
                {matchPercent}% Match
              </span>
            )}
            {releaseYear && (
              <span className="text-zinc-300">{releaseYear}</span>
            )}
            {runtimeFormatted && (
              <span className="text-zinc-300">{runtimeFormatted}</span>
            )}
            <span className="border border-white/40 text-zinc-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-sm leading-none">
              HD
            </span>
            {movie?.vote_average ? (
              <span className="flex items-center gap-1 text-zinc-200">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </span>
            ) : null}
          </div>

          {/* Overview */}
          <p className="text-zinc-200 text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3 sm:line-clamp-4 max-w-xl drop-shadow-md">
            {movie?.overview || "No overview available for this movie."}
          </p>

          {/* Genres */}
          {movie?.genres && movie.genres.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
              {movie.genres.map((genre, i) => (
                <li key={genre.id} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  )}
                  {genre.name}
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="#trailer">
              <button
                onClick={onPlayTrailer}
                className="bg-white text-black hover:bg-white/80 active:scale-95 font-bold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 rounded-md flex items-center gap-2.5 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Play className="w-6 h-6 fill-black" />
                Watch Trailer
              </button>
            </Link>

            {onAddToList && (
              <button
                onClick={onAddToList}
                aria-label="Add to My List"
                className="bg-zinc-500/50 hover:bg-zinc-500/40 backdrop-blur-md active:scale-95 text-white font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-md flex items-center gap-2 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">My List</span>
              </button>
            )}

            {onMoreInfo && (
              <button
                onClick={onMoreInfo}
                className="bg-zinc-500/50 hover:bg-zinc-500/40 backdrop-blur-md active:scale-95 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-md flex items-center gap-2 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Info className="w-5 h-5" />
                More Info
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHero;
