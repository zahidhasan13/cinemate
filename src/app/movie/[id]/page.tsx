"use client";

import React from "react";
import { useParams } from "next/navigation";
import MovieHero from "@/components/MovieDetails/MovieHero";
import { useGetMovieDetailsQuery } from "@/redux/services/tmdbApi";
import CastSection from "@/components/MovieDetails/CastSection";

const MovieDetailsPage = () => {
  const params = useParams();

  // Array or string checking to ensure a clean number or skip token
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const movieId = rawId ? Number(rawId) : undefined;

  // movieId valid thaklei kebol fetch korbe
  const {
    data: movie,
    isLoading,
    isError,
  } = useGetMovieDetailsQuery(movieId as number, {
    skip: !movieId || isNaN(movieId),
  });

  if (isLoading) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center text-white">
        <p className="text-gray-400">Failed to load movie details.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen font-sans pb-12">
      <MovieHero movie={movie} onPlayTrailer={() => {}} />
      <CastSection cast={movie.credits.cast} />
    </div>
  );
};

export default MovieDetailsPage;
