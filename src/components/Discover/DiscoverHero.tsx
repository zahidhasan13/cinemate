"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export const DiscoverHero = () => {
  return (
    <section className="relative h-[300px] md:h-[380px] w-full flex items-center justify-center overflow-hidden border-b border-zinc-800">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1920"
          alt="Discover Movies Hero"
          fill
          priority
          className="object-cover opacity-25 scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-transparent to-zinc-950/90" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 text-xs md:text-sm font-medium backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Explore The Universe of Cinema</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
          Discover <span className="text-red-600">Movies</span>
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
          Filter through thousands of titles by genres, ratings, and release years to find your next favorite film.
        </p>
      </div>
    </section>
  );
};