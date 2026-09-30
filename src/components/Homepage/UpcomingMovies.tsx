"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

// RTK Query Hook
import { useGetUpcomingMovieQuery } from "@/redux/services/tmdbApi";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const UpcomingMovies = () => {
  // RTK Query call for upcoming movies
  const { data, isLoading, isError } = useGetUpcomingMovieQuery(1);

  if (isLoading) {
    return <UpcomingSkeleton />;
  }

  if (isError || !data?.results?.length) {
    return null;
  }

  const movies: Movie[] = data.results;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 bg-black text-white">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            Upcoming Movies
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
            Movies releasing soon in theaters and streaming platforms
          </p>
        </div>
      </div>

      {/* Swiper Slider Wrapper */}
      <div className="relative group">
        {/* Left Navigation Button */}
        <button
          className="upcoming-prev-btn absolute -left-2 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex items-center justify-center cursor-pointer disabled:opacity-0 disabled:cursor-not-allowed shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Right Navigation Button */}
        <button
          className="upcoming-next-btn absolute -right-2 sm:-right-4 md:-right-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex items-center justify-center cursor-pointer disabled:opacity-0 disabled:cursor-not-allowed shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".upcoming-next-btn",
            prevEl: ".upcoming-prev-btn",
          }}
          spaceBetween={12}
          slidesPerView={2.2}
          breakpoints={{
            380: { slidesPerView: 2.3, spaceBetween: 12 },
            480: { slidesPerView: 2.8, spaceBetween: 14 },
            640: { slidesPerView: 3.3, spaceBetween: 16 },
            768: { slidesPerView: 4.2, spaceBetween: 18 },
            1024: { slidesPerView: 5.2, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 22 },
          }}
          className="overflow-visible"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="h-auto">
              <Link href={`/movie/${movie.id}`}>
                <motion.div
                  className="relative h-full flex flex-col justify-between rounded-lg overflow-hidden bg-zinc-900 border border-white/10 group/card cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Poster Container */}
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-zinc-800">
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/placeholder.png"
                      }
                      alt={movie.title}
                      fill
                      sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 20vw, 15vw"
                      className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />

                    {/* Top Right Rating Badge */}
                    {movie.vote_average > 0 && (
                      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/75 backdrop-blur-md text-yellow-400 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md flex items-center gap-1 border border-white/10">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400" />
                        {movie.vote_average.toFixed(1)}
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />
                  </div>

                  {/* Movie Info */}
                  <div className="p-2.5 sm:p-3 bg-zinc-900/90 flex-1 flex flex-col justify-between">
                    <h3 className="text-xs sm:text-sm font-bold truncate text-white group-hover/card:text-red-500 transition-colors">
                      {movie.title}
                    </h3>

                    {/* Release Date */}
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-400 mt-1">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">
                        {movie.release_date
                          ? new Date(movie.release_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "Coming Soon"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingMovies;

// Fully Responsive Loading Skeleton
const UpcomingSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 bg-black text-white animate-pulse">
      <div className="h-6 sm:h-8 w-44 sm:w-56 bg-zinc-800 rounded mb-2" />
      <div className="h-3.5 sm:h-4 w-60 sm:w-72 bg-zinc-800/60 rounded mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2 sm:space-y-3">
            <div className="w-full aspect-[2/3] bg-zinc-800 rounded-lg" />
            <div className="h-3.5 sm:h-4 w-3/4 bg-zinc-800 rounded" />
            <div className="h-3 w-1/2 bg-zinc-800/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
