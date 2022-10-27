import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  forumInfo: { forumName: '', category: '', bannerUrl: '', thumbnailUrl: '' },
  message: '',
  error: '',
  isLoading: false
});

const forumCreateSlice = createSlice({
  name: 'forumCreate',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumCreate: (state) => {
      state.isLoading = true;
    },
    forumCreateSuccess: (state, { payload }) => {
      console.log(payload);
      // Object.assign(state, initialState());
      state.isLoading = false;
    },
    forumCreateFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumCreate, forumCreateSuccess, forumCreateFailure } = forumCreateSlice.actions;

export default forumCreateSlice.reducer;
