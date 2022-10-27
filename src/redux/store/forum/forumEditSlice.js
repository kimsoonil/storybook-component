import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  forumInfo: { forumName: '', category: '', bannerUrl: '', thumbnailUrl: '' },
  message: '',
  error: '',
  isLoading: false
});

const forumEditSlice = createSlice({
  name: 'forumEdit',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumEdit: (state) => {
      state.isLoading = true;
    },
    forumEditSuccess: (state, { payload }) => {
      console.log(payload);
      Object.assign(state, initialState());
      state.isLoading = false;
    },
    forumEditFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumEdit, forumEditSuccess, forumEditFailure } = forumEditSlice.actions;

export default forumEditSlice.reducer;
