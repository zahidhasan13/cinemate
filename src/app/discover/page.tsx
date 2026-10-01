"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { DiscoverHero } from "@/components/Discover/DiscoverHero";
import { DiscoverFilter } from "@/components/Discover/DiscoverFilter";
import { MovieList } from "@/components/Discover/DiscoverMovieList";
import { DiscoverPagination } from "@/components/Discover/DiscoverPagination";
import { useGetDiscoverMovieQuery } from "@/redux/services/tmdbApi";
import { RootState } from "@/redux/store";

export default function DiscoverMoviesPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Redux store safe extraction with fallback default values
  const filters = useSelector((state: RootState) => state.movies?.filters) || {
    selectedGenre: null,
    sortBy: "popularity.desc",
    minRating: 0,
    selectedYear: "",
    currentPage: 1,
  };

  const { selectedGenre, sortBy, minRating, selectedYear, currentPage } =
    filters;

  // RTK Query API Call
  const { data, isLoading, isFetching, isError } = useGetDiscoverMovieQuery({
    page: currentPage,
    sort_by: sortBy,
    with_genres: selectedGenre || undefined,
    "vote_average.gte": minRating > 0 ? minRating : undefined,
    primary_release_year: selectedYear || undefined,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-600 selection:text-white">
      <DiscoverHero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex items-center justify-between bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <span className="text-sm font-semibold flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-red-500" /> Filter Movies
          </span>
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all"
          >
            {isMobileFilterOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Filter className="w-4 h-4" />
            )}
            {isMobileFilterOpen ? "Close Filters" : "Open Filters"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div
            className={`lg:block ${isMobileFilterOpen ? "block" : "hidden"}`}
          >
            <DiscoverFilter />
          </div>

          <section className="lg:col-span-3 space-y-6">
            <MovieList
              movies={data?.results || []}
              isLoading={isLoading || isFetching}
              isError={isError}
            />

            <DiscoverPagination
              currentPage={currentPage}
              totalPages={data?.total_pages || 1}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
