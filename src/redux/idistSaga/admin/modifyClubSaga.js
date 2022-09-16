import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reset, modifyClubInit, modifyClubSuccess, modifyClubFailure } from 'redux/idistStore/admin/modifyClubSlice';

import axios from 'axios';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

function* onLoadModifyClubAsync({ payload }) {
  try {
    console.log(payload);
    const response = yield call(() =>
      // axios.post(`${process.env.REACT_APP_API_URL}/api/v1/club`, payload.data, {
      //   ...config,
      //   headers: { ...config.headers, 'content-type': 'multipart/form-data' }
      // })

      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/club`, payload, config)
    );

    if (response.status === 200 || response.status === 201) {
      yield put(modifyClubSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error.response.data);
    yield put(modifyClubFailure(error.response.data));
  }
}

function* onLoadModifyClub() {
  yield takeLatest(modifyClubInit.type, onLoadModifyClubAsync);
}

function* onLoadModifyClubResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(modifyClubFailure(error));
  }
}

function* onLoadModifyClubReset() {
  yield takeLatest(reset.type, onLoadModifyClubResetAsync);
}

export const modifyClubSaga = [fork(onLoadModifyClub), fork(onLoadModifyClubReset)];
