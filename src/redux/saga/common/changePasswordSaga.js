import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reqChangePassword,
  changePasswordSuccess,
  changePasswordFailure
} from 'redux/store/common/changePasswordSlice';
import { SUCCESS } from 'constants/type';
import { fetchChangePwd } from 'redux/api';
// import Api from '../../api2';

function* onLoadChangePasswordAsync({ payload }) {
  try {
    console.log(`payload:: ${payload}`);
    const response = yield call(fetchChangePwd, payload);
    console.log(response);
    console.log(response.status);

    if (response.status === SUCCESS) {
      yield put(changePasswordSuccess());
    }
  } catch (error) {
    console.log(error);
    yield put(changePasswordFailure(error));
  }
}

function* onLoadChangePassword() {
  yield takeLatest(reqChangePassword.type, onLoadChangePasswordAsync);
}

export const changePasswordSaga = [fork(onLoadChangePassword)];
