import { createSlice } from '@reduxjs/toolkit';

const checkEmailSlice = createSlice({
  name: 'checkEmail',
  initialState: {
    isLoading: false,
    isDuplicateEmail: false,
    error: ''
  },
  reducers: {
    reqCheckEmail: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    checkEmailSuccess: (state, { payload }) => {
      state.isDuplicateEmail = payload.status;
      state.isLoading = false;
    },
    checkEmailFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reqCheckEmail, checkEmailSuccess, checkEmailFailure } = checkEmailSlice.actions;

export default checkEmailSlice.reducer;
