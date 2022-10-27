/* eslint-disable no-unused-vars */
import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqEditNickName, editNickNameSuccess, editNickNameFailure } from 'redux/store/common/nickNameSlice';
import { fetchChangeNickname } from 'redux/api';
import { SUCCESS } from 'constants/type';

function* onLoadEditNickNameAsync({ payload }) {
  try {
    const response = yield call(fetchChangeNickname, payload);
    if (response.status === SUCCESS) {
      yield put(editNickNameSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(editNickNameFailure(error));
  }
}

function* onLoadEditNickName() {
  yield takeLatest(reqEditNickName.type, onLoadEditNickNameAsync);
}

export const nickNameSaga = [fork(onLoadEditNickName)];
