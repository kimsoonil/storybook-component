import { takeLeading, takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reset,
  reqForumList,
  forumListSuccess,
  forumListFailure,
  setSubsForum
} from 'redux/store/forum/forumListSlice';
import { showPopup } from 'redux/store/common/popupSlice';
import { SUCCESS, POPUP_TYPE_ALERT } from 'constants/type';

import { fetchForumList } from '../../api';

function* onLoadForumListAsync({ payload }) {
  try {
    const response = yield call(fetchForumList, payload);
    if (response.status === SUCCESS) {
      yield put(forumListSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumListFailure(error));
  }
}

function* onLoadForumList() {
  yield takeLatest(reqForumList.type, onLoadForumListAsync);
}

function* onLoadForumListResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(forumListFailure(error));
  }
}

function* onLoadForumListReset() {
  yield takeLatest(reset.type, onLoadForumListResetAsync);
}

function* onLoadForumListSubsSetAsync({ payload }) {
  try {
    const { dispatch, contents } = payload;
    dispatch(showPopup({ contents, type: POPUP_TYPE_ALERT }));
    yield put(setSubsForum(payload));
  } catch (error) {
    console.log(error);
  }
}

function* onLoadForumListSubsSet() {
  yield takeLeading(setSubsForum.type, onLoadForumListSubsSetAsync);
}

export const forumListSaga = [fork(onLoadForumList), fork(onLoadForumListReset), fork(onLoadForumListSubsSet)];
