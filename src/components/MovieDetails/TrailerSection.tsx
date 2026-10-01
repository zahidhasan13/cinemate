"use client";

import React from "react";

interface TrailerSectionProps {
  videoId?: string | null;
}

const TrailerSection: React.FC<TrailerSectionProps> = ({ videoId }) => {
  if (!videoId) {
    return null;
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      id="trailer"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 border-l-4 border-red-600 pl-3">
        Official Trailer
      </h2>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10">
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Movie Official Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default TrailerSection;
