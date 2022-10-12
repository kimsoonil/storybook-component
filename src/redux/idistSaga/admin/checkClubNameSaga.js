import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  resetCheckClubName,
  reqCheckClubName,
  checkClubNameSuccess,
  checkClubNameFailure
} from 'redux/idistStore/admin/checkClubNameSlice';

import idistApi from 'redux/idistApi';

function* onLoadCheckClubNameAsync({ payload }) {
  try {
    const response = yield call(idistApi.postAdminClubNameCheck, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(checkClubNameSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error.response.data);
    yield put(checkClubNameFailure(error));
  }
}

function* onLoadCheckClubName() {
  yield takeLatest(reqCheckClubName.type, onLoadCheckClubNameAsync);
}

function* onLoadCheckClubNameResetAsync() {
  try {
    yield put(resetCheckClubName);
  } catch (error) {
    console.log(error);
    yield put(checkClubNameFailure(error));
  }
}

function* onLoadCheckClubNameReset() {
  yield takeLatest(resetCheckClubName.type, onLoadCheckClubNameResetAsync);
}

export const checkClubNameSaga = [fork(onLoadCheckClubName), fork(onLoadCheckClubNameReset)];
