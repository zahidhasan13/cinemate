"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Play, Info } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Standard Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// RTK Query Hook import
import { useGetPopularMoviesQuery } from "@/redux/services/tmdbApi";
import HeroSkeleton from "../skeleton/HeroSkeleton";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

const Hero = () => {
  // Redux RTK Query hook calling
  const { data, isLoading, isError } = useGetPopularMoviesQuery(1);
  console.log(data, "data");

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (isError || !data?.results?.length) {
    return null;
  }

  // Get top 5 movies
  const movies: Movie[] = data.results.slice(0, 5);

  // Motion Variants for Staggered Animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-black text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full w-full custom-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Movie Info Content with Motion */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8">
              <motion.div
                className="max-w-2xl space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {/* Rating & Year */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 text-sm sm:text-base font-semibold"
                >
                  <span className="flex items-center gap-1 text-yellow-400 bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </span>
                  <span className="text-gray-300">
                    {movie.release_date ? movie.release_date.split("-")[0] : ""}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md"
                >
                  {movie.title}
                </motion.h1>

                {/* Overview */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow"
                >
                  {movie.overview}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 pt-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      Watch Trailer
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300"
                    >
                      <Info className="w-5 h-5" />
                      More Info
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
