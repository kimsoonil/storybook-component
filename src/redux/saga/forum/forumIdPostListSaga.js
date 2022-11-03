import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reset,
  reqForumIdPostList,
  forumIdPostListSuccess,
  forumIdPostListFailure
} from 'redux/store/forum/forumIdPostListSlice';
import { SUCCESS } from 'constants/type';

import { fetchForumIdPostList } from 'redux/api';

function* onLoadForumIdPostListAsync({ payload }) {
  console.log('payload::', payload);
  try {
    const response = yield call(fetchForumIdPostList, payload);
    if (response.status === SUCCESS) {
      yield put(forumIdPostListSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumIdPostListFailure(error));
  }
}

function* onLoadForumIdPostList() {
  yield takeLatest(reqForumIdPostList.type, onLoadForumIdPostListAsync);
}

function* onLoadForumIdPostListResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(forumIdPostListFailure(error));
  }
}

function* onLoadForumIdPostListReset() {
  yield takeLatest(reset.type, onLoadForumIdPostListResetAsync);
}

export const forumIdPostListSaga = [fork(onLoadForumIdPostList), fork(onLoadForumIdPostListReset)];
