import { takeLatest, put, fork } from 'redux-saga/effects';
import {
  reset,
  reqForumRankingList,
  forumRankingListSuccess,
  forumRankingListFailure
} from 'redux/store/forum/forumRankingListSlice';

import Api from '../../api2';

function* onLoadForumRankingListAsync({ payload }) {
  console.log(payload);
  try {
    // const response = yield call(Api.fetchSignUp, payload);
    // if (response.status === SUCCESS) {
    //   yield put(AuthEmailSuccess({ ...response.data }));
    // }
    const response = Api.forumRankingListMock(payload);
    yield put(forumRankingListSuccess({ ...response }));
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
