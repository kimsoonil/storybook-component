import { createSlice } from '@reduxjs/toolkit';
import { MAX_LIST_COUNT } from 'constants/type';

const initialState = () => ({
  forumCategoryList: [],
  allforumCategoryList: [],
  hasNextPage: false,
  message: '',
  error: '',
  isLoading: false
});

const forumCategoryListSlice = createSlice({
  name: 'forumCategoryList',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqforumCategoryList: (state) => {
      state.isLoading = true;
    },
    forumCategoryListSuccess: (state, { payload }) => {
      console.log('list', payload.data);
      // Array.prototype.push.apply(state.forumCategoryList, payload.data);
      // state.list = [...state.list, payload.data];
      state.forumCategoryList = payload.data;
      state.hasNextPage = payload.data.length === MAX_LIST_COUNT;
      state.reqCnt += 1;
      state.isLoading = false;
    },
    forumCategoryListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    reqAllforumCategoryList: (state) => {
      state.isLoading = true;
    },
    allforumCategoryListSuccess: (state, { payload }) => {
      console.log('list', payload.data);
      Array.prototype.push.apply(state.forumCategoryList, payload.data);
      state.hasNextPage = payload.data.length === MAX_LIST_COUNT;
      state.reqCnt += 1;
      state.isLoading = false;
    },
    allforumCategoryListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqforumCategoryList, forumCategoryListSuccess, forumCategoryListFailure } =
  forumCategoryListSlice.actions;

export default forumCategoryListSlice.reducer;
