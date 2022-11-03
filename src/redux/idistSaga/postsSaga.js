import { takeEvery, all, put, fork, call, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/idistStore/postsSlice';
import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';

const config = getToken();

// TODO: club posts
function* getPosts({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/clubs/posts`, { params: payload.parameters, ...config })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getPostsSuccess({ ...response.data, payload }));
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
// TODO: club posts
function* getClubPosts({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/posts`, {
        params: payload.parameters,
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubPostsSuccess({ ...response.data, payload }));
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* getMorePosts({ payload }) {
  try {
    const { currentPage, isEndOfCatalogue } = yield select((state) => state.post);
    if (isEndOfCatalogue) return;
    payload.parameters.page = currentPage + 1;
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/posts`, { params: payload.parameters, ...config })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getMorePostsSuccess({ ...response.data, payload }));
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* getPost({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}`, config)
    );
    if (response.data.message === 'ok') {
      console.log('posts', response.data);
      yield put(actionTypes.getPostSuccess({ ...response.data, payload }));
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* deletePost({ payload }) {
  try {
    const response = yield call(() =>
      axios.delete(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}`, config)
    );
    if (response.data.message === 'ok') {
      console.log('deletePost', response);
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* patchPost({ payload }) {
  console.log('payload', payload);
  try {
    const response = yield call(() =>
      axios.patch(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}`, payload.parameters, config)
    );
    if (response.data.message === 'ok') {
      console.log('patchPost', response);
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* getPostLikes({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/likes`, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getPostLikesSuccess({ ...response.data }));
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* postPostLike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/like`, '', config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* postPostUnlike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/unlike`, '', config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* postPostDislike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/dislike`, '', config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* postPostUndislike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/undislike`, '', config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* postPostShare({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/share`, payload.parameters, config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* postPostPin({ payload }) {
  try {
    const response = yield call(
      () => axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/pin`, '', config),
      ''
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* postPostUnPin({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/unpin`, '', config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}

function* deletePostTemporary({ payload }) {
  try {
    const response = yield call(() =>
      axios.delete(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/temporary`, '', config)
    );

    if (response.status === 204) {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
        yield call(sagaCallback, payload, response?.data?.data);
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}

function* postPostComment({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/comment`,
        payload.parameters,
        config
      )
    );

    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
        yield call(sagaCallback, payload, response?.data?.data);
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}

function* getPostComments({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/comments`, {
        params: payload.parameters,
        ...config
      })
    );

    if (response.data.message === 'ok') {
      console.log('comment', response.data);
      yield put(actionTypes.getPostCommentSuccess({ ...response.data }));
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
        yield call(sagaCallback, payload, response?.data?.data);
      }
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}
function* getMoreComments({ payload }) {
  try {
    const { currentPage, isEndOfCatalogue } = yield select((state) => state.post);
    console.log('currentPage', currentPage);
    console.log('isEndOfCatalogue', isEndOfCatalogue);
    if (isEndOfCatalogue) return;
    payload.parameters.page = currentPage + 1;

    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/post/${payload.id}/comments`, {
        params: payload.parameters,
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getMoreCommentSuccess({ ...response.data, payload }));
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}

function* getPostsFeed() {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/posts/feed`, {
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getPostsFeedSuccess({ ...response.data }));
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}

function* postSaga() {
  yield all([
    takeEvery(actionTypes.getPostsInit, getPosts),
    takeEvery(actionTypes.getClubPostsInit, getClubPosts),
    takeEvery(actionTypes.getMorePostsInit, getMorePosts),
    takeEvery(actionTypes.getPostInit, getPost),
    takeEvery(actionTypes.deletePostInit, deletePost),
    takeEvery(actionTypes.patchPostInit, patchPost),
    takeEvery(actionTypes.getPostLikesInit, getPostLikes),
    takeEvery(actionTypes.postPostLikeInit, postPostLike),
    takeEvery(actionTypes.postPostUnlikeInit, postPostUnlike),
    takeEvery(actionTypes.postPostDislikeInit, postPostDislike),
    takeEvery(actionTypes.postPostUndislikeInit, postPostUndislike),
    takeEvery(actionTypes.postPostShareInit, postPostShare),
    takeEvery(actionTypes.postPostPinInit, postPostPin),
    takeEvery(actionTypes.postPostUnPinInit, postPostUnPin),
    takeEvery(actionTypes.deletePostTemporaryInit, deletePostTemporary),
    takeEvery(actionTypes.postPostCommentInit, postPostComment),
    takeEvery(actionTypes.getPostCommentsInit, getPostComments),
    takeEvery(actionTypes.getMoreCommentInit, getMoreComments),
    takeEvery(actionTypes.getPostsFeedInit, getPostsFeed)
  ]);
}

export const PostSaga = [fork(postSaga)];
