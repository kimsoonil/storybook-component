import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/clubSlice';
import { getToken } from 'util/Cookies/Cookies';

const config = getToken();

// TODO: club list
function* getClubs() {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/clubs`), '');
    if (response.status === 200) {
      yield put(actionTypes.getClubSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

// TODO: club post
function* postClubs({ payload }) {
  try {
    const response = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/api/v1/clubs`, payload, config), '');
    if (response.status === 200) {
      yield put(actionTypes.getClubSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

// TODO: club id
function* getIdClub({ payload }) {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}`), '');
    if (response.status === 200) {
      yield put(actionTypes.getIdClubSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

// TODO: club Members
function* getClubMembers({ payload }) {
  try {
    const response = yield call(
      () => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}/members`, config),
      ''
    );
    if (response.status === 200) {
      yield put(actionTypes.getClubMembersSuccess({ ...response.data }));
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('Member : ', error);
  }
}

// TODO: club Members
function* postClubPin({ payload }) {
  try {
    const response = yield call(
      () => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}/pin`, config),
      ''
    );
    if (response.status === 200) {
      yield put(actionTypes.postClubPinSuccess({ ...response.data }));
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('Member : ', error);
  }
}

// TODO: club boards
function* getClubBoards({ payload }) {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}/boards`), '');
    if (response.status === 200) {
      yield put(actionTypes.getClubBoardsSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

function* clubSaga() {
  yield all([
    takeLatest(actionTypes.getClubInit, getClubs),
    takeLatest(actionTypes.postClubInit, postClubs),
    takeLatest(actionTypes.getIdClubInit, getIdClub),
    takeLatest(actionTypes.postClubPinInit, postClubPin),
    takeLatest(actionTypes.getClubMembersInit, getClubMembers),
    takeLatest(actionTypes.getClubBoardsInit, getClubBoards)
  ]);
}

export const ClubSaga = [fork(clubSaga)];
