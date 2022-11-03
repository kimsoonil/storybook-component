import { createSlice, current } from '@reduxjs/toolkit';
import { MAX_LIST_COUNT } from 'constants/type';

const initialState = () => ({
  forumList: [],
  forumCategoryList: [],
  todayForum: {},
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
      // Array.prototype.push.apply(state.forumList, payload.data);
      console.log(payload);
      state.forumList = payload.data;
      state.hasNextPage = payload.data.length === MAX_LIST_COUNT;
      state.reqCnt += 1;
      state.isLoading = false;
    },
    forumListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    reqAllForumList: (state) => {
      state.isLoading = true;
    },
    allForumListSuccess: (state, { payload }) => {
      if (payload.data.length > 0) {
        state.forumCategoryList[payload.data[0].forum_category.id] = payload.data;
      }
      state.isLoading = false;
    },
    reqTodayForum: (state) => {
      state.isLoading = true;
    },
    todayForumSuccess: (state, { payload }) => {
      Object.assign(
        state.todayForum,
        payload.data.find(() => true)
      );
      state.isLoading = false;
    },
    setSubsForum: (state, { payload }) => {
      const { forumId, subsStatus } = payload;
      const updatedList = current(state.list).map((item) =>
        item.forumId === forumId ? { ...item, subsStatus } : item
      );
      state.list = updatedList;
    }
  }
});

export const {
  reset,
  reqForumList,
  forumListSuccess,
  forumListFailure,
  reqAllForumList,
  allForumListSuccess,
  reqTodayForum,
  todayForumSuccess,
  setSubsForum
} = forumListSlice.actions;

export default forumListSlice.reducer;
