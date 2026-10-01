import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";

// Discover Query Params Interface Definition
export interface DiscoverParams {
  page?: number;
  sort_by?: string;
  with_genres?: number | string;
  "vote_average.gte"?: number;
  "vote_count.gte"?: number;
  primary_release_year?: string | number;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // 1. Trending Movies
    getTrendingMovies: builder.query({
      query: (timeWindow = "day") =>
        `/trending/movie/${timeWindow}?api_key=${API_KEY}`,
    }),

    // 2. Popular Movies
    getPopularMovies: builder.query({
      query: (page = 1) => `/movie/popular?api_key=${API_KEY}&page=${page}`,
    }),

    // 3. Top Rated Movies
    getTopRatedMovies: builder.query({
      query: (page = 1) => `/movie/top_rated?api_key=${API_KEY}&page=${page}`,
    }),

    // 4. Movie Details
    getMovieDetails: builder.query({
      query: (id: string | number) =>
        `/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`,
    }),

    // 5. Search Movies
    searchMovies: builder.query({
      query: ({ query, page = 1 }: { query: string; page?: number }) =>
        `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query,
        )}&page=${page}`,
    }),

    // 6. Popular TV Shows
    getPopularTVShows: builder.query({
      query: (page = 1) => `/tv/popular?api_key=${API_KEY}&page=${page}`,
    }),

    // 7. Movie Genres List
    getMovieGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${API_KEY}`,
    }),

    // 8. Upcoming Movies List
    getUpcomingMovie: builder.query({
      query: (page = 1) => `/movie/upcoming?api_key=${API_KEY}&page=${page}`,
    }),

    // 9. Discover Movie (Dynamic Filter Enabled)
    getDiscoverMovie: builder.query({
      query: (params: DiscoverParams = {}) => {
        const queryParams = new URLSearchParams({
          api_key: API_KEY || "",
          page: String(params.page || 1),
          sort_by: params.sort_by || "popularity.desc",
        });

        if (params.with_genres) {
          queryParams.append("with_genres", String(params.with_genres));
        }

        if (params["vote_average.gte"]) {
          queryParams.append(
            "vote_average.gte",
            String(params["vote_average.gte"]),
          );
        }

        if (params["vote_count.gte"]) {
          queryParams.append(
            "vote_count.gte",
            String(params["vote_count.gte"]),
          );
        }

        if (params.primary_release_year) {
          queryParams.append(
            "primary_release_year",
            String(params.primary_release_year),
          );
        }

        return `/discover/movie?${queryParams.toString()}`;
      },
    }),

    // 10. Get Movies By Mood
    getMoviesByMood: builder.query({
      query: (genreIds: string) =>
        `/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&sort_by=popularity.desc&vote_count.gte=100`,
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieDetailsQuery,
  useSearchMoviesQuery,
  useGetPopularTVShowsQuery,
  useGetMovieGenresQuery,
  useGetUpcomingMovieQuery,
  useGetDiscoverMovieQuery,
  useGetMoviesByMoodQuery,
  useLazyGetDiscoverMovieQuery,
} = tmdbApi;
