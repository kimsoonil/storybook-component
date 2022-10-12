import { createSlice } from '@reduxjs/toolkit';
import { immerParse } from 'utils';

const initialState = () => ({
  posts: [],
  getPostsLoading: false,
  switchActivatePostLoading: false,
  error: ''
});

const postAdminSlice = createSlice({
  name: 'postAdmin',
  initialState: initialState(),
  reducers: {
    resetPostAdmin: (state) => {
      Object.assign(state, initialState());
    },

    getPostsInit: (state) => {
      state.getPostsLoading = true;
    },
    getPostsSuccess: (state, { payload }) => {
      state.getPostsLoading = false;
      state.posts = payload;
    },
    getPostsFailure: (state, { payload }) => {
      state.getPostsLoading = false;
      state.error = payload.message;
    },

    switchActivatePostInit: (state) => {
      state.switchActivatePostLoading = true;
    },
    switchActivatePostSuccess: (state, { payload }) => {
      // payload.idList = [ posts id list ]
      // payload.isActive = boolean
      state.switchActivatePostLoading = false;
      state.posts = immerParse(state.posts).map((post) =>
        payload.data.id.includes(post.id) ? { ...post, is_active: payload.data.isActive } : post
      );
    },
    switchActivatePostFailure: (state, { payload }) => {
      state.switchActivatePostLoading = false;
      state.error = payload.message;
    }
  }
});

export const {
  resetPostAdmin,

  getPostsInit,
  getPostsSuccess,
  getPostsFailure,

  switchActivatePostInit,
  switchActivatePostSuccess,
  switchActivatePostFailure
} = postAdminSlice.actions;

export default postAdminSlice.reducer;
