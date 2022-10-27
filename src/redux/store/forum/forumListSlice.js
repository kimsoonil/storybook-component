import { createSlice, current } from '@reduxjs/toolkit';
import { MAX_LIST_COUNT } from 'constants/type';

const initialState = () => ({
  forumList: [],
  hasNextPage: false,
  message: '',
  error: '',
  isLoading: false
});

const forumListSlice = createSlice({
  name: 'forumList',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumList: (state) => {
      state.isLoading = true;
    },
    forumListSuccess: (state, { payload }) => {
      console.log('list', payload.data);
      Array.prototype.push.apply(state.forumList, payload.data);
      // state.list = [...state.list, payload.data];
      state.hasNextPage = payload.data.length === MAX_LIST_COUNT;
      state.reqCnt += 1;
      state.isLoading = false;
    },
    forumListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    setSubsForum: (state, { payload }) => {
      const { forumId, subsStatus } = payload;
      console.log(forumId, subsStatus);
      console.log(current(state.list));

      const updatedList = current(state.list).map((item) =>
        item.forumId === forumId ? { ...item, subsStatus } : item
      );
      state.list = updatedList;
    }
  }
});

export const { reset, reqForumList, forumListSuccess, forumListFailure, setSubsForum } = forumListSlice.actions;

export default forumListSlice.reducer;
