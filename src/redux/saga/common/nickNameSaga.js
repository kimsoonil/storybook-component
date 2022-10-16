/* eslint-disable no-unused-vars */
import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqEditNickName, editNickNameSuccess, editNickNameFailure } from 'redux/store/common/nickNameSlice';
// import { fetchMovie } from '../api';
import { SUCCESS } from 'constants/type';
import Api from '../../api2';

function* onLoadEditNickNameAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchEditNickName, payload);
    // if (response.status === SUCCESS) {
    //   yield put(EditNickNameSuccess({ ...response.data }));
    // }
    const { nickName } = payload;
    console.log(SUCCESS);
    const data = Api.editNickName(nickName);
    yield put(editNickNameSuccess({ ...data }));
    console.log(data);
  } catch (error) {
    console.log(error);
    yield put(editNickNameFailure(error));
  }
}

function* onLoadEditNickName() {
  yield takeLatest(reqEditNickName.type, onLoadEditNickNameAsync);
}

export const nickNameSaga = [fork(onLoadEditNickName)];
