import { takeLatest, put, fork } from 'redux-saga/effects';
import { reqAccountInfo, accountInfoSuccess, accountInfoFailure } from 'redux/store/accountInfoSlice';
// import { fetchMovie } from '../api';
import Api from '../api2';
// import {SUCCESS} from '../constants/type';
function* onLoadaccountInfoAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(checkEmailSuccess({ ...response.data }));
    // }
    const { userId } = payload;
    const response = Api.accountInfo(userId);
    yield put(accountInfoSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(accountInfoFailure(error));
  }
}

function* onLoadaccountInfo() {
  yield takeLatest(reqAccountInfo.type, onLoadaccountInfoAsync);
}

export const accountInfoSaga = [fork(onLoadaccountInfo)];
