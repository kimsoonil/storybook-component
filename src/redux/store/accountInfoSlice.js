import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isChangeable: true,
  nickName: '',
  email: '',
  phoneNumber: '',
  snsId: [],
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
      state.isChangeable = payload.isChangeable;
      state.nickName = payload.nickName;
      state.email = payload.email;
      state.snsId = payload.snsId;
      state.phoneNumber = payload.phoneNumber;
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
