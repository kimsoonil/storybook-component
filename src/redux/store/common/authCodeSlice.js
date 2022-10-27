import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  authSns: {},
  code: '',
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
      state.code = '';
    },
    reqAuthCode: (state) => {
      state.isLoading = true;
    },
    authCodeSuccess: (state, { payload }) => {
      state.code = payload.code;
      state.isConfirm = true;
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
