import { takeLatest, put, fork } from 'redux-saga/effects';
import { reqCheckEmail, checkEmailSuccess, checkEmailFailure } from 'redux/store/checkEmailSlice';
// import { fetchMovie } from '../api';
import Api from '../api2';
// import {SUCCESS} from '../constants/type';
function* onLoadCheckEamilAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(checkEmailSuccess({ ...response.data }));
    // }
    const { email } = payload;
    console.log(email);
    const response = Api.getCheckEmail(email);
    yield put(checkEmailSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(checkEmailFailure(error));
  }
}

function* onLoadCheckEmail() {
  yield takeLatest(reqCheckEmail.type, onLoadCheckEamilAsync);
}

export const checkEmailSaga = [fork(onLoadCheckEmail)];
