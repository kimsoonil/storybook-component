import { createSlice, current } from '@reduxjs/toolkit';

const initialState = () => ({
  list: [],
  message: '',
  error: '',
  isLoading: false
});

const latestPostsSlice = createSlice({
  name: 'latestPosts',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqlatestPosts: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    latestPostsSuccess: (state, { payload }) => {
      Object.assign(state, payload);
      state.isLoading = false;
    },
    latestPostsFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    setLikePost: (state, { payload }) => {
      const { postId, likeCnt } = payload;
      console.log(payload);
      const updatedList = current(state.list).map((item) =>
        item.postId === postId ? { ...item, likeCnt, isLiked: true } : item
      );
      state.list = updatedList;
    }
  }
});

export const { reset, reqlatestPosts, latestPostsSuccess, latestPostsFailure, setLikePost } = latestPostsSlice.actions;

export default latestPostsSlice.reducer;
