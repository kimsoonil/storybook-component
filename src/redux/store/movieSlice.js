import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movieInfo',
  initialState: {
    movie: {},
    isLoading: false,
    error: ''
  },
  reducers: {
    // getMovie(id) {
    //     return id;
    // },
    getMovie: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getMovieSuccess: (state, { payload }) => {
      state.movie = payload;
      state.isLoading = false;
    },
    getMovieFailure: (state, error) => {
      console.log('reducer error');
      console.log(error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { getMovie, getMovieSuccess, getMovieFailure } = movieSlice.actions;

export default movieSlice.reducer;
