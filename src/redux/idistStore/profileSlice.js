import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  profile: {},
  error: ''
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState(),
  reducers: {
    resetProfile: (state) => {
      Object.assign(state, initialState());
    },
    getProfileInit: (state) => {
      state.isLoading = true;
    },
    getProfileSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    },
    profileFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { resetProfile, getProfileInit, getProfileSuccess, profileFailure } = profileSlice.actions;

export default profileSlice.reducer;
