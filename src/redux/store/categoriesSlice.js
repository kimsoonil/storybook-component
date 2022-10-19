import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    isLoading: false,
    categories: {},
    error: ''
  },
  reducers: {
    // TODO getClubs
    getCategoriesInit: (state) => {
      state.isLoading = true;
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },

    categoriesFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { getCategoriesInit, getCategoriesSuccess, categoriesFailure } = categoriesSlice.actions;

export default categoriesSlice.reducer;
