import { takeLeading, takeLatest, put, fork } from 'redux-saga/effects';
import {
  reset,
  reqlatestPosts,
  latestPostsSuccess,
  latestPostsFailure,
  setLikePost
} from 'redux/store/forum/latestPostsSlice';

import Api from '../../api2';

function* onLoadLatestPostAsync({ payload }) {
  console.log(payload);
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(AuthEmailSuccess({ ...response.data }));
    // }
    const response = Api.reqlatestPosts(payload);
    yield put(latestPostsSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(latestPostsFailure(error));
  }
}

function* onLoadLatestPost() {
  yield takeLatest(reqlatestPosts.type, onLoadLatestPostAsync);
}

function* onLoadLatestPostResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(latestPostsFailure(error));
  }
}

function* onLoadLatestPostReset() {
  yield takeLatest(reset.type, onLoadLatestPostResetAsync);
}

function* onLoadPostRankingLikeAsync({ payload }) {
  try {
    console.log(payload);
    yield put(setLikePost(payload));
  } catch (error) {
    console.log(error);
  }
}

function* onLoadLatestPostLike() {
  yield takeLeading(setLikePost.type, onLoadPostRankingLikeAsync);
}

export const latestPostsSaga = [fork(onLoadLatestPost), fork(onLoadLatestPostReset), fork(onLoadLatestPostLike)];
