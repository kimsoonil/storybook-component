import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reset,
  reqForumBookMarkedList,
  forumBookMarkedListSuccess,
  forumBookMarkedListFailure
} from 'redux/store/forum/forumBookmarkedSlice';
import { SUCCESS } from 'constants/type';

import { fetchForumList } from '../../api';

function* onLoadForumBookMarkedListAsync({ payload }) {
  try {
    const response = yield call(fetchForumList, payload);
    if (response.status === SUCCESS) {
      yield put(forumBookMarkedListSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumBookMarkedListFailure(error));
  }
}

function* onLoadForumBookMarkedList() {
  yield takeLatest(reqForumBookMarkedList.type, onLoadForumBookMarkedListAsync);
}

function* onLoadForumListResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(forumBookMarkedListFailure(error));
  }
}

function* onLoadForumListReset() {
  yield takeLatest(reset.type, onLoadForumListResetAsync);
}

export const forumBookMarkedListSaga = [fork(onLoadForumBookMarkedList), fork(onLoadForumListReset)];
