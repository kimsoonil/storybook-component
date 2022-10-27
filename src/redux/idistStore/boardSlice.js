import { createSlice } from '@reduxjs/toolkit';
import { immerParse } from 'utils';

const initialState = () => ({
  isLoading: false,
  boards: {},
  board: {},
  isEndOfCatalogue: false,
  posts: {},
  postsList: [],
  post: {},
  currentPage: 1,
  error: ''
});

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState(),

  reducers: {
    boardReset: (state) => {
      Object.assign(state, initialState());
    },
    getBoardPostsInit: (state) => {
      state.isLoading = true;
    },
    getBoardPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
      state.postsList = payload.data;
    },
    getMoreBoardPostsInit: (state) => {
      state.isLoading = true;
    },
    getMoreBoardPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      const nextPostList = [...immerParse(state.postsList), ...payload.data];
      if (payload.count > nextPostList.length) {
        state.currentPage = immerParse(state.currentPage) + 1;
      } else {
        state.isEndOfCatalogue = true;
      }
    },
    getBoardInit: (state) => {
      state.isLoading = true;
    },
    getBoardSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.board = payload;
    },

    patchBoardInit: (state) => {
      state.isLoading = true;
    },
    patchBoardSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.board = payload;
    },

    postBoardPostInit: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    postBoardPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
      console.log('payload', payload);
    },

    patchBoardMergeInit: (state) => {
      state.isLoading = true;
    },
    patchBoardMergeSuccess: (state) => {
      state.isLoading = false;
    },

    deleteBoardInit: (state, { payload }) => {
      console.log('deleteBoardInit payload', payload);
      state.isLoading = true;
    },
    deleteBoardSuccess: (state, { payload }) => {
      console.log('deleteBoardSuccess payload', payload);
      state.isLoading = false;
    },
    resetBoardPosts: (state) => {
      state.posts = {};
    },

    boardFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.isLoading = false;
      state.error = error.payload.message;
    }
  }
});

export const {
  boardReset,

  getBoardPostsInit,
  getBoardPostsSuccess,

  getMoreBoardPostsInit,
  getMoreBoardPostsSuccess,

  getBoardInit,
  getBoardSuccess,

  patchBoardInit,
  patchBoardSuccess,

  postBoardPostInit,
  postBoardPostSuccess,

  patchBoardMergeInit,
  patchBoardMergeSuccess,

  deleteBoardInit,
  deleteBoardSuccess,
  resetBoardPosts,

  boardFailure
} = boardSlice.actions;

export default boardSlice.reducer;
