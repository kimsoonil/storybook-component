import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  movie: {},
  isLoading: false,
  error: ''
});

const movieSlice = createSlice({
  name: 'movieInfo',
  initialState: initialState(),
  reducers: {
    resetMovie: (state) => {
      Object.assign(state, initialState());
    },
    getMovie: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    getMovieSuccess: (state, { payload }) => {
      state.movie = payload;
      state.isLoading = false;
    },
    getMovieFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    }
  }
});

export const { resetMovie, getMovie, getMovieSuccess, getMovieFailure } = movieSlice.actions;

export default movieSlice.reducer;
