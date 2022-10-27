import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isAvailable: false,
  isLoading: false,
  checkNickMessage: '',
  error: ''
});

const checkNickNameSlice = createSlice({
  name: 'checkNickName',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqCheckNickName: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    checkNickNameSuccess: (state, { payload }) => {
      state.isAvailable = payload.isAvailable;
      state.checkNickMessage = payload.message;
      state.isLoading = false;
    },
    checkNickNameFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqCheckNickName, checkNickNameSuccess, checkNickNameFailure } = checkNickNameSlice.actions;

export default checkNickNameSlice.reducer;
