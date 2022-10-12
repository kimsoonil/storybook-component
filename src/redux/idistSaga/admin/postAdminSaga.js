import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import * as actionTypes from 'redux/idistStore/admin/postAdminSlice';
import idistApi from 'redux/idistApi';

function* getPosts({ payload }) {
  try {
    const response = yield call(idistApi.getAdminPosts, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.getPostsSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.getPostsFailure(error));
    console.log(error);
  }
}

function* switchActivatePost({ payload }) {
  try {
    let response;
    if (payload.data.isActive) {
      response = yield call(idistApi.postAdminPostsActivate, payload);
    } else {
      response = yield call(idistApi.postAdminPostsDeactivate, payload);
    }
    if (response && (response.status === 200 || response.data.message === 'ok')) {
      yield put(actionTypes.switchActivatePostSuccess(payload));
    }
  } catch (error) {
    yield put(actionTypes.switchActivatePostFailure(error));
    console.log(error);
  }
}

function* _postAdminSaga() {
  yield all([takeEvery(actionTypes.getPostsInit, getPosts)]);
  yield all([takeEvery(actionTypes.switchActivatePostInit, switchActivatePost)]);
}

export const postAdminSaga = [fork(_postAdminSaga)];
