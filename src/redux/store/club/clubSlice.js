import { createSlice } from '@reduxjs/toolkit';

const clubSlice = createSlice({
  name: 'clubAdnim',
  initialState: {
    club: {},
    myClub: {
      name: '',
      address: '',
      category: '',
      profile: {
        file: '',
        data: ''
      },
      banner: {
        file: '',
        data: ''
      },
      description: '',
      tags: [],
      autoApproval: 1
    },
    isLoading: false,
    error: ''
  },
  reducers: {
    getClub: (state) => {
      state.isLoading = true;
    },
    getClubSuccess: (state, action) => {
      state.club = action.payload[0];
      state.isLoading = false;
    },
    getClubFailure: (state, action) => {
      console.log(action.payload.message);
      state.action = action.payload.message;
      state.isLoading = false;
    },

    getMyClub: (state) => {
      state.isLoading = true;
    },
    getMyClubSuccess: (state, action) => {
      state.myClub = action.payload;
      state.isLoading = false;
    },
    getMyClubFailure: (state, action) => {
      console.log(action.payload.message);
      state.action = action.payload.message;
      state.isLoading = false;
    },
    updateProfileImage: (state, action) => {
      console.log(action.payload);
      console.log('프로필 이미지 업데이트');
    },
    updateBannerImage: (state, action) => {
      console.log(action.payload);
      console.log('배너 이미지 업데이트');
    }
  }
});

export const {
  getClub,
  getClubSuccess,
  getClubFailure,
  getMyClub,
  getMyClubSuccess,
  getMyClubFailure,
  updateProfileImage,
  updateBannerImage
} = clubSlice.actions;

export default clubSlice.reducer;
