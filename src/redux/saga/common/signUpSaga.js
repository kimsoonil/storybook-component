/* eslint-disable no-unused-vars */
import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqSignUp, signUpSuccess, signUpFailure } from 'redux/store/common/signUpSlice';
import { logInSuccess } from 'redux/store/common/logInSlice';
import { fetchSignUp } from 'redux/api';
import { SUCCESS, REFRESH_TOKEN_MAX_AGE } from 'constants/type';
import { setCookie } from 'util/cookie';
import { getStorage, setStorage } from 'util/storage';

function* onLoadSignUpAsync({ payload }) {
  try {
    const { userInfo, navigate } = payload;
    const response = yield call(fetchSignUp, userInfo);
    if (response.status === SUCCESS) {
      console.log('signup::', response);
      yield put(signUpSuccess({ ...response.data }));
      navigate('/signup/complete');
    }
  } catch (error) {
    console.log(error);
    yield put(signUpFailure(error));
  }
}

function* onLoadSignUp() {
  yield takeLatest(reqSignUp.type, onLoadSignUpAsync);
}

export const signUpSaga = [fork(onLoadSignUp)];
