import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  resetCreateClub,
  createClubInit,
  createClubSuccess,
  createClubFailure
} from 'redux/idistStore/admin/createClubSlice';

import axios from 'axios';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

function* onLoadCreateClubAsync({ payload }) {
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
      yield put(createClubSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error.response.data);
    yield put(createClubFailure(error.response.data));
  }
}

function* onLoadCreateClub() {
  yield takeLatest(createClubInit.type, onLoadCreateClubAsync);
}

function* onLoadCreateClubResetAsync() {
  try {
    yield put(resetCreateClub);
  } catch (error) {
    console.log(error);
    yield put(createClubFailure(error));
  }
}

function* onLoadCreateClubReset() {
  yield takeLatest(resetCreateClub.type, onLoadCreateClubResetAsync);
}

export const createClubSaga = [fork(onLoadCreateClub), fork(onLoadCreateClubReset)];
