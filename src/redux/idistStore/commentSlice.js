import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isLoading: false,
    posts: {},
    post: {},
    like: {},
    comment: {},
    error: ''
  },
  reducers: {
    // TODO postCommentLike
    postCommentLikeInit: (state) => {
      state.isLoading = true;
    },
    postCommentLikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postCommentUnlike
    postCommentUnlikeInit: (state) => {
      state.isLoading = true;
    },
    postCommentUnlikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postCommentDislike
    postCommentDislikeInit: (state) => {
      state.isLoading = true;
    },
    postCommentDislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postCommentUndislike
    postCommentUndislikeInit: (state) => {
      state.isLoading = true;
    },
    postCommentUndislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    deleteCommentInit: (state) => {
      state.isLoading = true;
    },
    patchCommentInit: (state) => {
      state.isLoading = true;
    },
    commentFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  postCommentLikeInit,
  postCommentLikeSuccess,
  postCommentUnlikeInit,
  postCommentUnlikeSuccess,
  postCommentDislikeInit,
  postCommentDislikeSuccess,
  postCommentUndislikeInit,
  postCommentUndislikeSuccess,
  deleteCommentInit,
  patchCommentInit,
  commentFailure
} = commentSlice.actions;

export default commentSlice.reducer;
