import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  tags: {},
  error: ''
});

const tagSlice = createSlice({
  name: 'clubs',
  initialState: initialState(),
  reducers: {
    // TODO getClubs
    getTagsInit: (state) => {
      state.isLoading = true;
    },
    getTagsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.tags = payload;
    },

    tagsFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { getTagsInit, getTagsSuccess, tagsFailure } = tagSlice.actions;

export default tagSlice.reducer;
