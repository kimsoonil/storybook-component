import { createSlice } from '@reduxjs/toolkit';
import { MAX_LIST_COUNT } from 'constants/type';

const initialState = () => ({
  count: 0,
  allForumList: [],
  hasNextPage: false,
  message: '',
  error: '',
  isLoading: false
});

const forumAllSearchListSlice = createSlice({
  name: 'forumAllSearchList',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqAllForumList: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    allForumListSuccess: (state, { payload }) => {
      state.count = payload.count;
      Array.prototype.push.apply(state.allForumList, payload.data);
      state.hasNextPage = payload.data.length === MAX_LIST_COUNT;
      state.reqCnt += 1;
      state.isLoading = false;
    },
    allForumListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqAllForumList, allForumListSuccess, allForumListFailure } = forumAllSearchListSlice.actions;

export default forumAllSearchListSlice.reducer;
