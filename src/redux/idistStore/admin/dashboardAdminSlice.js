import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  dashboard: {},
  getDashboardLoading: false,
  error: ''
});

const dashboardAdminSlice = createSlice({
  name: 'dashboardAdmin',
  initialState: initialState(),
  reducers: {
    resetDashboardAdmin: (state) => {
      Object.assign(state, initialState());
    },

    getClubDashboardInit: (state) => {
      state.getDashboardLoading = true;
    },
    getClubDashboardSuccess: (state, { payload }) => {
      state.getDashboardLoading = false;
      state.dashboard = payload;
    },
    getClubDashboardFailure: (state, { payload }) => {
      state.getDashboardLoading = false;
      state.error = payload.message;
    }
  }
});

export const {
  resetDashboardAdmin,

  getClubDashboardInit,
  getClubDashboardSuccess,
  getClubDashboardFailure
} = dashboardAdminSlice.actions;

export default dashboardAdminSlice.reducer;
