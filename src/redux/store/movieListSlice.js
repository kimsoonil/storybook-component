import { createSlice } from '@reduxjs/toolkit';

const movieListSlice = createSlice({
  name: 'movieList',
  initialState: {
    moviesList: [],
    isLoading: false,
    error: ''
  },
  reducers: {
    getMovieList: (state) => {
      console.log('getMovieList request');
      state.isLoading = true;
    },
    getMovieListSuccess: (state, { payload }) => {
      state.moviesList = payload;
      state.isLoading = false;
    },
    getMovieListFailure: (state, { payload }) => {
      console.log('error');
      console.log(payload);
      state.error = payload;
      state.isLoading = false;
    }
  }
});

export const { getMovieList, getMovieListSuccess, getMovieListFailure } = movieListSlice.actions;

export default movieListSlice.reducer;
