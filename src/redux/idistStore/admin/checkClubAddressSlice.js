import { createSlice } from '@reduxjs/toolkit';
import { loadState } from 'views/Admin';

const initialState = () => ({
  status: loadState.NONE,
  isLoading: false,
  message: '',
  error: ''
});

const checkClubAddressSlice = createSlice({
  name: 'checkClubAddress',
  initialState: initialState(),
  reducers: {
    resetCheckClubAddress: (state) => {
      Object.assign(state, initialState());
    },
    reqCheckClubAddress: (state) => {
      state.isLoading = true;
    },
    checkClubAddressSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = loadState.SUCCESS;
      state.error = '';
    },
    checkClubAddressFailure: (state, error) => {
      state.isLoading = false;
      state.status = loadState.ERROR;
      state.error = error.payload?.errors?.non_field_errors?.[0];
    }
  }
});

export const { resetCheckClubAddress, reqCheckClubAddress, checkClubAddressSuccess, checkClubAddressFailure } =
  checkClubAddressSlice.actions;

export default checkClubAddressSlice.reducer;
