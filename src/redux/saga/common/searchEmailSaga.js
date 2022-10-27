import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reset, reqSearchEmail, searchEmailSuccess, searchEmailFailure } from 'redux/store/common/searchEmailSlice';
import { fetchAuthEmail } from 'redux/api';
import { SUCCESS } from 'constants/type';

function* onLoadAuthEamilAsync({ payload }) {
  try {
    const response = yield call(fetchAuthEmail, payload);
    if (response.status === SUCCESS) {
      console.log(response);
      yield put(searchEmailSuccess({ ...response.data, email: payload.email }));
    }
  } catch (error) {
    console.log(error);
    yield put(searchEmailFailure(error));
  }
}

function* onLoadAuthEmail() {
  yield takeLatest(reqSearchEmail.type, onLoadAuthEamilAsync);
}

function* onLoadAuthEamilResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(searchEmailFailure(error));
  }
}

function* onLoadAuthEmailReset() {
  yield takeLatest(reset.type, onLoadAuthEamilResetAsync);
}

export const authEmailSaga = [fork(onLoadAuthEmail), fork(onLoadAuthEmailReset)];
