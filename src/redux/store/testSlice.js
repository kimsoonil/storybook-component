import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'testInfo',
  initialState: {
    Test: {},
    isLoading: false,
    error: ''
  },
  reducers: {
    getTest: (state) => {
      state.isLoading = true;
    },
    getTestSuccess: (state) => {
      state.isLoading = false;
    },
    getTestFailure: (state, error) => {
      console.log('reducer error');
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { getTest, getTestSuccess, getTestFailure } = testSlice.actions;

export default testSlice.reducer;
