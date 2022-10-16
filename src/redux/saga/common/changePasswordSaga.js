import { takeLatest, put, fork } from 'redux-saga/effects';
import {
  reqChangePassword,
  changePasswordSuccess,
  changePasswordFailure
} from 'redux/store/common/changePasswordSlice';
// import { SUCCESS } from 'constants/type';
// import { fetchChangePassword } from '../api';
import Api from '../../api2';

function* onLoadChangePasswordAsync({ payload }) {
  try {
    const { password } = payload;
    // console.log(`payload:: ${payload}`);
    // const response = yield call(fetchChangePassword, payload);
    // if (response.status === SUCCESS) {
    //   console.log(`saga in:: ${payload}`);
    //   yield put(changePasswordSuccess({ ...response.data }));
    // }
    console.log(password);
    const response = Api.reqChangePassword(password);
    yield put(changePasswordSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(changePasswordFailure(error));
  }
}

function* onLoadChangePassword() {
  yield takeLatest(reqChangePassword.type, onLoadChangePasswordAsync);
}

export const changePasswordSaga = [fork(onLoadChangePassword)];
