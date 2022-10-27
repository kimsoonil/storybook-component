import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reqChangeNickname,
  changeNicknameSuccess,
  changeNicknameFailure
} from 'redux/store/common/changeNicknameSlice';
import { SUCCESS } from 'constants/type';
import { fetchChangeNickname } from 'redux/api';

function* onLoadChangeNicknameAsync({ payload }) {
  try {
    console.log(`payload:: ${payload}`);
    const response = yield call(fetchChangeNickname, payload);
    if (response.status === SUCCESS) {
      yield put(changeNicknameSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(changeNicknameFailure(error));
  }
}

function* onLoadChangeNickname() {
  yield takeLatest(reqChangeNickname.type, onLoadChangeNicknameAsync);
}

export const changeNicknameSaga = [fork(onLoadChangeNickname)];
