"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Sparkles, ArrowLeft, Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import { useGetMoviesByMoodQuery } from "@/redux/services/tmdbApi"; // আপনার RTK Query API slice এর সঠিক পাঠ নির্বাচন করুন

// Mood Data Configuration
const MOODS = [
  {
    id: "feel-good",
    label: "Feel Good & Happy",
    description: "Uplifting and fun movies to brighten your day.",
    emoji: "😊",
    gradient: "from-amber-500/20 to-orange-600/20 hover:border-orange-500",
    activeGradient: "from-amber-500 to-orange-600",
    genreIds: "35,10751,16",
  },
  {
    id: "adrenaline",
    label: "Adrenaline Rush",
    description: "High-octane action and intense thrillers.",
    emoji: "⚡",
    gradient: "from-red-600/20 to-rose-700/20 hover:border-red-500",
    activeGradient: "from-red-600 to-rose-700",
    genreIds: "28,53",
  },
  {
    id: "romantic",
    label: "Romance & Love",
    description: "Heartwarming love stories and romantic comedies.",
    emoji: "❤️",
    gradient: "from-pink-500/20 to-rose-500/20 hover:border-pink-500",
    activeGradient: "from-pink-500 to-rose-500",
    genreIds: "10749",
  },
  {
    id: "mind-bending",
    label: "Mind-Bending",
    description: "Plot twists, mystery, and deep sci-fi stories.",
    emoji: "🧠",
    gradient: "from-purple-600/20 to-indigo-700/20 hover:border-purple-500",
    activeGradient: "from-purple-600 to-indigo-700",
    genreIds: "878,9648",
  },
  {
    id: "emotional",
    label: "Emotional & Deep",
    description: "Touchy dramas and deep storytelling.",
    emoji: "😢",
    gradient: "from-blue-600/20 to-cyan-700/20 hover:border-blue-500",
    activeGradient: "from-blue-600 to-cyan-700",
    genreIds: "18",
  },
  {
    id: "spooky",
    label: "Spooky & Dark",
    description: "Chilling horror and eerie mysteries.",
    emoji: "👻",
    gradient: "from-emerald-700/20 to-teal-900/20 hover:border-emerald-500",
    activeGradient: "from-emerald-700 to-teal-900",
    genreIds: "27",
  },
];

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
}

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<(typeof MOODS)[0] | null>(
    null,
  );

  // Redux Hook Call: Selected Mood থাকলে তবেই API কল হবে (skip: !selectedMood)
  const { data, isFetching, isError } = useGetMoviesByMoodQuery(
    selectedMood?.genreIds || "",
    { skip: !selectedMood },
  );

  const movies: Movie[] = data?.results || [];

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> What’s your vibe today?
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Choose Your <span className="text-red-600">Mood</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Select how you are feeling right now, and Redux will fetch the best
            movies for your vibe.
          </p>
        </div>

        {/* Mood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOODS.map((mood) => {
            const isSelected = selectedMood?.id === mood.id;
            return (
              <motion.button
                key={mood.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMood(mood)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${
                  isSelected
                    ? `${mood.activeGradient} border-white/40 shadow-2xl shadow-red-900/30`
                    : `${mood.gradient} border-zinc-800/80 hover:border-zinc-700 bg-zinc-900/40`
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{mood.emoji}</span>
                  {isSelected && (
                    <span className="bg-white text-black text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mt-4">
                  {mood.label}
                </h3>
                <p className="text-xs text-zinc-300/80 mt-1">
                  {mood.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Mood Movies Display Section */}
        {selectedMood && (
          <div className="pt-10 border-t border-zinc-800/80 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedMood.emoji}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Movies for{" "}
                  <span className="text-red-500">{selectedMood.label}</span>
                </h2>
              </div>
              <button
                onClick={() => setSelectedMood(null)}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Clear Mood
              </button>
            </div>

            {/* Error Message */}
            {isError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center text-sm">
                Failed to fetch movies. Please check your internet connection or
                API Key.
              </div>
            )}

            {/* Loading Skeleton */}
            {isFetching ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 animate-pulse">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900 aspect-[2/3] rounded-2xl"
                  />
                ))}
              </div>
            ) : movies.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-sm">
                No movies found for this mood right now.
              </div>
            ) : (
              /* Movie List Cards */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                  >
                    <div className="relative aspect-[2/3] w-full bg-zinc-950 overflow-hidden">
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-600">
                          <Clapperboard className="w-8 h-8 mb-2" />
                          <span className="text-xs">No Poster</span>
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[11px] font-bold text-white">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-red-500 transition-colors line-clamp-1">
                        {movie.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "N/A"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
