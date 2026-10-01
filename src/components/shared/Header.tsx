"use client";

import { Bookmark, Film, Menu, Search, X, Loader2, Star } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SearchResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average: number;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Search States
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenResults, setIsOpenResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close search results dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpenResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // TMDB API Live Search (Debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
              query,
            )}&include_adult=false`,
          );
          const data = await res.json();
          setResults(data.results ? data.results.slice(0, 5) : []);
          setIsOpenResults(true);
        } catch (error) {
          console.error("Search fetch error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpenResults(false);
      }
    }, 400); // 400ms delay to limit API calls

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 text-white">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl sm:text-2xl"
              >
                <Film className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
                <span>CineMate</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {["Tonight", "Discover", "Mood", "Movie Night"].map(
                (item, index) => {
                  const path =
                    item === "Tonight"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={path}
                        className="hover:text-red-500 transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  );
                },
              )}
            </nav>
          </div>

          {/* Search, Bookmark & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input Box (Desktop) */}
            <div className="relative hidden sm:block" ref={searchRef}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm w-48 lg:w-64 focus-within:ring-1 focus-within:ring-red-500 transition-all duration-300"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 text-red-500 animate-spin shrink-0" />
                ) : (
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() =>
                    query.trim().length > 1 && setIsOpenResults(true)
                  }
                  placeholder="Find a film..."
                  className="w-full bg-transparent outline-none placeholder:text-gray-400 text-sm text-white"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                    }}
                  >
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
                  </button>
                )}
              </form>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isOpenResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 lg:w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                  >
                    {results.length > 0 ? (
                      <div className="p-2 space-y-1">
                        {results.map((movie) => (
                          <Link
                            key={movie.id}
                            href={`/movie/${movie.id}`}
                            onClick={() => {
                              setIsOpenResults(false);
                              setQuery("");
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800/80 transition-colors group"
                          >
                            <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-zinc-950 shrink-0">
                              <Image
                                src={
                                  movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                    : "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1920"
                                }
                                alt={movie.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-white group-hover:text-red-500 truncate transition-colors">
                                {movie.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                                <span>
                                  {movie.release_date
                                    ? new Date(movie.release_date).getFullYear()
                                    : "N/A"}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-amber-400 font-medium">
                                  <Star className="w-3 h-3 fill-amber-400" />
                                  {movie.vote_average.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-zinc-400">
                        No movies found for "{query}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bookmark Icon */}
            {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/my-list"
                className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
                title="My List"
              >
                <Bookmark className="w-4 h-4" />
              </Link>
            </motion.div> */}

            {/* Mobile Hamburger Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 md:hidden rounded-md hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 px-4 pt-4 pb-6 space-y-4 bg-black/95 backdrop-blur-lg text-white overflow-hidden"
          >
            {/* Mobile Search Bar */}
            <div className="relative">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm w-full bg-white/5"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 text-red-500 animate-spin shrink-0" />
                ) : (
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a film..."
                  className="w-full bg-transparent outline-none text-sm text-white"
                />
              </form>

              {/* Mobile Search Results */}
              {query.trim().length > 1 && results.length > 0 && (
                <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-2 space-y-1">
                  {results.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <div className="relative w-8 h-12 rounded overflow-hidden bg-zinc-950 shrink-0">
                        <Image
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                              : "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1920"
                          }
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-white truncate">
                        {movie.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-3 font-medium text-base pt-2">
              {[
                { name: "Tonight", path: "/" },
                { name: "Discover", path: "/discover" },
                { name: "Mood", path: "/mood" },
                { name: "Movie Night", path: "/movie-night" },
              ].map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
