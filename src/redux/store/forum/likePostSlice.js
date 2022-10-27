import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  postId: 0,
  likeCnt: 0,
  isLoading: false,
  error: ''
});

const likePostSlice = createSlice({
  name: 'likePost',
  initialState: initialState(),
  reducers: {
    reqLikePost: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    likePostSuccess: (state, { payload }) => {
      console.log(payload.likeCnt);
      state.likeCnt = payload.likeCnt;
      state.isLoading = false;
    },
    likePostFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reqLikePost, likePostSuccess, likePostFailure } = likePostSlice.actions;

export default likePostSlice.reducer;
