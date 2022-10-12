import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  authSns: {},
  user: {},
  accessToken: '',
  isLoading: false,
  error: ''
});

const logInSlice = createSlice({
  name: 'logIn',
  initialState: initialState(),
  reducers: {
    reqLogIn: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    logInSuccess: (state, { payload }) => {
      console.log(payload);
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.isLoading = false;
    },
    logInFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    reqAuthSns: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    authSnsSuccess: (state, { payload }) => {
      console.log(`logIn slice : ${payload}`);
      state.authSns = payload;
      state.isLoading = false;
    },
    authSnsFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    reqLogOut: (state) => {
      state.isLoading = true;
    },
    logOutSuccess: (state) => {
      Object.assign(state, initialState());
      state.isLoading = false;
    },
    logOutFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  reqLogIn,
  logInSuccess,
  logInFailure,
  reqLogOut,
  logOutSuccess,
  logOutFailure,
  reqAuthSns,
  authSnsSuccess,
  authSnsFailure
} = logInSlice.actions;

export default logInSlice.reducer;
