import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  fourmPost: {},
  fourmPosts: {},
  error: ''
});

const fourmPostSlice = createSlice({
  name: 'fourmPost',
  initialState: initialState(),
  reducers: {
    fourmReset: (state) => {
      Object.assign(state, initialState());
    },
    getFourmPostsInit: (state) => {
      state.isLoading = true;
    },
    getFourmPostsSuccess: (state, { payload }) => {
      state.isLoading = true;
      state.fourmPosts = payload;
    },
    postFourmPostInit: (state) => {
      state.isLoading = true;
    },
    postFourmPostSuccess: (state, { payload }) => {
      state.isLoading = true;
      state.fourmPost = payload;
    },
    fourmPostCommentInit: (state) => {
      state.isLoading = true;
    },
    fourmPostCommentSuccess: (state, { payload }) => {
      state.isLoading = true;
      state.fourmPost = payload;
    },
    fourmPostFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  fourmReset,
  getFourmPostsInit,
  getFourmPostsSuccess,
  postFourmPostInit,
  postFourmPostSuccess,
  fourmPostCommentInit,
  fourmPostCommentSuccess,
  fourmPostFailure
} = fourmPostSlice.actions;

export default fourmPostSlice.reducer;
