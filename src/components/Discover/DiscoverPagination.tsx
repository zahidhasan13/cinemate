"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setCurrentPage } from "@/redux/features/movieSlice"; // Path anusare change korun
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DiscoverPaginationProps {
  currentPage: number;
  totalPages: number;
}

export const DiscoverPagination: React.FC<DiscoverPaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Max 500 pages limit (TMDB API max page limit 500)
  const maxPages = Math.min(totalPages, 500);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= maxPages) {
      dispatch(setCurrentPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-8 flex items-center justify-center gap-2">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Dynamic Page Buttons */}
      {Array.from({ length: Math.min(5, maxPages) }, (_, i) => {
        let pageNum = currentPage;
        if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= maxPages - 2) {
          pageNum = maxPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        if (pageNum < 1 || pageNum > maxPages) return null;

        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
              currentPage === pageNum
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        disabled={currentPage >= maxPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
