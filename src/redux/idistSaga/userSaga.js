import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/idistStore/userSlice';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

// TODO: user me
function* getUSer() {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/user/me`, config), '');
    if (response.data.message === 'ok') {
      yield put(actionTypes.getUserSuccess({ ...response.data }));
    }
  } catch (error) {
    yield put(actionTypes.userFailure(error));
    console.log(error);
  }
}

// TODO: patch user
function* patchUser({ payload }) {
  try {
    const response = yield call(
      () => axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/user/me`, payload, config),
      ''
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.patchUserSuccess({ ...response.data }));
    }
  } catch (error) {
    yield put(actionTypes.userFailure(error));
    console.log(error);
  }
}

function* clubSaga() {
  yield all([takeEvery(actionTypes.getUserInit, getUSer), takeEvery(actionTypes.patchUserInit, patchUser)]);
}

export const UserSaga = [fork(clubSaga)];
