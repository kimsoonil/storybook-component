import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  email: '',
  isLoading: false,
  error: ''
});

const searchEmailSlice = createSlice({
  name: 'searchEmail',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqSearchEmail: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    searchEmailSuccess: (state, { payload }) => {
      state.email = payload.email;
      state.isLoading = false;
    },
    searchEmailFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqSearchEmail, searchEmailSuccess, searchEmailFailure } = searchEmailSlice.actions;

export default searchEmailSlice.reducer;
