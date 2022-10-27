import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reset, reqForumBest, forumBestSuccess, forumBestFailure } from 'redux/store/forum/forumBestSlice';
import { SUCCESS } from 'constants/type';

import { fetchForumBest } from '../../api';

function* onLoadForumBestAsync({ payload }) {
  try {
    const response = yield call(fetchForumBest, payload);
    if (response.status === SUCCESS) {
      yield put(forumBestSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumBestFailure(error));
  }
}

function* onLoadForumBest() {
  yield takeLatest(reqForumBest.type, onLoadForumBestAsync);
}

function* onLoadForumBestResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(forumBestFailure(error));
  }
}

function* onLoadForumBestReset() {
  yield takeLatest(reset.type, onLoadForumBestResetAsync);
}

export const forumBestSaga = [fork(onLoadForumBest), fork(onLoadForumBestReset)];
