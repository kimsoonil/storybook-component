/* eslint-disable no-unused-vars */
import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqSubscribeForum, subscribeForumSuccess, subscribeForumFailure } from 'redux/store/forum/subscribeForumSlice';
// import { fetchMovie } from '../api';
import { SUCCESS } from 'constants/type';
import Api from '../../api2';

function* onLoadSubscribeForumAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(reqSubscribeForum({ ...response.data }));
    // }
    const { status, forumId } = payload;
    console.log(SUCCESS);
    const data = Api.getSubscribeForumMock();
    yield put(subscribeForumSuccess({ ...data }));
  } catch (error) {
    console.log(error);
    yield put(subscribeForumFailure(error));
  }
}

function* onLoadSubscribeForum() {
  yield takeLatest(reqSubscribeForum.type, onLoadSubscribeForumAsync);
}

export const subscribeForumSaga = [fork(onLoadSubscribeForum)];
