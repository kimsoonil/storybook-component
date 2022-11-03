import { takeLeading, takeLatest, put, fork, call, takeEvery } from 'redux-saga/effects';
import {
  reset,
  reqForumList,
  forumListSuccess,
  forumListFailure,
  reqAllForumList,
  allForumListSuccess,
  reqTodayForum,
  todayForumSuccess,
  setSubsForum
} from 'redux/store/forum/forumListSlice';
import { showPopup } from 'redux/store/common/popupSlice';
import { SUCCESS, POPUP_TYPE_ALERT } from 'constants/type';

import { fetchForumList } from '../../api';

function* onLoadForumListAsync({ payload }) {
  try {
    console.log('::onLoadForumListAsync:::', payload);
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

function* onLoadAllForumListAsync({ payload }) {
  try {
    const response = yield call(fetchForumList, payload);
    if (response.status === SUCCESS) {
      yield put(allForumListSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumListFailure(error));
  }
}

function* onLoadAllForumList() {
  yield takeEvery(reqAllForumList.type, onLoadAllForumListAsync);
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

function* onLoadTodayForumAsync({ payload }) {
  try {
    const response = yield call(fetchForumList, payload);
    if (response.status === SUCCESS) {
      yield put(todayForumSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumListFailure(error));
  }
}

function* onLoadTodayForum() {
  yield takeLatest(reqTodayForum.type, onLoadTodayForumAsync);
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

export const forumListSaga = [
  fork(onLoadForumList),
  fork(onLoadForumListReset),
  fork(onLoadAllForumList),
  fork(onLoadTodayForum),
  fork(onLoadForumListSubsSet)
];
