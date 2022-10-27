import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reset, reqAuthEmail, authEmailSuccess, authEmailFailure } from 'redux/store/common/authEmailSlice';
import { fetchAuthEmail } from 'redux/api';
import { SUCCESS } from 'constants/type';

function* onLoadAuthEamilAsync({ payload }) {
  try {
    const response = yield call(fetchAuthEmail, payload);
    if (response.status === SUCCESS) {
      console.log(response);
      yield put(authEmailSuccess({ ...response.data, email: payload.email }));
    }
  } catch (error) {
    console.log(error);
    yield put(authEmailFailure(error));
  }
}

function* onLoadAuthEmail() {
  yield takeLatest(reqAuthEmail.type, onLoadAuthEamilAsync);
}

function* onLoadAuthEamilResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(authEmailFailure(error));
  }
}

function* onLoadAuthEmailReset() {
  yield takeLatest(reset.type, onLoadAuthEamilResetAsync);
}

export const authEmailSaga = [fork(onLoadAuthEmail), fork(onLoadAuthEmailReset)];
