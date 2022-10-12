import { takeLatest, put, fork } from 'redux-saga/effects';
import { reset, reqAuthCode, authCodeSuccess, authCodeFailure } from 'redux/store/authCodeSlice';
// import { fetchMovie } from '../api';
import Api from '../api2';
// import {SUCCESS} from '../constants/type';
function* onLoadAuthCodeAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(checkEmailSuccess({ ...response.data }));
    // }
    const { code } = payload;
    const response = Api.reqAuthCode(code);
    yield put(authCodeSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(authCodeFailure(error));
  }
}

function* onLoadAuthCode() {
  yield takeLatest(reqAuthCode.type, onLoadAuthCodeAsync);
}

function* onLoadAuthCodeResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(authCodeFailure(error));
  }
}

function* onLoadAuthCodeReset() {
  yield takeLatest(reset.type, onLoadAuthCodeResetAsync);
}

export const authCodeSaga = [fork(onLoadAuthCode), fork(onLoadAuthCodeReset)];
