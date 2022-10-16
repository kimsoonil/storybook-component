import { createSlice } from '@reduxjs/toolkit';
import { POPUP_TYPE_ALERT } from 'constants/type';

const initialState = () => ({
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
    }
  }
});

export const { reset, showPopup, hidePopup, setUrl } = popupSlice.actions;

export default popupSlice.reducer;
