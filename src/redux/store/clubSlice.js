import { createSlice } from '@reduxjs/toolkit';

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    isLoading: false,
    clubs: {},
    clubId: {},
    members: {},
    boardGroups: {},
    error: ''
  },
  reducers: {
    // TODO getClubs
    getClubInit: (state) => {
      state.isLoading = true;
    },
    getClubSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },

    // TODO postClubs
    postClubInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postClubSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },
    // TODO getIdClub
    getIdClubInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getIdClubSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubId = payload;
    },

    // TODO getIdClub
    getClubMeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getIdClubMeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubId = payload;
    },

    // TODO postClubsPin
    postClubPinInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postClubPinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubs = payload;
    },

    // TODO getClubMembers
    getClubMembersInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getClubMembersSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.members = payload;
    },

    // TODO getClubBoardGroups
    getClubBoardGroupsInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getClubBoardGroupsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.boardGroups = payload;
    },

    postClubBoardGroupInit: (state) => {
      state.isLoading = true;
    },
    postClubBoardGroupSuccess: (state, { payload }) => {
      state.isLoading = false;
      const prevBoardGroups = JSON.parse(JSON.stringify(state.boardGroups.data));
      state.boardGroups = { ...payload, data: [...prevBoardGroups, ...[payload.data]] };
    },

    patchIdClubBannerImageInit: (state) => {
      state.isLoading = true;
    },
    patchIdClubProfileImageInit: (state) => {
      state.isLoading = true;
    },

    postClubShareInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postClubShareSuccess: (state, { payload }) => {
      state.isLoading = false;
    },

    clubFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  getClubInit,
  getClubSuccess,

  postClubInit,
  postClubSuccess,

  getIdClubInit,
  getIdClubSuccess,
  getClubMeInit,
  getClubMeSuccess,
  postClubPinInit,
  postClubPinSuccess,

  getClubMembersInit,
  getClubMembersSuccess,

  getClubBoardGroupsInit,
  getClubBoardGroupsSuccess,

  postClubBoardGroupInit,
  postClubBoardGroupSuccess,

  patchIdClubBannerImageInit,
  patchIdClubProfileImageInit,

  postClubShareInit,
  postClubShareSuccess,
  clubFailure
} = clubSlice.actions;

export default clubSlice.reducer;
