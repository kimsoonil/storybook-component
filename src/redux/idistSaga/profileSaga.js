import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/idistStore/profileSlice';
import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';

const config = getToken();

// TODO: club list
function* getProfile({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/profile/${payload.id}`, {
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getProfileSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);

      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.profileFailure(error));
    console.log(error);
  }
}

function* profileSaga() {
  yield all([takeEvery(actionTypes.getProfileInit, getProfile)]);
}

export const ProfileSaga = [fork(profileSaga)];
