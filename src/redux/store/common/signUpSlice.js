import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  userInfo: { firstName: '', lastName: '', phoneNumber: '', email: '' },
  accessToken: '',
  isLoading: false,
  error: ''
});

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqSignUp: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state, { payload }) => {
      state.userInfo = payload.user;
      state.accessToken = payload.data.access_token;
      state.isLoading = false;
    },
    signUpFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reqSignUp, signUpSuccess, signUpFailure } = signUpSlice.actions;

export default signUpSlice.reducer;
