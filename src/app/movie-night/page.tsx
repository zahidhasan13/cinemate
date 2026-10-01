"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Star,
  X,
  Play,
  RotateCcw,
  Check,
  Film,
  PartyPopper,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// useLazyGetDiscoverMovieQuery import korun
import { useLazyGetDiscoverMovieQuery } from "@/redux/services/tmdbApi";

const QUESTIONS = [
  {
    id: "mood",
    title: "What's the vibe for tonight?",
    subtitle: "Select a genre based on how you feel right now",
    options: [
      { label: "Fun & Laughs", value: "35", emoji: "😂" },
      { label: "Adrenaline Rush", value: "28,53", emoji: "💥" },
      { label: "Deep & Mind-Bending", value: "878,9648", emoji: "🧠" },
      { label: "Romantic & Chill", value: "10749", emoji: "💖" },
      { label: "Spooky & Dark", value: "27", emoji: "👻" },
    ],
  },
  {
    id: "duration",
    title: "How much time do you have?",
    subtitle: "We will tailor suggestions based on runtime preferences",
    options: [
      { label: "Quick Watch (< 100 min)", value: "short", emoji: "⚡" },
      { label: "Standard (100 - 140 min)", value: "medium", emoji: "🍿" },
      { label: "Epic Movie Night (> 140 min)", value: "long", emoji: "🎬" },
    ],
  },
  {
    id: "era",
    title: "Which movie era do you prefer?",
    subtitle: "Choose the release period of the movie",
    options: [
      { label: "Recent Hits (2020 - Present)", value: "recent", emoji: "✨" },
      { label: "Modern Classics (2000 - 2019)", value: "modern", emoji: "🔥" },
      { label: "Nostalgic (Pre-2000)", value: "classic", emoji: "🎞️" },
    ],
  },
  {
    id: "occasion",
    title: "Who are you watching with?",
    subtitle: "We will adjust ratings and themes accordingly",
    options: [
      { label: "Solo Watch", value: "solo", emoji: "🎧" },
      { label: "Date Night", value: "date", emoji: "🕯️" },
      { label: "Friends Hangout", value: "friends", emoji: "🍕" },
      { label: "Family Time", value: "family", emoji: "👨‍👩‍👧‍👦" },
    ],
  },
];

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
}

export default function MovieNightPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lazy query trigger hook
  const [triggerDiscover, { isFetching }] = useLazyGetDiscoverMovieQuery();

  const getQueryParams = (customAnswers = answers) => {
    let yearFilter: string | number | undefined;

    if (customAnswers.era === "recent") yearFilter = 2023;
    if (customAnswers.era === "modern") yearFilter = 2012;
    if (customAnswers.era === "classic") yearFilter = 1995;

    return {
      with_genres: customAnswers.mood || "35",
      primary_release_year: yearFilter,
      "vote_average.gte": customAnswers.occasion === "family" ? 7 : 6,
      "vote_count.gte": 200,
      page: Math.floor(Math.random() * 3) + 1,
    };
  };

  const handleSelectOption = async (value: string) => {
    const currentQuestion = QUESTIONS[currentStep];
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await findBestMovie(updatedAnswers);
    }
  };

  const findBestMovie = async (latestAnswers = answers) => {
    try {
      const params = getQueryParams(latestAnswers);
      // Trigger lazy query on demand
      const response = await triggerDiscover(params, true).unwrap();

      if (response?.results && response.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.results.length);
        setSelectedMovie(response.results[randomIndex]);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-widest">
            <PartyPopper className="w-3.5 h-3.5" /> Movie Night Matchmaker
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Find Your <span className="text-red-600">Perfect Movie</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Answer a few quick questions and let AI & Redux pick your tonight's
            feature!
          </p>
        </div>

        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
          <motion.div
            className="bg-red-600 h-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Question {currentStep + 1} of {QUESTIONS.length}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {QUESTIONS[currentStep].title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 mb-6">
            {QUESTIONS[currentStep].subtitle}
          </p>

          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[currentStep].options.map((option) => (
              <motion.button
                key={option.value}
                disabled={isFetching}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectOption(option.value)}
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/80 hover:bg-red-950/30 border border-zinc-800 hover:border-red-600/50 text-left transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-semibold text-sm sm:text-base text-zinc-200 group-hover:text-white">
                    {option.label}
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border border-zinc-700 group-hover:border-red-500 flex items-center justify-center group-hover:bg-red-600">
                  {isFetching ? (
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/60 text-xs text-zinc-500">
            {currentStep > 0 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="hover:text-white transition-colors"
                disabled={isFetching}
              >
                ← Previous Question
              </button>
            ) : (
              <span />
            )}

            <button
              onClick={handleReset}
              className="flex items-center gap-1 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 bg-black/60 text-zinc-400 hover:text-white p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-zinc-950">
                {selectedMovie.backdrop_path || selectedMovie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w780${
                      selectedMovie.backdrop_path || selectedMovie.poster_path
                    }`}
                    alt={selectedMovie.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <Film className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Movie Night Match
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white line-clamp-1">
                      {selectedMovie.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{selectedMovie.vote_average.toFixed(1)} / 10</span>
                  </div>
                  <span>•</span>
                  <span>
                    {selectedMovie.release_date
                      ? new Date(selectedMovie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                  {selectedMovie.overview ||
                    "No description available for this movie."}
                </p>

                <div className="flex gap-3 pt-2">
                  <Link
                    href={`/movie/${selectedMovie.id}`}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" /> View Movie Details
                  </Link>
                  <button
                    onClick={() => findBestMovie()}
                    disabled={isFetching}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold px-4 py-3 rounded-xl text-sm transition-colors flex items-center gap-2"
                  >
                    <RotateCcw
                      className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                    />{" "}
                    Try Another
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
