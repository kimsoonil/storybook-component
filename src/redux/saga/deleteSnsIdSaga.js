import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqDeleteSnsId, deleteSnsIdSuccess, deleteSnsIdFailure } from 'redux/store/deleteSnsIdSlice';
import { SUCCESS } from 'constants/type';
// import { fetchAuthSns } from '../api';
import Api from '../api2';

function* onLoadDeleteSndIdAsync({ payload }) {
  try {
    // console.log(`payload:: ${payload}`);
    // const response = yield call(fetchAuthSns, payload);
    // if (response.status === SUCCESS) {
    //   console.log(`saga in:: ${payload}`);
    //   yield put(deleteSnsIdSuccess({ ...response.data }));
    // }
    console.log(payload);
    const response = Api.reqDeleteSnsId(payload);
    yield put(deleteSnsIdSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(deleteSnsIdFailure(error));
  }
}

function* onLoadDeleteSns() {
  yield takeLatest(reqDeleteSnsId.type, onLoadDeleteSndIdAsync);
}

export const deleteSnsIdSaga = [fork(onLoadDeleteSns)];
