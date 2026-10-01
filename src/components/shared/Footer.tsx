"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Github,
  Film,
  X, // Twitter er bodole X icon use kora hoyeche
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-red-600 font-extrabold text-2xl tracking-wider"
            >
              <Film className="w-8 h-8 " />
              <span className="text-white">CineMate</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Explore thousands of movies, TV shows, and exclusive trailers.
              Your ultimate destination for movies and entertainment.
            </p>
            {/* Social Media Links */}
            {/* <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <X className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
                aria-label="Github"
              >
                <Github className="w-4 h-4" />
              </a>
            </div> */}
          </div>

          {/* Column 1: Quick Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="hover:text-red-500 transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/tv-shows"
                  className="hover:text-red-500 transition-colors"
                >
                  TV Shows
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="hover:text-red-500 transition-colors"
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/top-rated"
                  className="hover:text-red-500 transition-colors"
                >
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Genres */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Genres
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/genre/action"
                  className="hover:text-red-500 transition-colors"
                >
                  Action
                </Link>
              </li>
              <li>
                <Link
                  href="/genre/comedy"
                  className="hover:text-red-500 transition-colors"
                >
                  Comedy
                </Link>
              </li>
              <li>
                <Link
                  href="/genre/drama"
                  className="hover:text-red-500 transition-colors"
                >
                  Drama
                </Link>
              </li>
              <li>
                <Link
                  href="/genre/horror"
                  className="hover:text-red-500 transition-colors"
                >
                  Horror
                </Link>
              </li>
              <li>
                <Link
                  href="/genre/sci-fi"
                  className="hover:text-red-500 transition-colors"
                >
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Support & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/help"
                  className="hover:text-red-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-red-500 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-red-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-preferences"
                  className="hover:text-red-500 transition-colors"
                >
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} CINEMATE. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Powered by <span className="text-white font-medium">TMDB API</span>{" "}
            & Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
