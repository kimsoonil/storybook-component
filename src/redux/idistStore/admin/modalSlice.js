import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  createClub: {},
  createClubCancel: {},

  modifyClub: {},
  modifyClubCancel: {},

  activeGroup: {},
  activeBoard: {},

  deactiveGroup: {},
  deactiveBoard: {},

  warnGroupCount: {},
  warnBoardCount: {}
});
const modalSlice = createSlice({
  name: 'adminModal',
  initialState: initialState(),
  reducers: {
    resetModal: (state) => {
      Object.assign(state, initialState());
    },
    showModal: (state, { payload }) => {
      state[payload.type].visible = true;
      state[payload.type].data = payload?.data;
    },
    hideModal: (state, { payload }) => {
      state[payload.type] = {};
    },
    forceCloseModal: (state) => {
      // state.createClub = {};
      // state.createClubCancel = {};
      // state.modifyClub = {};
      // console.log(1);
      Object.assign(state, initialState());
    }
  }
});

export const { resetModal, showModal, hideModal, forceCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
