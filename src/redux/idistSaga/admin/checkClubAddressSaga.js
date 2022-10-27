import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  resetCheckClubAddress,
  reqCheckClubAddress,
  checkClubAddressSuccess,
  checkClubAddressFailure
} from 'redux/idistStore/admin/checkClubAddressSlice';

import idistApi from 'redux/idistApi';

function* onLoadCheckClubAddressAsync({ payload }) {
  try {
    let response;
    if (payload.id) {
      response = yield call(idistApi.postAdminClubAddressCheck, payload);
    } else {
      response = yield call(idistApi.postAdminClubsAddressCheck, payload);
    }
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(checkClubAddressSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error.response.data);
    yield put(checkClubAddressFailure(error));
  }
}

function* onLoadCheckClubAddress() {
  yield takeLatest(reqCheckClubAddress.type, onLoadCheckClubAddressAsync);
}

function* onLoadCheckClubAddressResetAsync() {
  try {
    yield put(resetCheckClubAddress);
  } catch (error) {
    console.log(error);
    yield put(checkClubAddressFailure(error));
  }
}

function* onLoadCheckClubAddressReset() {
  yield takeLatest(resetCheckClubAddress.type, onLoadCheckClubAddressResetAsync);
}

export const checkClubAddressSaga = [fork(onLoadCheckClubAddress), fork(onLoadCheckClubAddressReset)];
