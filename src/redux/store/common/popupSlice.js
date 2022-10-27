import { createSlice } from '@reduxjs/toolkit';
import { POPUP_TYPE_ALERT } from 'constants/type';

const initialState = () => ({
  isConfirm: false,
  isDim: false,
  title: '',
  contents: '',
  prePath: '',
  nextPath: '',
  url: '',
  type: POPUP_TYPE_ALERT,
  isShow: false
});

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    showPopup: (state, { payload }) => {
      Object.assign(state, initialState());
      Object.assign(state, payload);
      state.isShow = true;
    },
    hidePopup: (state) => {
      state.isShow = false;
    },
    setUrl: (state, { payload }) => {
      console.log(payload);
      state.url = payload;
    },
    isConfirmPopup2: (state) => {
      state.isConfirm = true;
    }
  }
});

export const { reset, showPopup, hidePopup, setUrl, isConfirmPopup2 } = popupSlice.actions;

export default popupSlice.reducer;
