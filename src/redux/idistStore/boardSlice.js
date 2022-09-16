import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  boards: {},
  board: {},
  posts: {},
  post: {},
  error: ''
});

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState(),

  // GET
  // ​/board​/{board_pk}​/posts
  // 리스트 조회

  // GET
  // ​/board​/{id}
  // 객체 조회

  // PATCH
  // ​/board​/{id}
  // 수정

  // POST
  // ​/board​/{board_pk}​/post
  // 생성
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    getBoardPostsInit: (state) => {
      state.isLoading = true;
    },
    getBoardPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },

    getIdBoardInit: (state) => {
      state.isLoading = true;
    },
    getIdBoardSuccess: (state, { payload }) => {
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
      state.isLoading = true;
    },
    postBoardPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    boardFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.isLoading = false;
      state.error = error.payload.message;
    }
  }
});

export const {
  getBoardPostsInit,
  getBoardPostsSuccess,

  getIdBoardInit,
  getIdBoardSuccess,

  patchBoardInit,
  patchBoardSuccess,

  postBoardPostInit,
  postBoardPostSuccess,

  boardFailure
} = boardSlice.actions;

export default boardSlice.reducer;
