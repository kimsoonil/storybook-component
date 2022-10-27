import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  email: '',
  isEmailSend: false,
  isLoading: false,
  error: ''
});

const authEmailSlice = createSlice({
  name: 'authEmail',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqAuthEmail: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    authEmailSuccess: (state, { payload }) => {
      state.isEmailSend = payload.status;
      state.email = payload.email;
      state.isLoading = false;
    },
    authEmailFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqAuthEmail, authEmailSuccess, authEmailFailure } = authEmailSlice.actions;

export default authEmailSlice.reducer;
