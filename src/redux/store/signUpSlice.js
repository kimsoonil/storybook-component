import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  userInfo: { firstName: '', lastName: '', phoneNumber: '01012341234', email: 'test@test.com' },
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
      state.userInfo = payload;
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
