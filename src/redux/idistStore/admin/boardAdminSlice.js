import { createSlice } from '@reduxjs/toolkit';
import { immerParse } from 'utils';

const initialState = () => ({
  boardGroups: [],
  boardGroup: {},
  board: {},
  selected: {},
  selected: {},
  posts: [],

  getBoardGroupsLoading: false,

  getBoardGroupLoading: false,
  postBoardGroupLoading: false,
  patchBoardGroupLoading: false,
  deleteBoardGroupLoading: false,
  renameBoardGroupLoading: false,
  switchActivateBoardGroupLoading: false,
  mergeBoardGroupLoading: false,
  orderBoardGroupLoading: false,

  getBoardLoading: false,
  postBoardLoading: false,
  patchBoardLoading: false,
  deleteBoardLoading: false,
  renameBoardLoading: false,
  switchActivateBoardLoading: false,
  mergeBoardLoading: false,
  orderBoardLoading: false,

  getBoardPostsLoading: false,

  error: ''
});

const boardAdminSlice = createSlice({
  name: 'boardAdmin',
  initialState: initialState(),
  reducers: {
    resetBoardAdmin: (state) => {
      Object.assign(state, initialState());
    },
    resetBoardAdminBoardGroups: (state) => {
      state.boardGroups = [];
    },
    resetBoardAdminSelected: (state) => {
      state.selected = {};
    },
    resetBoardAdminPosts: (state) => {
      state.posts = [];
    },

    // boardGroups
    getBoardGroupsInit: (state) => {
      state.getBoardGroupsLoading = true;
    },
    getBoardGroupsSuccess: (state, { payload }) => {
      // payload = boardGroups
      state.getBoardGroupsLoading = false;
      state.boardGroups = payload;
    },
    getBoardGroupsFailure: (state, { payload }) => {
      state.getBoardGroupsLoading = false;
      state.error = payload.message;
    },

    // boardGroup
    getBoardGroupInit: (state) => {
      state.getBoardGroupLoading = true;
    },
    getBoardGroupSuccess: (state, { payload }) => {
      // payload = boardGroup
      state.getBoardGroupLoading = false;
      state.selected = { ...payload, contentsType: 'group' };
    },
    getBoardGroupFailure: (state, { payload }) => {
      state.getBoardGroupLoading = false;
      state.error = payload.message;
    },

    postBoardGroupInit: (state) => {
      state.postBoardGroupLoading = true;
    },
    postBoardGroupSuccess: (state, { payload }) => {
      // payload = boardGroup
      state.postBoardGroupLoading = false;
      state.selected = { ...payload, contentsType: 'group' };
    },
    postBoardGroupFailure: (state, { payload }) => {
      state.postBoardGroupLoading = false;
      state.error = payload.message;
    },

    patchBoardGroupInit: (state) => {
      state.patchBoardGroupLoading = true;
    },
    patchBoardGroupSuccess: (state, { payload }) => {
      // payload = boardGroup 확인필요
      state.patchBoardGroupLoading = false;
      state.selected = { ...immerParse(state.selected), ...payload };
    },
    patchBoardGroupFailure: (state, { payload }) => {
      state.patchBoardGroupLoading = false;
      state.error = payload.message;
    },

    deleteBoardGroupInit: (state) => {
      state.deleteBoardGroupLoading = true;
    },
    deleteBoardGroupSuccess: (state, { payload }) => {
      // payload = {id: [number]}
      state.deleteBoardGroupLoading = false;
      state.selected = {};
    },
    deleteBoardGroupFailure: (state, { payload }) => {
      state.deleteBoardGroupLoading = false;
      state.error = payload.message;
    },

    renameBoardGroupInit: (state) => {
      state.renameBoardGroupLoading = true;
    },
    renameBoardGroupSuccess: (state, { payload }) => {
      // payload = boardGroup
      state.renameBoardGroupLoading = false;
    },
    renameBoardGroupFailure: (state, { payload }) => {
      state.renameBoardGroupLoading = false;
      state.error = payload.message;
    },

    switchActivateBoardGroupInit: (state) => {
      state.switchActivateBoardGroupLoading = true;
    },
    switchActivateBoardGroupSuccess: (state, { payload }) => {
      // payload = boardGroup
      state.switchActivateBoardGroupLoading = false;
    },
    switchActivateBoardGroupFailure: (state, { payload }) => {
      state.switchActivateBoardGroupLoading = false;
      state.error = payload.message;
    },

    mergeBoardGroupInit: (state) => {
      state.mergeBoardGroupLoading = true;
    },
    mergeBoardGroupSuccess: (state, { payload }) => {
      // payload = boardGroup
      state.mergeBoardGroupLoading = false;
      state.selected = {};
    },
    mergeBoardGroupFailure: (state, { payload }) => {
      state.mergeBoardGroupLoading = false;
      state.error = payload.message;
    },

    // 미완
    orderBoardGroupInit: (state) => {
      state.orderBoardGroupLoading = true;
    },
    orderBoardGroupSuccess: (state, { payload }) => {
      state.orderBoardGroupLoading = false;
    },
    orderBoardGroupFailure: (state, { payload }) => {
      state.orderBoardGroupLoading = false;
      state.error = payload.message;
    },

    // board
    getBoardInit: (state) => {
      state.getBoardLoading = true;
    },
    getBoardSuccess: (state, { payload }) => {
      // payload = board
      state.getBoardLoading = false;
      state.selected = { ...payload, contentsType: 'board' };
    },
    getBoardFailure: (state, { payload }) => {
      state.getBoardLoading = false;
      state.error = payload.message;
    },

    postBoardInit: (state) => {
      state.postBoardLoading = true;
    },
    postBoardSuccess: (state, { payload }) => {
      // payload = board
      state.postBoardLoading = false;
      state.selected = { ...payload, contentsType: 'board' };
    },
    postBoardFailure: (state, { payload }) => {
      state.postBoardLoading = false;
      state.error = payload.message;
    },

    patchBoardInit: (state) => {
      state.patchBoardLoading = true;
    },
    patchBoardSuccess: (state, { payload }) => {
      // payload = board 확인필요
      state.patchBoardLoading = false;
      state.selected = { ...immerParse(state.selected), ...payload };
    },
    patchBoardFailure: (state, { payload }) => {
      state.patchBoardLoading = false;
      state.error = payload.message;
    },

    deleteBoardInit: (state) => {
      state.deleteBoardLoading = true;
    },
    deleteBoardSuccess: (state, { payload }) => {
      // payload = {id: [number]}
      state.deleteBoardLoading = false;
      state.selected = {};
    },
    deleteBoardFailure: (state, { payload }) => {
      state.deleteBoardLoading = false;
      state.error = payload.message;
    },

    renameBoardInit: (state) => {
      state.renameBoardLoading = true;
    },
    renameBoardSuccess: (state, { payload }) => {
      // payload = board
      state.renameBoardLoading = false;
    },
    renameBoardFailure: (state, { payload }) => {
      state.renameBoardLoading = false;
      state.error = payload.message;
    },

    switchActivateBoardInit: (state) => {
      state.switchActivateBoardLoading = true;
    },
    switchActivateBoardSuccess: (state, { payload }) => {
      // payload = board
      state.switchActivateBoardLoading = false;
    },
    switchActivateBoardFailure: (state, { payload }) => {
      state.switchActivateBoardLoading = false;
      state.error = payload.message;
    },

    // 미완
    mergeBoardInit: (state) => {
      state.mergeBoardLoading = true;
    },
    mergeBoardSuccess: (state, { payload }) => {
      // payload = boardGroup
      state.mergeBoardLoading = false;
      state.selected = {};
    },
    mergeBoardFailure: (state, { payload }) => {
      state.mergeBoardLoading = false;
      state.error = payload.message;
    },

    // 미완
    orderBoardInit: (state) => {
      state.orderBoardLoading = true;
    },
    orderBoardSuccess: (state, { payload }) => {
      state.orderBoardLoading = false;
    },
    orderBoardFailure: (state, { payload }) => {
      state.orderBoardLoading = false;
      state.error = payload.message;
    },

    // posts
    // 미완
    getBoardPostsInit: (state) => {
      state.getBoardPostsLoading = true;
    },
    getBoardPostsSuccess: (state, { payload }) => {
      state.getBoardPostsLoading = false;
      // todo;
    },
    getBoardPostsFailure: (state, { payload }) => {
      state.getBoardPostsLoading = false;
      state.error = payload.message;
    }
  }
});

export const {
  resetBoardAdmin,
  resetBoardAdminBoardGroups,
  resetBoardAdminSelected,
  resetBoardAdminPosts,

  getBoardGroupsInit,
  getBoardGroupsSuccess,
  getBoardGroupsFailure,

  getBoardGroupInit,
  getBoardGroupSuccess,
  getBoardGroupFailure,

  postBoardGroupInit,
  postBoardGroupSuccess,
  postBoardGroupFailure,

  patchBoardGroupInit,
  patchBoardGroupSuccess,
  patchBoardGroupFailure,

  deleteBoardGroupInit,
  deleteBoardGroupSuccess,
  deleteBoardGroupFailure,

  renameBoardGroupInit,
  renameBoardGroupSuccess,
  renameBoardGroupFailure,

  switchActivateBoardGroupInit,
  switchActivateBoardGroupSuccess,
  switchActivateBoardGroupFailure,

  mergeBoardGroupInit,
  mergeBoardGroupSuccess,
  mergeBoardGroupFailure,

  orderBoardGroupInit,
  orderBoardGroupSuccess,
  orderBoardGroupFailure,

  getBoardInit,
  getBoardSuccess,
  getBoardFailure,

  postBoardInit,
  postBoardSuccess,
  postBoardFailure,

  patchBoardInit,
  patchBoardSuccess,
  patchBoardFailure,

  deleteBoardInit,
  deleteBoardSuccess,
  deleteBoardFailure,

  renameBoardInit,
  renameBoardSuccess,
  renameBoardFailure,

  switchActivateBoardInit,
  switchActivateBoardSuccess,
  switchActivateBoardFailure,

  mergeBoardInit,
  mergeBoardSuccess,
  mergeBoardFailure,

  orderBoardInit,
  orderBoardSuccess,
  orderBoardFailure,

  getBoardPostsInit,
  getBoardPostsSuccess,
  getBoardPostsFailure
} = boardAdminSlice.actions;

export default boardAdminSlice.reducer;

const __board = {
  id: 128,
  board_group: 30,
  name: 'b1-1',
  description: 'string',
  read_permission: 1,
  write_permission: 0,
  view_mode: 'LIST_TYPE',
  order: 1,
  type: 'NORMAL',
  is_active: true
};
