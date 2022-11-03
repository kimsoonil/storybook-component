import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  rankingList: [],
  firstForumId: 1,
  message: '',
  error: '',
  isLoading: false
});

const forumRankingListSlice = createSlice({
  name: 'forumRankingList',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumRankingList: (state) => {
      state.isLoading = true;
    },
    forumRankingListSuccess: (state, { payload }) => {
      // Object.assign(state, payload);
      state.rankingList = payload.data;
      if (payload.data.length > 0) state.firstForumId = payload.data[0].id;
      state.isLoading = false;
    },
    forumRankingListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumRankingList, forumRankingListSuccess, forumRankingListFailure } =
  forumRankingListSlice.actions;

export default forumRankingListSlice.reducer;
