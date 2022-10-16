import { takeLatest, put, fork } from 'redux-saga/effects';
import { reset, setLogOutHistory, delLogOutHistory } from 'redux/store/forum/forumHistorySlice';

function* onLoadForumHistorySetAsync({ payload }) {
  yield put(setLogOutHistory(payload));
}

function* onLoadForumHistorySet() {
  yield takeLatest(setLogOutHistory.type, onLoadForumHistorySetAsync);
}
function* onLoadForumHistoryDelAsync({ payload }) {
  yield put(delLogOutHistory(payload));
}

function* onLoadForumHistoryDel() {
  yield takeLatest(delLogOutHistory.type, onLoadForumHistoryDelAsync);
}

function* onLoadForumHistoryResetAsync() {
  yield put(reset);
}

function* onLoadForumHistoryReset() {
  yield takeLatest(reset.type, onLoadForumHistoryResetAsync);
}

export const authCodeSaga = [fork(onLoadForumHistoryReset), fork(onLoadForumHistorySet), fork(onLoadForumHistoryDel)];
