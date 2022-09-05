import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    createClubPopup: { visible: false, type: '', text: '', club: {} }
  },
  reducers: {
    openCreateClubPopup: (state, action) => {
      state.createClubPopup.visible = true;
      state.createClubPopup.type = action.payload.type;
      state.createClubPopup.text = action.payload.text;
      state.createClubPopup.club = action.payload.club;
      document.body.style.overflow = 'hidden';
    },
    closeCreateClubPopup: (state) => {
      state.createClubPopup.visible = false;
      document.body.style.overflow = 'visible';
    }
  }
});

export const { openCreateClubPopup, closeCreateClubPopup } = popupSlice.actions;

export default popupSlice.reducer;
