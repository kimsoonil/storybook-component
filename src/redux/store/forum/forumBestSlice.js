import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  bestList: [],
  message: '',
  error: '',
  isLoading: false
});

const forumBestSlice = createSlice({
  name: 'forumBest',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumBest: (state) => {
      state.isLoading = true;
    },
    forumBestSuccess: (state, { payload }) => {
      console.log('payload:::', payload);
      // Object.assign(state., payload);
      state.bestList = payload.data;
      state.isLoading = false;
    },
    forumBestFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumBest, forumBestSuccess, forumBestFailure } = forumBestSlice.actions;

export default forumBestSlice.reducer;
