import { takeEvery, all, put, fork, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/forum/fourmPostSlice';
// import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';
// import { getStorage } from 'util/storage';
// import { SUCCESS } from 'constants/type';
import { fetchForumPostSave, fetchForumCommentSave } from '../../api';

// const accessToken = getStorage('accessToken');

// const config = accessToken;

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
    // const response = yield call(() =>
    //   axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/forum/${payload.id}/post`, payload.parameters, config)
    // );
    const response = yield call(fetchForumPostSave, payload, payload.id);
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

function* forumPostComment({ payload }) {
  try {
    console.log('forumPostComment:', payload);
    if (payload.parameters) {
      const response = yield call(fetchForumCommentSave, payload);

      if (response.data.message === 'ok') {
        if (payload.actionList) {
          yield all(payload.actionList.map((action) => put(action)));
          yield call(sagaCallback, payload, response?.data?.data);
        }
      }
    }
  } catch (error) {
    yield put(actionTypes.fourmPostFailure(error));
    console.log(error);
  }
}

function* ForumPostSaga() {
  yield all([
    takeEvery(actionTypes.postFourmPostInit, postFourmPost),
    takeEvery(actionTypes.getFourmPostsInit, getFourmPosts),
    takeLatest(actionTypes.fourmPostCommentInit, forumPostComment)
  ]);
}

export const forumPostSaga = [fork(ForumPostSaga)];
