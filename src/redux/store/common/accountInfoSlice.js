import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isChangeable: true,
  nickName: '',
  email: '',
  phoneNumber: '',
  snsId: [],
  forumHistory: ['test1', 'test2', 'test3', 'test4', 'test5'],
  isLoading: false,
  error: ''
});

const accountInfoSlice = createSlice({
  name: 'accountInfo',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqAccountInfo: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    accountInfoSuccess: (state, { payload }) => {
      Object.assign(state, payload);
      state.isLoading = false;
    },
    accountInfoFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqAccountInfo, accountInfoSuccess, accountInfoFailure } = accountInfoSlice.actions;

export default accountInfoSlice.reducer;
