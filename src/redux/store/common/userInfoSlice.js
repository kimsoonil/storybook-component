import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  firstName: '',
  lastName: '',
  phoneNumber: '01012341234',
  email: 'test@test.com',
  message: '',
  isLoading: false,
  error: ''
});

const signUpSlice = createSlice({
  name: 'userInfo',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqSignUp: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state, { payload }) => {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.phoneNumber = payload.phoneNumber;
      state.email = payload.email;
      state.message = payload.message;
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
