import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";

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
    // 8. Movie Genres List
    getUpcomingMovie: builder.query({
      query: () => `/movie/upcoming?api_key=${API_KEY}`,
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
} = tmdbApi;
