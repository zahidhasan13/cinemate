import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Movie Filters State-er Type Definition
export interface MovieFiltersState {
  selectedGenre: number | null;
  sortBy: string;
  minRating: number;
  selectedYear: string;
  currentPage: number;
}

export interface MovieSliceState {
  filters: MovieFiltersState;
}

// 2. Initial State Definition
const initialState: MovieSliceState = {
  filters: {
    selectedGenre: null,
    sortBy: "popularity.desc",
    minRating: 0,
    selectedYear: "",
    currentPage: 1,
  },
};

// 3. Movie Slice Creation
export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Selected Genre set/unset kora
    setSelectedGenre: (state, action: PayloadAction<number | null>) => {
      state.filters.selectedGenre = action.payload;
      state.filters.currentPage = 1; // Genre change hole page 1 e niye jaoya
    },

    // Sort By option change kora (Popularity, Rating, Release Date)
    setSortBy: (state, action: PayloadAction<string>) => {
      state.filters.sortBy = action.payload;
      state.filters.currentPage = 1;
    },

    // Minimum Rating slider change kora
    setMinRating: (state, action: PayloadAction<number>) => {
      state.filters.minRating = action.payload;
      state.filters.currentPage = 1;
    },

    // Release Year filter change kora
    setSelectedYear: (state, action: PayloadAction<string>) => {
      state.filters.selectedYear = action.payload;
      state.filters.currentPage = 1;
    },

    // Pagination-er Page Number change kora
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.filters.currentPage = action.payload;
    },

    // Sob filter reset kora
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

// Actions Export
export const {
  setSelectedGenre,
  setSortBy,
  setMinRating,
  setSelectedYear,
  setCurrentPage,
  resetFilters,
} = movieSlice.actions;

// Reducer Export
export default movieSlice.reducer;
