import { createSlice } from '@reduxjs/toolkit';
import { loadState } from 'views/Admin';

const initialState = () => ({
  status: loadState.NONE,
  isLoading: false,
  message: '',
  error: ''
});

const checkClubNameSlice = createSlice({
  name: 'checkClubName',
  initialState: initialState(),
  reducers: {
    resetCheckClubName: (state) => {
      Object.assign(state, initialState());
    },
    reqCheckClubName: (state) => {
      state.isLoading = true;
    },
    checkClubNameSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = loadState.SUCCESS;
      state.error = '';
    },
    checkClubNameFailure: (state, error) => {
      state.isLoading = false;
      state.status = loadState.ERROR;
      state.error = error.payload?.message;
    }
  }
});

export const { resetCheckClubName, reqCheckClubName, checkClubNameSuccess, checkClubNameFailure } =
  checkClubNameSlice.actions;

export default checkClubNameSlice.reducer;
