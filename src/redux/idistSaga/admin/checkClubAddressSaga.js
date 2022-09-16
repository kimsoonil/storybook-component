import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  resetCheckClubAddress,
  reqCheckClubAddress,
  checkClubAddressSuccess,
  checkClubAddressFailure
} from 'redux/idistStore/admin/checkClubAddressSlice';

import axios from 'axios';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

function* onLoadCheckClubAddressAsync({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/${payload.id ? `club/${payload.id}/` : `clubs/`}check-address`,
        { address: payload.address },
        config
      )
    );
    if (response.status === 200) {
      yield put(checkClubAddressSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error.response.data);
    yield put(checkClubAddressFailure(error.response.data));
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
