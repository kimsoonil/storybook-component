import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/clubSlice';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

// TODO: club list
function* getClubs({ payload }) {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/clubs?search=${payload}`), '');
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
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}`));
    if (response.status === 200) {
      yield put(actionTypes.getIdClubSuccess({ ...response.data }));
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

// TODO: club list
function* getClubMe({ payload }) {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/clubs/${payload}/me`));
    if (response.status === 200) {
      yield put(actionTypes.getClubMeSuccess({ ...response.data }));
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

// TODO: club Pin
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
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}/board-groups`)
    );
    if (response.status === 200) {
      yield put(actionTypes.getClubBoardsSuccess({ ...response.data }));
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}
// TODO postShare

function* postShare({ payload }) {
  try {
    const response = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}/share`));
    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

function* clubSaga() {
  yield all([
    takeEvery(actionTypes.getClubInit, getClubs),
    takeEvery(actionTypes.postClubInit, postClubs),
    takeEvery(actionTypes.getIdClubInit, getIdClub),
    takeEvery(actionTypes.getClubMeInit, getClubMe),
    takeEvery(actionTypes.postClubPinInit, postClubPin),
    takeEvery(actionTypes.getClubMembersInit, getClubMembers),
    takeEvery(actionTypes.getClubBoardsInit, getClubBoards),
    takeEvery(actionTypes.postClubShareInit, postShare)
  ]);
}

export const ClubSaga = [fork(clubSaga)];
