import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  club: {},
  getClubLoading: false,
  postClubLoading: false,
  patchBannerImageLoading: false,
  patchProfileImageLoading: false,
  patchTagsLoading: false,
  postBoardGroupLoading: false,
  error: ''
});

const commonAdminSlice = createSlice({
  name: 'commonAdmin',
  initialState: initialState(),
  reducers: {
    resetCommonAdmin: (state) => {
      Object.assign(state, initialState());
    },

    getClubInit: (state) => {
      state.getClubLoading = true;
    },
    getClubSuccess: (state, { payload }) => {
      state.getClubLoading = false;
      state.club = payload;
    },
    getClubFailure: (state, { payload }) => {
      state.getClubLoading = false;
      state.error = payload.message;
    },

    postClubInit: (state) => {
      state.postClubLoading = true;
    },
    postClubSuccess: (state, { payload }) => {
      state.postClubLoading = false;
      state.club = payload;
    },
    postClubFailure: (state, { payload }) => {
      state.postClubLoading = false;
      state.error = payload.message;
    },

    patchClubBannerImageInit: (state) => {
      state.patchBannerImageLoading = true;
    },
    patchClubBannerImageSuccess: (state, { payload }) => {
      state.patchBannerImageLoading = false;
      state.club = payload;
    },
    patchClubBannerImageFailure: (state, { payload }) => {
      state.patchBannerImageLoading = false;
      state.error = payload.message;
    },

    patchClubProfileImageInit: (state) => {
      state.patchProfileImageLoading = true;
    },
    patchClubProfileImageSuccess: (state, { payload }) => {
      state.patchProfileImageLoading = false;
      state.club = payload;
    },
    patchClubProfileImageFailure: (state, { payload }) => {
      state.patchProfileImageLoading = false;
      state.error = payload.message;
    },

    patchClubTagsInit: (state) => {
      state.patchTagsLoading = true;
    },
    patchClubTagsSuccess: (state, { payload }) => {
      state.patchTagsLoading = false;
      state.club = payload;
    },
    patchClubTagsFailure: (state, { payload }) => {
      state.patchTagsLoading = false;
      state.error = payload.message;
    }
  }
});

export const {
  resetCommonAdmin,

  getClubInit,
  getClubSuccess,
  getClubFailure,

  postClubInit,
  postClubSuccess,
  postClubFailure,

  patchClubBannerImageInit,
  patchClubBannerImageSuccess,
  patchClubBannerImageFailure,

  patchClubProfileImageInit,
  patchClubProfileImageSuccess,
  patchClubProfileImageFailure,

  patchClubTagsInit,
  patchClubTagsSuccess,
  patchClubTagsFailure
} = commonAdminSlice.actions;

export default commonAdminSlice.reducer;
