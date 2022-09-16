import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLoading: false,
    posts: {},
    error: ''
  },
  reducers: {
    // TODO getPosts
    getPostsInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },

    postFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { getPostsInit, getPostsSuccess, postFailure } = postSlice.actions;

export default postSlice.reducer;
