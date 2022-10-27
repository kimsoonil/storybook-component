import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reset, reqAuthCode, authCodeSuccess, authCodeFailure } from 'redux/store/common/authCodeSlice';
import { fetchAuthCodeCheck } from 'redux/api';
import { SUCCESS } from 'constants/type';

function* onLoadAuthCodeAsync({ payload }) {
  try {
    const response = yield call(fetchAuthCodeCheck, payload);
    if (response.status === SUCCESS) {
      yield put(authCodeSuccess({ ...response.data, code: payload.code }));
    }
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
    console.log('reset Code');
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
