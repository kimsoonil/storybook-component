import { createSlice } from '@reduxjs/toolkit';

const clubSlice = createSlice({
  name: 'getClubs',
  initialState: {
    isLoading: false,
    clubs: {},
    clubId: {},
    members: {},
    boards: {},
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

    // TODO getClubs
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
      state.members = payload;
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
  getClubMembersInit,
  getClubMembersSuccess,
  getClubBoardsInit,
  getClubBoardsSuccess,
  clubFailure
} = clubSlice.actions;

export default clubSlice.reducer;
