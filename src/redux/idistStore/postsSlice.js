import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLoading: false,
    isEndOfCatalogue: false,
    posts: {},
    post: {},
    postsList: [],
    like: {},
    comment: {},
    eventPosts: {},
    noticePosts: {},
    currentPage: 1,
    error: ''
  },
  reducers: {
    // TODO getPosts
    getPostsInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getPostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      switch (payload.payload?.type) {
        case 'event':
          state.eventPosts = payload;
          break;
        case 'notion':
          state.noticePosts = payload;
          break;
        default:
          state.posts = payload;
          state.postsList = payload.data;
      }
    },
    getMorePostsInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getMorePostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      console.log('payload.count', payload.count);
      console.log('state.postsList.length', state.postsList.length);
      if (payload.count > state.postsList.length) {
        state.postsList.push(...payload.data);
        state.currentPage += 1;
        state.isEndOfCatalogue = true;
      }
    },

    // TODO getPost
    getPostInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    deletePostInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    deletePostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    patchPostInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    patchPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    // TODO getPostLikes
    getPostLikesInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    getPostLikesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.like = payload;
    },
    // TODO postPostLike
    postPostLikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postPostLikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostUnlike
    postPostUnlikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postPostUnlikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostDislike
    postPostDislikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postPostDislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostUndislike
    postPostUndislikeInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postPostUndislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostShare
    postPostShareInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postPostShareSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostPin
    postPostPinInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postPostPinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostUnPin
    postPostUnPinInit: ({ payload }, state) => {
      state.isLoading = true;
      return payload;
    },
    postPostUnPinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    deletePostTemporaryInit: (state) => {
      state.isLoading = true;
    },
    deletePostTemporarySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    postPostCommentInit: (state) => {
      state.isLoading = true;
    },
    postPostCommentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.comment = payload;
    },
    getPostCommentsInit: (state) => {
      state.isLoading = true;
    },
    getPostCommentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.comment = payload;
    },
    postFailure: (state, error) => {
      console.log('error : ', error.payload.message);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const {
  getPostsInit,
  getPostsSuccess,
  getMorePostsInit,
  getMorePostsSuccess,
  getPostInit,
  getPostSuccess,
  deletePostInit,
  deletePostSuccess,
  patchPostInit,
  patchPostSuccess,
  getPostLikesInit,
  getPostLikesSuccess,
  postPostLikeInit,
  postPostLikeSuccess,
  postPostUnlikeInit,
  postPostUnlikeSuccess,
  postPostDislikeInit,
  postPostDislikeSuccess,
  postPostUndislikeInit,
  postPostUndislikeSuccess,
  postPostShareInit,
  postPostShareSuccess,
  postPostPinInit,
  postPostPinSuccess,
  postPostUnPinInit,
  postPostUnPinSuccess,
  deletePostTemporaryInit,
  deletePostTemporarySuccess,
  postPostCommentInit,
  postPostCommentSuccess,
  getPostCommentsInit,
  getPostCommentSuccess,
  postFailure
} = postSlice.actions;

export default postSlice.reducer;
