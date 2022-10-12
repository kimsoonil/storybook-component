import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  createClub: false,
  createClubCancel: false,

  modifyClub: false,
  modifyClubCancel: false,

  activeGroup: false,
  activeBoard: false,

  deactiveGroup: false,
  deactiveBoard: false,

  warnGroupCount: false,
  warnBoardCount: false,

  mergeGroup: false,
  mergeBoard: false,

  deleteGroup: false,
  deleteBoard: false,

  test: false
});

const dialogSlice = createSlice({
  name: 'adminDialog',
  initialState: initialState(),
  reducers: {
    resetDialog: (state) => {
      // console.log('dialog reducer resetDialog');
      Object.assign(state, initialState());
    },
    openDialog: (state, { payload }) => {
      // console.log('dialog reducer openDialog');
      state[payload] = true;
    },
    closeDialog: (state, { payload }) => {
      // console.log('dialog reducer closeDialog');
      state[payload] = false;
    },
    closeAllDialog: (state) => {
      // console.log('dialog reducer closeAllDialog');
      Object.assign(state, initialState());
    },
    openMergeGroupDialog: (state, { payload }) => {
      state.mergeGroup = payload;
    },
    openMergeBoardDialog: (state, { payload }) => {
      state.mergeBoard = payload;
    },

    openDeleteGroupDialog: (state, { payload }) => {
      state.deleteGroup = payload;
    },
    openDeleteBoardDialog: (state, { payload }) => {
      state.deleteBoard = payload;
    }
  }
});

export const {
  resetDialog,
  openDialog,
  closeDialog,
  closeAllDialog,
  openMergeGroupDialog,
  openMergeBoardDialog,
  openDeleteGroupDialog,
  openDeleteBoardDialog
} = dialogSlice.actions;

export default dialogSlice.reducer;
