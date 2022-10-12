/* eslint-disable no-unused-vars */
import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqSignUp, signUpSuccess, signUpFailure } from 'redux/store/signUpSlice';
// import { fetchMovie } from '../api';
import { SUCCESS } from 'constants/type';
import Api from '../api2';

function* onLoadSignUpAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(signUpSuccess({ ...response.data }));
    // }
    const { userInfo, navigate } = payload;
    console.log(SUCCESS);
    const data = Api.getMockSignUp();
    yield put(signUpSuccess({ ...data }));
    navigate('/signup/complete');
  } catch (error) {
    console.log(error);
    yield put(signUpFailure(error));
  }
}

function* onLoadSignUp() {
  yield takeLatest(reqSignUp.type, onLoadSignUpAsync);
}

export const signUpSaga = [fork(onLoadSignUp)];
