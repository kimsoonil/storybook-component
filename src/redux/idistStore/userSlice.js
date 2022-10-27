import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    user: {},
    error: ''
  },
  reducers: {
    // TODO get User
    getUserInit: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },

    // TODO patch user
    patchUserInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    patchUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },

    userFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { getUserInit, getUserSuccess, patchUserSuccess, patchUserInit, userFailure } = userSlice.actions;

export default userSlice.reducer;
