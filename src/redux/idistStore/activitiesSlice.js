import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  activities: {},
  error: ''
});

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: initialState(),

  reducers: {
    getActivitiesInit: (state) => {
      state.isLoading = true;
    },
    activitiesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.activities = payload;
    },
    activitiesFailure: (state) => {
      state.isLoading = false;
    }
  }
});

export const { getActivitiesInit, activitiesSuccess, activitiesFailure } = activitiesSlice.actions;

export default activitiesSlice.reducer;
