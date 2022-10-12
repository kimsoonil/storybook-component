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
    postCommentLikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postCommentLikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postCommentUnlike
    postCommentUnlikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postCommentUnlikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postCommentDislike
    postCommentDislikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postCommentDislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postCommentUndislike
    postCommentUndislikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postCommentUndislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
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
  commentFailure
} = commentSlice.actions;

export default commentSlice.reducer;
