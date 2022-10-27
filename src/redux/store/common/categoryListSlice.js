import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  catList: [],
  isLoading: false,
  error: ''
});

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: initialState(),
  reducers: {
    reqCategoryList: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    categoryListSuccess: (state, { payload }) => {
      console.log('category', payload);
      state.catList = payload.data;
      state.isLoading = false;
    },
    categoryListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reqCategoryList, categoryListSuccess, categoryListFailure } = categoryListSlice.actions;

export default categoryListSlice.reducer;
