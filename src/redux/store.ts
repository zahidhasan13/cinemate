import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tmdbApi } from "./services/tmdbApi";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

// TypeScript Types Export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
