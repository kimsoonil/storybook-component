import { createSlice } from '@reduxjs/toolkit';
import { immerParse } from 'utils';

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
    getPostsInit: (state) => {
      state.isLoading = true;
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
    // TODO getPosts
    getClubPostsInit: (state) => {
      state.isLoading = true;
    },
    getClubPostsSuccess: (state, { payload }) => {
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
    getMorePostsInit: (state) => {
      state.isLoading = true;
    },
    getMorePostsSuccess: (state, { payload }) => {
      state.isLoading = false;
      const nextPostList = [...immerParse(state.postsList), ...payload.data];
      if (payload.count > nextPostList.length) {
        state.currentPage = immerParse(state.currentPage) + 1;
      } else {
        state.isEndOfCatalogue = true;
      }
    },

    // TODO getPost
    getPostInit: (state) => {
      state.isLoading = true;
    },
    getPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    deletePostInit: (state) => {
      state.isLoading = true;
    },
    deletePostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    patchPostInit: (state) => {
      state.isLoading = true;
    },
    patchPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    // TODO getPostLikes
    getPostLikesInit: (state) => {
      state.isLoading = true;
    },
    getPostLikesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.like = payload;
    },
    // TODO postPostLike
    postPostLikeInit: (state) => {
      state.isLoading = true;
    },
    postPostLikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostUnlike
    postPostUnlikeInit: (state) => {
      state.isLoading = true;
    },
    postPostUnlikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostDislike
    postPostDislikeInit: (state) => {
      state.isLoading = true;
    },
    postPostDislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostUndislike
    postPostUndislikeInit: (state) => {
      state.isLoading = true;
    },
    postPostUndislikeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostShare
    postPostShareInit: (state) => {
      state.isLoading = true;
    },
    postPostShareSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostPin
    postPostPinInit: (state) => {
      state.isLoading = true;
    },
    postPostPinSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },

    // TODO postPostUnPin
    postPostUnPinInit: (state) => {
      state.isLoading = true;
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
  getClubPostsInit,
  getClubPostsSuccess,
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
