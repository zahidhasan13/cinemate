import React from "react";

const HeroSkeleton = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-slate-950 text-white overflow-hidden animate-pulse">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 w-full h-full bg-slate-900" />

      {/* Overlay Gradients to match actual Hero component */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      {/* Content Skeleton Layout */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          {/* Rating Badge & Year Skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-7 w-16 bg-slate-800/80 rounded-md border border-white/5" />
            <div className="h-5 w-12 bg-slate-800/80 rounded" />
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="h-9 sm:h-12 w-3/4 sm:w-2/3 bg-slate-800/90 rounded-lg" />
          </div>

          {/* Overview Lines Skeleton */}
          <div className="space-y-2 pt-1">
            <div className="h-4 w-full bg-slate-800/70 rounded" />
            <div className="h-4 w-11/12 bg-slate-800/70 rounded" />
            <div className="h-4 w-4/5 bg-slate-800/70 rounded" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-4 pt-3">
            {/* Watch Trailer Button Skeleton */}
            <div className="h-12 w-40 bg-slate-800/90 rounded-full" />
            {/* More Info Button Skeleton */}
            <div className="h-12 w-36 bg-slate-800/60 rounded-full border border-white/10" />
          </div>
        </div>
      </div>

      {/* Bottom Swiper Pagination Dots Skeleton */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        <div className="w-8 h-2.5 bg-red-600 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
      </div>
    </section>
  );
};

export default HeroSkeleton;
