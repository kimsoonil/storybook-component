import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reset,
  reqPostRankingList,
  postRankingListSuccess,
  postRankingListFailure
} from 'redux/store/forum/postRankingListSlice';
import { SUCCESS } from 'constants/type';

import { fetchForumPostList } from '../../api';
// import Api from '../../api2';

function* onLoadpostRankingListAsync({ payload }) {
  try {
    const response = yield call(fetchForumPostList, payload);
    if (response.status === SUCCESS) {
      yield put(postRankingListSuccess({ ...response.data }));
    }
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

export const postRankingListSaga = [fork(onLoadpostRankingList), fork(onLoadpostRankingListReset)];
