import { createSlice } from '@reduxjs/toolkit';
import { immerParse } from 'utils';

const initialState = () => ({
  reportChoices: [],

  getReportChoicesLoading: false,
  postReportChoiceLoading: false,
  patchReportChoiceLoading: false,
  deleteReportChoiceLoading: false,

  error: ''
});

const reportsSettingAdminSlice = createSlice({
  name: 'reportsSetting',
  initialState: initialState(),
  reducers: {
    resetReportsSettingAdmin: (state) => {
      Object.assign(state, initialState());
    },

    getReportChoicesInit: (state) => {
      state.getReportChoicesLoading = true;
    },
    getReportChoicesSuccess: (state, { payload }) => {
      state.getReportChoicesLoading = false;
      state.reportChoices = payload;
    },
    getReportChoicesFailure: (state, { payload }) => {
      state.getReportChoicesLoading = false;
      state.error = payload.message;
    },

    patchReportChoiceInit: (state) => {
      state.patchReportChoiceLoading = true;
    },
    patchReportChoiceSuccess: (state, { payload }) => {
      state.patchReportChoiceLoading = false;
      // state.reportChoices = payload;
    },
    patchReportChoiceFailure: (state, { payload }) => {
      state.patchReportChoiceLoading = false;
      state.error = payload.message;
    },

    postReportChoiceInit: (state) => {
      state.postReportChoiceLoading = true;
    },
    postReportChoiceSuccess: (state, { payload }) => {
      state.postReportChoiceLoading = false;
      // state.reportChoices = payload;
    },
    postReportChoiceFailure: (state, { payload }) => {
      state.postReportChoiceLoading = false;
      state.error = payload.message;
    },

    deleteReportChoiceInit: (state) => {
      state.deleteReportChoiceLoading = true;
    },
    deleteReportChoiceSuccess: (state, { payload }) => {
      state.deleteReportChoiceLoading = false;
      // state.reportChoices = payload;
    },
    deleteReportChoiceFailure: (state, { payload }) => {
      state.deleteReportChoiceLoading = false;
      state.error = payload.message;
    }
  }
});

export const {
  resetReportsSettingAdmin,
  getReportChoicesInit,
  getReportChoicesSuccess,
  getReportChoicesFailure,
  patchReportChoiceInit,
  patchReportChoiceSuccess,
  patchReportChoiceFailure,
  postReportChoiceInit,
  postReportChoiceSuccess,
  postReportChoiceFailure,
  deleteReportChoiceInit,
  deleteReportChoiceSuccess,
  deleteReportChoiceFailure
} = reportsSettingAdminSlice.actions;

export default reportsSettingAdminSlice.reducer;
