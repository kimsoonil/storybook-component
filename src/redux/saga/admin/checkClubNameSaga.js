import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  resetCheckClubName,
  reqCheckClubName,
  checkClubNameSuccess,
  checkClubNameFailure
} from 'redux/store/admin/checkClubNameSlice';

import axios from 'axios';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

function* onLoadCheckClubNameAsync({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/${payload.id ? `club/${payload.id}/` : `clubs/`}check-name`,
        { name: payload.name },
        config
      )
    );
    if (response.status === 200) {
      yield put(checkClubNameSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error.response.data);
    yield put(checkClubNameFailure(error.response.data));
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
