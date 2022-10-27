import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  accountInfo: {},
  message: '',
  isLoading: false,
  error: ''
});

const changeNicknameSlice = createSlice({
  name: 'changeNickname',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqChangeNickname: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    changeNicknameSuccess: (state, { payload }) => {
      console.log(payload);
      state.accountInfo = payload;
      state.isLoading = false;
    },
    changeNicknameFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqChangeNickname, changeNicknameSuccess, changeNicknameFailure } = changeNicknameSlice.actions;

export default changeNicknameSlice.reducer;
