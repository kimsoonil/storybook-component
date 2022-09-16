import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: false,
  boardGroup: {},
  boards: {},
  error: ''
});

const boardGroupSlice = createSlice({
  name: 'boardGroup',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    getIdBoardGroupInit: (state) => {
      state.isLoading = true;
    },
    getIdBoardGroupSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.boardGroup = payload;
    },

    patchBoardGroupInit: (state) => {
      state.isLoading = true;
    },
    patchBoardGroupSuccess: (state, { payload }) => {
      const prevBoardGroup = JSON.parse(JSON.stringify(state.boardGroup.data));
      state.isLoading = false;
      state.boardGroup = { ...payload, data: { ...prevBoardGroup, ...payload.data } };
    },

    postBoardGroupBoardInit: (state) => {
      state.isLoading = true;
    },
    postBoardGroupBoardSuccess: (state, { payload }) => {
      state.isLoading = false;
      // const prevBoardGroups = JSON.parse(JSON.stringify(state.boardGroups.data));
      // state.boardGroups = { ...payload, data: [...prevBoardGroups, ...[payload.data]] };
      // const prevBoardList = JSON.parse(JSON.stringify(state.boards));
      // state.boards = { ...payload, data: { ...prevBoardList, ...payload.data } };
    },

    boardGroupFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  getIdBoardGroupInit,
  getIdBoardGroupSuccess,

  patchBoardGroupInit,
  patchBoardGroupSuccess,

  postBoardGroupBoardInit,
  postBoardGroupBoardSuccess,

  boardGroupFailure
} = boardGroupSlice.actions;

export default boardGroupSlice.reducer;
