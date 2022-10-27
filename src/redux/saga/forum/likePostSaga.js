/* eslint-disable no-unused-vars */
import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqLikePost, likePostSuccess, likePostFailure } from 'redux/store/forum/likePostSlice';
// import { fetchMovie } from '../api';
import { SUCCESS } from 'constants/type';
import Api from '../../api2';

function* onLoadLikePostAsync({ payload }) {
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(reqLikePost({ ...response.data }));
    // }
    const { status, forumId } = payload;
    console.log(SUCCESS);
    const data = Api.setLikePostMock();
    yield put(likePostSuccess({ ...data }));
  } catch (error) {
    console.log(error);
    yield put(likePostFailure(error));
  }
}

function* onLoadLikePost() {
  yield takeLatest(reqLikePost.type, onLoadLikePostAsync);
}

export const likePostSaga = [fork(onLoadLikePost)];
