import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/idistStore/commentSlice';
import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';

const config = getToken();

function* postCommentLike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/comment/${payload.id}/like`, '', config)
    );
    if (response.data.message === 'ok') {
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.commentFailure(error));
    console.log(error);
  }
}
function* postCommentUnlike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/comment/${payload.id}/unlike`, '', config)
    );
    if (response.data.message === 'ok') {
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.commentFailure(error));
    console.log(error);
  }
}
function* postCommentDislike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/comment/${payload.id}/dislike`, '', config)
    );
    if (response.data.message === 'ok') {
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.commentFailure(error));
    console.log(error);
  }
}
function* postCommentUndislike({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/comment/${payload.id}/undislike`, '', config)
    );
    if (response.data.message === 'ok') {
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.commentFailure(error));
    console.log(error);
  }
}
function* deleteComment({ payload }) {
  try {
    const response = yield call(() =>
      axios.delete(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/comment/${payload.id}`, config)
    );
    if (response.status === 204) {
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.commentFailure(error));
    console.log(error);
  }
}
function* patchComment({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/comment/${payload.id}`, payload.parameters, config)
    );
    if (response.data.message === 'ok') {
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.commentFailure(error));
    console.log(error);
  }
}
function* commentSaga() {
  yield all([
    takeEvery(actionTypes.postCommentLikeInit, postCommentLike),
    takeEvery(actionTypes.postCommentUnlikeInit, postCommentUnlike),
    takeEvery(actionTypes.postCommentDislikeInit, postCommentDislike),
    takeEvery(actionTypes.postCommentUndislikeInit, postCommentUndislike),
    takeEvery(actionTypes.deleteCommentInit, deleteComment),
    takeEvery(actionTypes.patchCommentInit, patchComment)
  ]);
}

export const CommentSaga = [fork(commentSaga)];
