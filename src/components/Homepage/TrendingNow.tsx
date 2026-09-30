"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

// RTK Query Hook
import { useGetTrendingMoviesQuery } from "@/redux/services/tmdbApi";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const TrendingNow = () => {
  // Redux store theke trending movies fetch kora hocche
  const { data, isLoading, isError } = useGetTrendingMoviesQuery("day");

  if (isLoading) {
    return <TrendingSkeleton />;
  }

  if (isError || !data?.results?.length) {
    return null;
  }

  // Top 10 Trending Movies
  const topMovies: Movie[] = data.results.slice(0, 10);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 bg-black text-white">
      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-4 sm:mb-6">
        Trending Now
      </h2>

      {/* Swiper Slider Wrapper */}
      <div className="relative group">
        {/* Left Navigation Button (Previous) */}
        <button
          className="custom-swiper-button-prev absolute -left-2 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex items-center justify-center cursor-pointer disabled:opacity-0 disabled:cursor-not-allowed shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Right Navigation Button (Next) */}
        <button
          className="custom-swiper-button-next absolute -right-2 sm:-right-4 md:-right-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex items-center justify-center cursor-pointer disabled:opacity-0 disabled:cursor-not-allowed shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          spaceBetween={12}
          slidesPerView={1.8}
          breakpoints={{
            360: { slidesPerView: 2.1, spaceBetween: 12 },
            480: { slidesPerView: 2.5, spaceBetween: 16 },
            640: { slidesPerView: 3.2, spaceBetween: 20 },
            768: { slidesPerView: 3.8, spaceBetween: 24 },
            1024: { slidesPerView: 4.8, spaceBetween: 28 },
            1280: { slidesPerView: 5.5, spaceBetween: 32 },
          }}
          className="overflow-visible"
        >
          {topMovies.map((movie, index) => (
            <SwiperSlide key={movie.id} className="py-2 sm:py-4">
              <Link href={`/movie/${movie.id}`}>
                <motion.div
                  className="relative flex items-end cursor-pointer group/card select-none"
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Huge Number Overlay (Netflix Style) */}
                  <span
                    className="absolute -left-0 sm:-left-4 md:-left-5 -bottom-1 sm:-bottom-2 z-10 text-8xl md:text-9xl font-black tracking-tighter leading-none pointer-events-none drop-shadow-2xl"
                    style={{
                      color: "#000",
                      WebkitTextStroke: "2px #888888",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {index + 1}
                  </span>

                  {/* Poster Image Container */}
                  <div className="relative w-full aspect-[2/3] ml-4 sm:ml-8 md:ml-10 rounded-md sm:rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shadow-xl group-hover/card:border-white/30 transition-colors">
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

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
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

export default TrendingNow;

// Responsive Skeleton Component
const TrendingSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 bg-black text-white animate-pulse">
      <div className="h-6 sm:h-8 w-40 sm:w-48 bg-zinc-800 rounded mb-4 sm:mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-end">
            <div className="h-12 sm:h-20 w-8 sm:w-12 bg-zinc-800 rounded mr-1 sm:mr-2 shrink-0" />
            <div className="w-full aspect-[2/3] bg-zinc-800 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
