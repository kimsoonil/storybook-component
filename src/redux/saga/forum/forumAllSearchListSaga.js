import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reset,
  reqAllForumList,
  allForumListSuccess,
  allForumListFailure
} from 'redux/store/forum/forumAllSearchListSlice';
import { SUCCESS } from 'constants/type';

import { fetchForumList } from '../../api';

function* onLoadAllForumListAsync({ payload }) {
  try {
    const response = yield call(fetchForumList, payload);
    if (response.status === SUCCESS) {
      yield put(allForumListSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(allForumListFailure(error));
  }
}

function* onLoadAllForumList() {
  yield takeLatest(reqAllForumList.type, onLoadAllForumListAsync);
}

function* onLoadForumListResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(allForumListFailure(error));
  }
}

function* onLoadAllForumListReset() {
  yield takeLatest(reset.type, onLoadForumListResetAsync);
}

export const forumAllSearchListSaga = [fork(onLoadAllForumListReset), fork(onLoadAllForumList)];
