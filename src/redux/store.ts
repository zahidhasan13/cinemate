import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "./services/tmdbApi";
import movieReducer from "./features/movieSlice"; // Apnar movieSlice-er path

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    movies: movieReducer, // State.movies define korar jonno eita zaroori
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
