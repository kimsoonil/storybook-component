import { takeLeading, takeLatest, put, fork } from 'redux-saga/effects';
import {
  reset,
  reqForumList,
  forumListSuccess,
  forumListFailure,
  setSubsForum
} from 'redux/store/forum/forumListSlice';
import { showPopup } from 'redux/store/common/popupSlice';
import { POPUP_TYPE_ALERT } from 'constants/type';

import Api from '../../api2';

function* onLoadForumListAsync({ payload }) {
  console.log(payload);
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(AuthEmailSuccess({ ...response.data }));
    // }
    const response = Api.reqForumList(payload);
    yield put(forumListSuccess({ ...response }));
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
