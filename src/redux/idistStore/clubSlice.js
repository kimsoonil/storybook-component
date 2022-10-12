import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  clubs: {},
  myclubs: {},
  clubId: {},
  members: {},
  recommend: {},
  boardGroups: {
    isLoading: false
  },
  postBoardGroupTrigger: {},
  dashboard: {
    isLoading: false
  },
  profile: {},
  error: ''
});

const clubSlice = createSlice({
  name: 'clubs',
  initialState: initialState(),
  reducers: {
    resetClub: (state) => {
      Object.assign(state, initialState());
    },
    // TODO getClubs
    getClubsInit: (state) => {
      state.isLoading = true;
    },
    getClubsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },
    getMyClubsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.myclubs = payload;
    },
    postClubInit: (state) => {
      state.isLoading = true;
    },
    postClubSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },
    getClubsRecommendInit: (state) => {
      state.isLoading = true;
    },
    getClubsRecommendSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.recommend = payload;
    },
    // TODO getClub
    getClubInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getClubSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubId = payload;
    },

    // TODO postClub Pin
    postClubPinInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postClubPinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },

    // TODO postClub Unpin
    postClubUnpinInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postClubUnpinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },

    // TODO postClub Join
    postClubJoinInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postClubJoinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },

    getClubBoardGroupsInit: (state) => {
      state.boardGroups.isLoading = true;
    },

    getClubBoardGroupsSuccess: (state, { payload }) => {
      state.boardGroups = { isLoading: false, ...payload };
    },

    postClubBoardGroupInit: () => {},
    postClubBoardGroupSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.postBoardGroupTrigger = payload.data;
      // const prevBoardGroups = JSON.parse(JSON.stringify(state.boardGroups.data));
      // state.boardGroups = { ...payload, data: [...prevBoardGroups, ...[payload.data]] };
    },

    patchClubBannerImageInit: (state) => {
      state.isLoading = true;
    },
    patchClubProfileImageInit: (state) => {
      state.isLoading = true;
    },

    postClubShareInit: (state) => {
      state.isLoading = true;
    },
    postClubShareSuccess: (state) => {
      state.isLoading = false;
    },

    getClubDashboardInit: (state) => {
      state.dashboard.isLoading = true;
    },
    getClubDashboardSuccess: (state, { payload }) => {
      state.dashboard = { isLoading: false, ...payload };
    },

    patchClubInit: (state) => {
      state.isLoading = true;
    },
    patchClubSuccess: (state) => {
      state.isLoading = false;
    },

    deleteClubTemporaryInit: (state) => {
      state.isLoading = true;
    },
    deleteClubTemporarySuccess: (state, { payload }) => {
      console.log('deleteClubTemporarySuccess : ', payload);
      state.isLoading = false;
    },
    getclubProfilesInit: (state) => {
      state.isLoading = true;
    },
    getclubProfilesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    },
    clubFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  resetClub,
  getClubsInit,
  getClubsSuccess,
  getMyClubsSuccess,
  postClubInit,
  postClubSuccess,
  getClubsRecommendInit,
  getClubsRecommendSuccess,
  getClubInit,
  getClubSuccess,
  postClubPinInit,
  postClubPinSuccess,
  postClubUnpinInit,
  postClubUnpinSuccess,
  postClubJoinInit,
  postClubJoinSuccess,
  getClubBoardGroupsInit,
  getClubBoardGroupsSuccess,
  postClubBoardGroupInit,
  postClubBoardGroupSuccess,
  patchClubBannerImageInit,
  patchClubProfileImageInit,
  postClubShareInit,
  postClubShareSuccess,
  getClubDashboardInit,
  getClubDashboardSuccess,
  patchClubInit,
  patchClubSuccess,
  deleteClubTemporaryInit,
  deleteClubTemporarySuccess,
  getclubProfilesInit,
  getclubProfilesSuccess,
  clubFailure
} = clubSlice.actions;

export default clubSlice.reducer;
