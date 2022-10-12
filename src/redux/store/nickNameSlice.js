import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isChangeable: true,
  nickName: '',
  message: '',
  isLoading: false,
  error: ''
});

const nickNameSlice = createSlice({
  name: 'nickName',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqEditNickName: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    editNickNameSuccess: (state, { payload }) => {
      console.log(payload);
      state.isChangeable = payload.isChangeable;
      state.nickName = payload.nickName;
      state.message = payload.message;
      state.isLoading = false;
    },
    editNickNameFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqEditNickName, editNickNameSuccess, editNickNameFailure } = nickNameSlice.actions;

export default nickNameSlice.reducer;
