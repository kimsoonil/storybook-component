import { takeLatest, takeLeading, put, fork, call } from 'redux-saga/effects';
import {
  reset,
  reqForumInfo,
  forumInfoSuccess,
  updateForumInfo,
  forumInfoFailure
} from 'redux/store/forum/forumInfoSlice';
// import { showPopup } from 'redux/store/common/popupSlice';
import { SUCCESS } from 'constants/type';

import { fetchForumInfo } from 'redux/api';

function* onLoadForumInfoAsync({ payload }) {
  try {
    const response = yield call(fetchForumInfo, payload);
    if (response.status === SUCCESS) {
      yield put(forumInfoSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumInfoFailure(error));
  }
}

function* onLoadForumInfo() {
  yield takeLatest(reqForumInfo.type, onLoadForumInfoAsync);
}

function* onLoadForumInfoResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(forumInfoFailure(error));
  }
}

function* onLoadForumInfoReset() {
  yield takeLatest(reset.type, onLoadForumInfoResetAsync);
}

function* onLoadUpdateForumInfoAsync({ payload }) {
  console.log('payload', payload);
  try {
    yield put(updateForumInfo({ payload }));
  } catch (error) {
    console.log(error);
    yield put(forumInfoFailure(error));
  }
}

function* onLoadUpdateForumInfo() {
  yield takeLeading(updateForumInfo.type, onLoadUpdateForumInfoAsync);
}

export const forumInfoSaga = [fork(onLoadForumInfo), fork(onLoadUpdateForumInfo), fork(onLoadForumInfoReset)];
