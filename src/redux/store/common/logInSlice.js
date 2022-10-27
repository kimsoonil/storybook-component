import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isAuthSns: false,
  user: {},
  loginFailCnt: 0,
  accessToken: '',
  isLoading: false,
  error: ''
});

const logInSlice = createSlice({
  name: 'logIn',
  initialState: initialState(),
  reducers: {
    reqLogIn: (state) => {
      state.isLoading = true;
    },
    logInSuccess: (state, { payload }) => {
      console.log(payload);
      state.user = payload.userInfo;
      state.accessToken = payload.authToken;
      state.loginFailCnt = 0;
      state.error = '';
      state.isLoading = false;
    },
    logInFailure: (state, error) => {
      console.log('login fail');
      state.loginFailCnt += 1;
      state.error = error.payload.message;
      state.isLoading = false;
    },
    reqAuthSns: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    authSnsSuccess: (state, { payload }) => {
      console.log(`logIn slice : ${payload}`);
      state.isAuthSns = true;
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
    },
    signUpAfterAutoLogin: (state, { payload }) => {
      console.log('login Slice:::', payload);
      state.user = payload.userInfo;
      state.accessToken = payload.accessToken;
      state.isLoading = false;
    },
    updateNicknameStatus: (state) => {
      state.user.nickname_is_new = false;
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
  authSnsFailure,
  signUpAfterAutoLogin,
  updateNicknameStatus
} = logInSlice.actions;

export default logInSlice.reducer;
