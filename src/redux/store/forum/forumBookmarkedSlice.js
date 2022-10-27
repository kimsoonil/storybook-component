import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  bookMarkedList: [],
  message: '',
  error: '',
  isLoading: false
});

const forumBookmarkedSlice = createSlice({
  name: 'forumBookMarkedList',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumBookMarkedList: (state) => {
      state.isLoading = true;
    },
    forumBookMarkedListSuccess: (state, { payload }) => {
      // Object.assign(state, payload);
      state.bookMarkedList = payload.data;
    },
    forumBookMarkedListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumBookMarkedList, forumBookMarkedListSuccess, forumBookMarkedListFailure } =
  forumBookmarkedSlice.actions;

export default forumBookmarkedSlice.reducer;
