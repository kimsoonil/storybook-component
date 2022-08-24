import { takeLatest, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import { getTest, getTestSuccess, getTestFailure } from 'redux/store/testSlice';

function* onLoadTestAsync() {
  try {
    const response = yield call(() => axios.get('https://djangoazuretest.azurewebsites.net/posts'), '');
    if (response.status === 200) {
      yield put(getTestSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(getTestFailure(error));
    console.log(error);
  }
}

function* onLoadTest() {
  yield takeLatest(getTest.type, onLoadTestAsync);
}

export const testSaga = [fork(onLoadTest)];
