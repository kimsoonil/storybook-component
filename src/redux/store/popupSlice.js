import { createSlice } from '@reduxjs/toolkit';
import { POPUP_TYPE_ALERT, BUTTON_NAME_CONFIRM } from 'constants/type';

const initialState = () => ({
  title: '',
  contents: '',
  type: POPUP_TYPE_ALERT,
  buttonName: BUTTON_NAME_CONFIRM,
  isShow: false
});

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialState(),
  reducers: {
    showPopup: (state, { payload }) => {
      Object.assign(state, payload);
      state.isShow = true;
    },
    hidePopup: (state) => {
      state.isShow = false;
    }
  }
});

export const { reset, showPopup, hidePopup } = popupSlice.actions;

export default popupSlice.reducer;
