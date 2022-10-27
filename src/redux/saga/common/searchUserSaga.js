import { takeLatest, put, fork } from 'redux-saga/effects';
import { reset, reqsearchUser, searchUserSuccess, searchUserFailure } from 'redux/store/common/searchUserSlice';
// import { fetchMovie } from '../api';
import Api from '../../api2';
// import {SUCCESS} from '../constants/type';
function* onLoadSearchUserAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(AuthEmailSuccess({ ...response.data }));
    // }
    console.log('search saga:', payload);
    const response = Api.searchUserMock(payload);
    yield put(searchUserSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(searchUserFailure(error));
  }
}

function* onLoadSearchUser() {
  yield takeLatest(reqsearchUser.type, onLoadSearchUserAsync);
}

function* onLoadSearchUserResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
  }
}

function* onLoadSearchUserReset() {
  yield takeLatest(reset.type, onLoadSearchUserResetAsync);
}

export const searchUserSaga = [fork(onLoadSearchUser), fork(onLoadSearchUserReset)];
