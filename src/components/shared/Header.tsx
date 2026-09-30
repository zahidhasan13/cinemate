"use client";

import { Bookmark, Film, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            {/* Search Input */}
            <form className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-sm w-48 lg:w-64 focus-within:ring-1 focus-within:ring-red-500 transition-all duration-300">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Find a film..."
                className="w-full bg-transparent outline-none placeholder:text-gray-400 text-sm text-white"
              />
            </form>

            {/* Bookmark Icon */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/my-list"
                className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
                title="My List"
              >
                <Bookmark className="w-4 h-4" />
              </Link>
            </motion.div>

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

      {/* Mobile Menu Content with AnimatePresence */}
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
            <form className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm w-full bg-white/5">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Find a film..."
                className="w-full bg-transparent outline-none text-sm text-white"
              />
            </form>

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
