import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/clubSlice';
import * as adminTypes from 'redux/store/adminSlice';
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
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}`, config));
    if (response.status === 200) {
      yield put(actionTypes.getIdClubSuccess({ ...response.data }));
      // console.log(response);
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
function* getClubBoardGroups({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}/board-groups`, config)
    );
    if (response.status === 200) {
      yield put(actionTypes.getClubBoardGroupsSuccess({ ...response.data }));
      console.log('clubSaga getClubBoardGroups success data : ', response?.data?.data.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}
// TODO postClubShareInit

function* postClubShareInit({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload}/share`, '', config)
    );
    if (response.status === 200) {
      yield put(actionTypes.postClubShareSuccess({ ...response.data }));
      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

function* postClubBoardGroup({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload.id}/board-group`, payload.data, config)
    );
    if (response.status === 200 || response.status === 201) {
      yield put(actionTypes.postClubBoardGroupSuccess({ ...response.data }));

      yield put(
        adminTypes.setAdminBoards((prev) => ({ ...prev, selected: { id: response?.data?.data?.id, type: 0 } }))
      );
      console.log('clubSaga postClubBoardGroup success data : ', response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('postClubBoardGroup : ', error);
  }
}

function* patchIdClubBannerImage({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload.id}/banner-image`, payload.data, config)
    );
    if (response.status === 200 || response.status === 201) {
      console.log('clubSaga patchIdClubBannerImage response : ', response);
      yield put(actionTypes.getIdClubInit(payload.id));
      // console.log('clubSaga postClubBoardGroup success data : ', response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('postClubBoardGroup : ', error);
  }
}

function* patchIdClubProfileImage({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/club/${payload.id}/profile-image`, payload.data, config)
    );
    if (response.status === 200 || response.status === 201) {
      console.log('clubSaga patchIdClubProfileImage response : ', response);
      yield put(actionTypes.getIdClubInit(payload.id));
      // console.log('clubSaga postClubBoardGroup success data : ', response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('postClubBoardGroup : ', error);
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
    takeEvery(actionTypes.getClubBoardGroupsInit, getClubBoardGroups),
    takeEvery(actionTypes.postClubBoardGroupInit, postClubBoardGroup),
    takeEvery(actionTypes.patchIdClubBannerImageInit, patchIdClubBannerImage),
    takeEvery(actionTypes.patchIdClubProfileImageInit, patchIdClubProfileImage),
    takeEvery(actionTypes.postClubShareInit, postClubShareInit)
  ]);
}

export const ClubSaga = [fork(clubSaga)];
