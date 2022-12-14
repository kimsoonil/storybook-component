import { createSlice, current } from '@reduxjs/toolkit';
// import { FORUM_CATEGORY_GAME } from 'constants/type';

const initialState = () => ({
  postList: [],
  message: '',
  error: '',
  isLoading: false
});

const postRankingListSlice = createSlice({
  name: 'postRankingList',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqPostRankingList: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    postRankingListSuccess: (state, { payload }) => {
      Object.assign(state, payload);
      state.postList = payload.data;
      state.isLoading = false;
    },
    postRankingListFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    setLikePost: (state, { payload }) => {
      const { postId, likeCnt } = payload;
      const updatedList = current(state.list).map((item) =>
        item.postId === postId ? { ...item, likeCnt, isLiked: true } : item
      );
      state.list = updatedList;
    }
  }
});

export const { reset, reqPostRankingList, postRankingListSuccess, postRankingListFailure, setLikePost } =
  postRankingListSlice.actions;

export default postRankingListSlice.reducer;
