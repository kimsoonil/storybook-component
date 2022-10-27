import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isPhoneNumberSend: false,
  isLoading: false,
  error: ''
});

const authPhoneNumberSlice = createSlice({
  name: 'authPhoneNumber',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqAuthPhoneNumber: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    authPhoneNumberSuccess: (state, { payload }) => {
      state.isPhoneNumberSend = payload.status;
      state.isLoading = false;
    },
    authPhoneNumberFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqAuthPhoneNumber, authPhoneNumberSuccess, authPhoneNumberFailure } =
  authPhoneNumberSlice.actions;

export default authPhoneNumberSlice.reducer;
