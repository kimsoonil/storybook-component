import { createSlice } from '@reduxjs/toolkit';
import { immerParse } from 'utils';

const initialState = () => ({
  boardGroups: [],
  info: {},
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
    setBoardAdminBoardGroups: (state, { payload }) => {
      state.boardGroups = payload;
    },
    setBoardGroups: (state, { payload }) => {
      state.boardGroups = payload;
    },
    resetBoardAdminPosts: (state) => {
      state.posts = [];
    },

    setInfo: (state, { payload }) => {
      state.info = payload;
    },
    updateInfo: (state, { payload }) => {
      state.info = { ...immerParse(info), ...payload };
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
      state.info = { ...payload };
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
      state.info = payload;
      state.boardGroups = [...immerParse(state.boardGroups), payload];
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
      // console.log(payload);
      state.info = { ...immerParse(state.info), ...payload };
      state.boardGroups = immerParse(state.boardGroups).map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      );
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
      state.info = {};
      state.boardGroups = immerParse(state.boardGroups).filter((boardGroupItem) => boardGroupItem.id !== payload.id);
    },
    deleteBoardGroupFailure: (state, { payload }) => {
      state.deleteBoardGroupLoading = false;
      state.error = payload.message;
    },

    renameBoardGroupInit: (state) => {
      state.renameBoardGroupLoading = true;
    },
    renameBoardGroupSuccess: (state, { payload }) => {
      state.renameBoardGroupLoading = false;
      state.boardGroups = immerParse(state.boardGroups).map((item) =>
        item.id === payload.id ? { ...item, title: payload.title } : item
      );
    },
    renameBoardGroupFailure: (state, { payload }) => {
      state.renameBoardGroupLoading = false;
      state.error = payload.message;
    },

    switchActivateBoardGroupInit: (state) => {
      state.switchActivateBoardGroupLoading = true;
    },
    switchActivateBoardGroupSuccess: (state, { payload }) => {
      state.switchActivateBoardGroupLoading = false;
      state.boardGroups = immerParse(state.boardGroups).map((item) =>
        item.id === payload.id ? { ...item, isActive: payload.isActive } : item
      );
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
      state.info = {};
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
      state.info = { ...payload };
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
      state.info = payload;
      state.boardGroups = immerParse(state.boardGroups).map((boardGroupItem) =>
        payload.boardGroupId === boardGroupItem.id
          ? { ...boardGroupItem, boards: [...boardGroupItem.boards, payload] }
          : boardGroupItem
      );
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
      state.info = { ...immerParse(state.info), ...payload };
      state.boardGroups = immerParse(state.boardGroups).map((boardGroupItem) => ({
        ...boardGroupItem,
        boards: boardGroupItem.boards.map((boardItem) =>
          boardItem.id === payload.id ? { ...boardItem, ...payload } : boardItem
        )
      }));
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
      state.info = {};
      state.boardGroups = immerParse(state.boardGroups).map((boardGroupItem) => ({
        ...boardGroupItem,
        boards: boardGroupItem.boards.filter((boardItem) => boardItem.id !== payload.id)
      }));
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
      state.boardGroups = immerParse(state.boardGroups).map((boardGroupItem) => ({
        ...boardGroupItem,
        boards: boardGroupItem.boards.map((boardItem) =>
          boardItem.id === payload.id ? { ...boardItem, title: payload.title } : boardItem
        )
      }));
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
      state.boardGroups = immerParse(state.boardGroups).map((boardGroupItem) => ({
        ...boardGroupItem,
        boards: boardGroupItem.boards.map((boardItem) =>
          boardItem.id === payload.id ? { ...boardItem, isActive: payload.isActive } : boardItem
        )
      }));
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
      state.info = {};
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
  setBoardAdminBoardGroups,
  setBoardGroups,
  resetBoardAdminPosts,

  setInfo,
  updateInfo,

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
