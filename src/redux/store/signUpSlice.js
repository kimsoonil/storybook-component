import { createSlice } from '@reduxjs/toolkit';

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    signUp: {},
    isLoading: false,
    error: ''
  },
  reducers: {
    // getMovie(id) {
    //     return id;
    // },
    checkEmail: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    reqSignUp: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    signUpSuccess: (state, { payload }) => {
      // API 요청이 성공적이면 데이터를 payload에 들어온다.
      state.signUp = payload;
      state.isLoading = false;
    },
    signUpFailure: (state, error) => {
      console.log('reducer error');
      console.log(error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reqSignUp, signUpSuccess, signUpFailure } = signUpSlice.actions;

export default signUpSlice.reducer;
