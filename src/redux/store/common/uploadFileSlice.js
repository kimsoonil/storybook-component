import { createSlice } from '@reduxjs/toolkit';

// const IMAGE_TYPE_BANNER = 1;
// const IMAGE_TYPE_THUMBNAIL = 2;

const initialState = () => ({
  url: '',
  type: '',
  message: '',
  error: '',
  isLoading: false
});

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqUploadFile: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    uploadFileSuccess: (state, { payload }) => {
      console.log('payload', payload);
      state.url = payload.url;
      state.type = payload.imgType;
      //   if (payload.imgType === IMAGE_TYPE_BANNER) state.bannerUrl = payload.url;
      //   if (payload.imgType === IMAGE_TYPE_THUMBNAIL) state.thumbnailUrl = payload.url;
      state.isLoading = false;
    },
    uploadFileFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    },
    reqDeleteFile: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    deleteFileSuccess: (state, { payload }) => {
      console.log('payload', payload);
      //   if (payload.imgType === IMAGE_TYPE_BANNER) state.bannerUrl = payload.url;
      //   if (payload.imgType === IMAGE_TYPE_THUMBNAIL) state.thumbnailUrl = payload.url;
      state.isLoading = false;
    },
    deleteFileFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  reset,
  reqUploadFile,
  uploadFileSuccess,
  uploadFileFailure,
  reqDeleteFile,
  deleteFileSuccess,
  deleteFileFailure
} = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
