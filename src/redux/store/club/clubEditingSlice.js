import { createSlice } from '@reduxjs/toolkit';

const clubEditingSlice = createSlice({
  name: 'clubEditing',
  initialState: {
    name: '',
    address: '',
    bannerImage: {},
    profileImage: {},
    descriptoin: '',
    tags: [],
    category: '',
    autoApproval: true
  },
  reducers: {
    updateName: (state, { payload }) => {
      state.name = payload;
    },
    updateAddress: (state, { payload }) => {
      state.address = payload;
    },
    updateBannerImage: (state, { payload }) => {
      state.bannerImage = payload;
    },
    updateProfileImage: (state, { payload }) => {
      state.profileImage = payload;
    },
    updateDescriptoin: (state, { payload }) => {
      state.descriptoin = payload;
    },
    updateTags: (state, { payload }) => {
      state.tags = payload;
    },
    updateCategory: (state, { payload }) => {
      state.category = payload;
    },
    updateAutoApproval: (state, { payload }) => {
      state.autoApproval = payload;
    },

    updateState: (state, { payload }) => {
      // [name]에 해당하는 값 update
      state[payload.name].value = payload.value;
      // [name]의 에러 메세지 초기화
      state[payload.name].error = '';
    },
    validate: (state, { payload }) => {
      // ex) dispatch(validate( 'clubname', validation fuction ))
      state[payload.name].isLoading = true;
      // saga 에서 validate [name], [type] 에 해당하는 validate 실행.
    },
    validateSuccess: () => {},
    validateFailure: () => {}
  }
});

export const {
  updateName,
  updateAddress,
  updateBannerImage,
  updateProfileImage,
  updateDescriptoin,
  updateTags,
  updateCategory,
  updateAutoApproval
} = clubEditingSlice.actions;

export default clubEditingSlice.reducer;
