import { takeLatest, put, fork } from 'redux-saga/effects';
import {
  reset,
  reqAuthPhoneNumber,
  authPhoneNumberSuccess,
  authPhoneNumberFailure
} from 'redux/store/common/authPhoneNumberSlice';
// import { fetchMovie } from '../api';
import Api from '../../api2';
// import {SUCCESS} from '../constants/type';
function* onLoadAuthPhoneNumberAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(AuthEmailSuccess({ ...response.data }));
    // }
    const { phoneNumber } = payload;
    console.log(phoneNumber);
    const response = Api.reqAuthEmail(phoneNumber);
    yield put(authPhoneNumberSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(authPhoneNumberFailure(error));
  }
}

function* onLoadAuthPhoneNumber() {
  yield takeLatest(reqAuthPhoneNumber.type, onLoadAuthPhoneNumberAsync);
}

function* onLoadAuthPhoneNumberResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(authPhoneNumberFailure(error));
  }
}

function* onLoadAuthPhoneNumberReset() {
  yield takeLatest(reset.type, onLoadAuthPhoneNumberResetAsync);
}

export const authPhoneNumberSaga = [fork(onLoadAuthPhoneNumber), fork(onLoadAuthPhoneNumberReset)];
