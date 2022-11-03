import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reqForumPin,
  forumPinSuccess,
  reqForumUnpin,
  forumUnpinSuccess,
  forumPinFailure
} from 'redux/store/forum/forumBookmarkSlice';
import { CREATED, SUCCESS } from 'constants/type';

import { fetchForumPin, fetchForumUnpin } from '../../api';

function* onLoadForumPinAsync({ payload }) {
  console.log('onLoadForumPinAsync::::', payload);
  try {
    const response = yield call(fetchForumPin, payload);
    console.log(response);
    if (response.status === CREATED) {
      yield put(forumPinSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumPinFailure(error));
  }
}

function* onLoadForumPin() {
  yield takeLatest(reqForumPin.type, onLoadForumPinAsync);
}

function* onLoadForumUnPinAsync({ payload }) {
  console.log('onLoadForumUnPinAsync', payload);
  try {
    const response = yield call(fetchForumUnpin, payload);
    console.log(response);
    if (response.status === SUCCESS) {
      yield put(forumUnpinSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumPinFailure(error));
  }
}

function* onLoadForumUnpin() {
  yield takeLatest(reqForumUnpin.type, onLoadForumUnPinAsync);
}

export const forumBookMarkSaga = [fork(onLoadForumPin), fork(onLoadForumUnpin)];
