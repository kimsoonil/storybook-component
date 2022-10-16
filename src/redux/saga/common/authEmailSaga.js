import { takeLatest, put, fork } from 'redux-saga/effects';
import { reset, reqAuthEmail, authEmailSuccess, authEmailFailure } from 'redux/store/common/authEmailSlice';
// import { fetchMovie } from '../api';
import Api from '../../api2';
// import {SUCCESS} from '../constants/type';
function* onLoadAuthEamilAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(AuthEmailSuccess({ ...response.data }));
    // }
    const { email } = payload;
    console.log(email);
    const response = Api.reqAuthEmail(email);
    yield put(authEmailSuccess({ ...response }));
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
