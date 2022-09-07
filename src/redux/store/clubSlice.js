import { createSlice } from '@reduxjs/toolkit';

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    isLoading: false,
    clubs: {},
    clubId: {},
    members: {},
    clubBoards: {},
    error: ''
  },
  reducers: {
    // TODO getClubs
    getClubInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
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

    // TODO getClubBoards
    getClubBoardsInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getClubBoardsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubBoards = payload;
    },

    // TODO postShare
    postClubShareInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postClubShareSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.clubBoards = payload;
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
  postClubPinInit,
  postClubPinSuccess,
  getClubMembersInit,
  getClubMembersSuccess,
  getClubBoardsInit,
  getClubBoardsSuccess,
  clubFailure
} = clubSlice.actions;

export default clubSlice.reducer;
