import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  authSns: {},
  isConfirm: false,
  isLoading: false,
  error: ''
});

const authCodeSlice = createSlice({
  name: 'authCode',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqAuthCode: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    authCodeSuccess: (state, { payload }) => {
      state.isConfirm = payload.status;
      state.isLoading = false;
    },
    authCodeFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqAuthCode, authCodeSuccess, authCodeFailure } = authCodeSlice.actions;

export default authCodeSlice.reducer;
