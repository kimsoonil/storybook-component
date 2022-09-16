import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  error: '',
  club: {}
});

const createClubSlice = createSlice({
  name: 'createClub',
  initialState: initialState(),
  reducers: {
    resetCreateClub: (state) => {
      Object.assign(state, initialState());
    },
    createClubInit: (state) => {
      state.isLoading = true;
    },
    createClubSuccess: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      console.log(payload?.data);
      state.club = payload?.data;
    },
    createClubFailure: (state, error) => {
      state.isLoading = false;
      state.error = error.payload.message;
    }
  }
});

export const { resetCreateClub, createClubInit, createClubSuccess, createClubFailure } = createClubSlice.actions;

export default createClubSlice.reducer;
