"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  Star,
  Film,
} from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setSortBy,
  setSelectedGenre,
  setMinRating,
  setSelectedYear,
  resetFilters,
} from "@/redux/features/movieSlice";

// TMDB Movie Genres Data
const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const DiscoverFilter = () => {
  const dispatch = useDispatch<AppDispatch>();

  const filters = useSelector((state: RootState) => state.movies?.filters) || {
    selectedGenre: null,
    sortBy: "popularity.desc",
    minRating: 0,
    selectedYear: "",
  };

  const { selectedGenre, sortBy, minRating, selectedYear } = filters;

  return (
    <aside className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <h2 className="text-lg font-bold flex items-center gap-2 text-white">
          <SlidersHorizontal className="w-5 h-5 text-red-600" />
          Filters
        </h2>
        <button
          onClick={() => dispatch(resetFilters())}
          className="text-xs text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Sort By Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Sort By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 appearance-none focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Highest Rated</option>
            <option value="primary_release_date.desc">
              Release Date (Newest)
            </option>
            <option value="primary_release_date.asc">
              Release Date (Oldest)
            </option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* Genres Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Genre
        </label>
        <div className="relative">
          <select
            value={selectedGenre ?? ""}
            onChange={(e) =>
              dispatch(
                setSelectedGenre(
                  e.target.value ? Number(e.target.value) : null,
                ),
              )
            }
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 appearance-none focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
          >
            <option value="">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* Rating Range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Min Rating
          </label>
          <span className="text-xs font-bold text-red-500 flex items-center gap-1">
            <Star className="w-3 h-3 fill-red-500" /> {minRating}+
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={minRating}
          onChange={(e) => dispatch(setMinRating(parseFloat(e.target.value)))}
          className="w-full accent-red-600 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
        />
      </div>

      {/* Release Year Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Release Year
        </label>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => dispatch(setSelectedYear(e.target.value))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 appearance-none focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
          >
            <option value="">All Years</option>
            {Array.from(
              { length: 40 },
              (_, i) => new Date().getFullYear() - i,
            ).map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          <Calendar className="w-4 h-4 absolute right-4 top-3.5 text-zinc-400 pointer-events-none" />
        </div>
      </div>
    </aside>
  );
};
