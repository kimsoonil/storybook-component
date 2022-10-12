import { takeLatest, put, fork } from 'redux-saga/effects';
import { reset, reqCheckNickName, checkNickNameSuccess, checkNickNameFailure } from 'redux/store/checkNickNameSlice';
// import { fetchMovie } from '../api';
import Api from '../api2';
// import {SUCCESS} from '../constants/type';
function* onLoadCheckNickNameAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(CheckNickNameSuccess({ ...response.data }));
    // }
    console.log('checknick');
    const { nickName } = payload;
    console.log(nickName);
    const response = Api.reqCheckNickName(nickName);
    yield put(checkNickNameSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(checkNickNameFailure(error));
  }
}

function* onLoadCheckNickName() {
  yield takeLatest(reqCheckNickName.type, onLoadCheckNickNameAsync);
}

function* onLoadCheckNickNameResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(checkNickNameFailure(error));
  }
}

function* onLoadCheckNickNameReset() {
  yield takeLatest(reset.type, onLoadCheckNickNameResetAsync);
}

export const checkNickNameSaga = [fork(onLoadCheckNickName), fork(onLoadCheckNickNameReset)];
