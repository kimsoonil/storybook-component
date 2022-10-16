import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isSuccess: false,
  message: false,
  isLoading: false,
  error: ''
});

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqChangePassword: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    changePasswordSuccess: (state, { payload }) => {
      state.isSuccess = payload.isSuccess;
      state.message = payload.message;
      state.isLoading = false;
    },
    changePasswordFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqChangePassword, changePasswordSuccess, changePasswordFailure } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
