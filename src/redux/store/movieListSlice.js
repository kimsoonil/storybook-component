import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  moviesList: [],
  isLoading: false,
  error: ''
});

const movieListSlice = createSlice({
  name: 'movieList',
  initialState: initialState(),
  reducers: {
    getMovieList: (state) => {
      Object.assign(state, initialState());
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

export const { reset, getMovieList, getMovieListSuccess, getMovieListFailure } = movieListSlice.actions;

export default movieListSlice.reducer;
