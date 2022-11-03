import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reset,
  reqForumRankingList,
  forumRankingListSuccess,
  forumRankingListFailure
} from 'redux/store/forum/forumRankingListSlice';
import { SUCCESS } from 'constants/type';

import { fetchForumRankingList } from '../../api';

function* onLoadForumRankingListAsync({ payload }) {
  try {
    const response = yield call(fetchForumRankingList, payload);
    if (response.status === SUCCESS) {
      yield put(forumRankingListSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(forumRankingListFailure(error));
  }
}

function* onLoadForumRankingList() {
  yield takeLatest(reqForumRankingList.type, onLoadForumRankingListAsync);
}

function* onLoadForumRankingListResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
    yield put(forumRankingListFailure(error));
  }
}

function* onLoadForumRankingListReset() {
  yield takeLatest(reset.type, onLoadForumRankingListResetAsync);
}

export const forumRankingListSaga = [fork(onLoadForumRankingList), fork(onLoadForumRankingListReset)];
