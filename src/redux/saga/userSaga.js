import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/userSlice';
import { getToken } from 'util/Cookies/Cookies';

const config = getToken();

// TODO: user me
function* getUSer() {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/user/me`, config), '');
    if (response.status === 200) {
      yield put(actionTypes.getUserSuccess({ ...response.data }));
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.userFailure(error));
    console.log(error);
  }
}

// TODO: patch user
function* patchUser({ payload }) {
  try {
    const response = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/api/user/me`, payload, config), '');
    if (response.status === 200) {
      yield put(actionTypes.patchUserSuccess({ ...response.data }));
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.userFailure(error));
    console.log(error);
  }
}

function* clubSaga() {
  yield all([takeLatest(actionTypes.getUserInit, getUSer), takeLatest(actionTypes.patchUserInit, patchUser)]);
}

export const userSaga = [fork(clubSaga)];
