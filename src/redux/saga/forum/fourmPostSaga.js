import { takeEvery, all, put, fork, call, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/forum/fourmPostSlice';
import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';

const config = getToken();

// TODO: get fourm post
function* getFourmPosts({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/forum/${payload.id}/posts`)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getFourmPostsSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.fourmPostFailure(error));
    console.log(error);
  }
}
// TODO: post fourm post
function* postFourmPost({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/forum/${payload.id}/post`, payload.parameters, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.postFourmPostSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.fourmPostFailure(error));
    console.log(error);
  }
}

function* ForumPostSaga() {
  yield all([
    takeEvery(actionTypes.postFourmPostInit, postFourmPost),
    takeEvery(actionTypes.getFourmPostsInit, getFourmPosts)
  ]);
}

export const forumPostSaga = [fork(ForumPostSaga)];
