import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isSuccess: false,
  isActive: false,
  message: '',
  error: '',
  isLoading: false
});

const forumBookmarkSlice = createSlice({
  name: 'forumPin',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumPin: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    forumPinSuccess: (state, { payload }) => {
      // Object.assign(state, payload);
      console.log('forumPinSuccess:::', payload.data.is_active);
      state.isSuccess = true;
      state.isActive = payload.data.is_active;
      state.isLoading = false;
    },
    reqForumUnpin: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    forumUnpinSuccess: (state, { payload }) => {
      // Object.assign(state, payload);
      console.log('forumUnpinSuccess:::', payload.data.is_active);
      state.isSuccess = true;
      state.isActive = payload.data.is_active;
      state.isLoading = false;
    },
    forumPinFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumPin, forumPinSuccess, reqForumUnpin, forumUnpinSuccess, forumPinFailure } =
  forumBookmarkSlice.actions;

export default forumBookmarkSlice.reducer;
