"use client";

import React from "react";
import Image from "next/image";

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CastSectionProps {
  cast?: CastMember[];
}

const CastSection: React.FC<CastSectionProps> = ({ cast = [] }) => {
  if (!cast || cast.length === 0) {
    return null;
  }

  // Top 12 cast members to show
  const topCast = cast.slice(0, 12);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
        Top Cast
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {topCast.map((actor) => {
          const profileImage = actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : "/placeholder.png";

          return (
            <div
              key={actor.id}
              className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="relative w-full h-48 bg-zinc-800">
                <Image
                  src={profileImage}
                  alt={actor.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 text-center">
                <h3 className="text-white text-xs sm:text-sm font-semibold truncate group-hover:text-red-500 transition-colors">
                  {actor.name}
                </h3>
                <p className="text-gray-400 text-[11px] sm:text-xs truncate mt-0.5">
                  {actor.character || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CastSection;
