import { takeLeading, takeLatest, put, fork } from 'redux-saga/effects';
import {
  reset,
  reqPostRankingList,
  postRankingListSuccess,
  postRankingListFailure,
  setLikePost
} from 'redux/store/forum/postRankingListSlice';

import Api from '../../api2';

function* onLoadpostRankingListAsync({ payload }) {
  console.log(payload);
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(AuthEmailSuccess({ ...response.data }));
    // }
    const response = Api.getPostRankingList(payload);
    yield put(postRankingListSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(postRankingListFailure(error));
  }
}

function* onLoadpostRankingList() {
  yield takeLatest(reqPostRankingList.type, onLoadpostRankingListAsync);
}

function* onLoadpostRankingListResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(postRankingListFailure(error));
  }
}

function* onLoadpostRankingListReset() {
  yield takeLatest(reset.type, onLoadpostRankingListResetAsync);
}

function* onLoadPostRankingLikeAsync({ payload }) {
  try {
    console.log(payload);
    yield put(setLikePost(payload));
  } catch (error) {
    console.log(error);
  }
}

function* onLoadPostRankingLike() {
  yield takeLeading(setLikePost.type, onLoadPostRankingLikeAsync);
}

export const postRankingListSaga = [
  fork(onLoadpostRankingList),
  fork(onLoadpostRankingListReset),
  fork(onLoadPostRankingLike)
];
