import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  getClub,
  getClubSuccess,
  getClubFailure,
  getMyClub,
  getMyClubSuccess,
  getMyClubFailure
} from 'redux/store/club/clubSlice';
import { fetchClub, fetchMyClub } from 'redux/api';

function* onLoadClubAsync({ payload }) {
  try {
    const clubId = payload;
    const response = yield call(fetchClub, clubId);
    if (response.status === 200) {
      yield put(getClubSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(getClubFailure(error));
  }
}

function* onLoadClub() {
  yield takeLatest(getClub.type, onLoadClubAsync);
}

function* onLoadMyClubAsync() {
  try {
    const response = yield call(fetchMyClub);
    if (response.status === 200) {
      yield put(getMyClubSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(getMyClubFailure(error));
  }
}

function* onLoadMyClub() {
  yield takeLatest(getMyClub.type, onLoadMyClubAsync);
}

export const ClubAdnimSaga = [fork(onLoadClub), fork(onLoadMyClub)];
