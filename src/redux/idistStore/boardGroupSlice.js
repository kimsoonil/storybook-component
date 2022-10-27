import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  boardGroup: {},
  boards: {},
  postBoardTrigger: {},
  error: ''
});

const boardGroupSlice = createSlice({
  name: 'boardGroup',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    getBoardGroupInit: (state) => {
      state.isLoading = true;
    },
    getBoardGroupSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.boardGroup = payload;
    },

    patchBoardGroupInit: (state) => {
      state.isLoading = true;
    },
    patchBoardGroupSuccess: (state) => {
      state.isLoading = false;
    },

    postBoardGroupBoardInit: (state) => {
      state.isLoading = true;
    },
    postBoardGroupBoardSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.postBoardTrigger = payload.data;
      // const prevBoardGroups = JSON.parse(JSON.stringify(state.boardGroups.data));
      // state.boardGroups = { ...payload, data: [...prevBoardGroups, ...[payload.data]] };
      // const prevBoards = JSON.parse(JSON.stringify(state.boards));
      // state.boards = { ...payload, data: { ...prevBoards, ...payload.data } };
    },

    patchBoardGroupMergeInit: (state) => {
      state.isLoading = true;
    },
    patchBoardGroupMergeSuccess: (state) => {
      state.isLoading = false;
    },

    deleteBoardGroupInit: (state, { payload }) => {
      console.log('deleteBoardGroupInit payload', payload);
      state.isLoading = true;
    },
    deleteBoardGroupSuccess: (state, { payload }) => {
      console.log('deleteBoardGroupSuccess payload', payload);
      state.isLoading = false;
    },

    boardGroupFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  getBoardGroupInit,
  getBoardGroupSuccess,

  patchBoardGroupInit,
  patchBoardGroupSuccess,

  postBoardGroupBoardInit,
  postBoardGroupBoardSuccess,

  patchBoardGroupMergeInit,
  patchBoardGroupMergeSuccess,

  deleteBoardGroupInit,
  deleteBoardGroupSuccess,

  boardGroupFailure
} = boardGroupSlice.actions;

export default boardGroupSlice.reducer;
