import { createSlice } from '@reduxjs/toolkit';
import { loadState } from 'constants';

const initialState = () => ({
  isLoading: false,
  error: '',
  list: []
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState(),
  reducers: {
    categoriesInit: (state) => {
      state.isLoading = true;
    },
    categoriesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload.data;
    },
    categoriesFailure: (state, error) => {
      state.isLoading = false;
      state.error = error.payload.message;
    }
  }
});

export const { reset, categoriesInit, categoriesSuccess, categoriesFailure } = categoriesSlice.actions;

export default categoriesSlice.reducer;
