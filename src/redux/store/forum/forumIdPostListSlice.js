import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  forumIdPostList: [],
  message: '',
  error: '',
  isLoading: false
});

const forumIdPostListSlice = createSlice({
  name: 'forumIdPostList',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumIdPostList: (state) => {
      state.isLoading = true;
    },
    forumIdPostListSuccess: (state, { payload }) => {
      console.log('payload:::', payload);
      // Object.assign(state., payload);
      state.forumIdPostList = payload.data;
      state.isLoading = false;
    },
    forumIdPostListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumIdPostList, forumIdPostListSuccess, forumIdPostListFailure } =
  forumIdPostListSlice.actions;

export default forumIdPostListSlice.reducer;
