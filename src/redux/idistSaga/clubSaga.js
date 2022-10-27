import { takeEvery, all, put, fork, call, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/idistStore/clubSlice';
import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';

const config = getToken();

// TODO: club list
function* getClubs({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/clubs`, {
        params: payload.parameters,
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubsSuccess({ ...response.data, payload }));

      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}
function* getMoreClubs({ payload }) {
  try {
    const { currentPage, isEndOfCatalogue } = yield select((state) => state.club);
    if (isEndOfCatalogue) return;
    payload.parameters.page = currentPage + 1;
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/clubs`, {
        params: payload.parameters,
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getMoreClubsSuccess({ ...response.data, payload }));
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}
// TODO: club post
function* postClub({ payload }) {
  try {
    const response = yield call(
      () => axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/clubs`, payload.parameters, config),
      ''
    );
    if (response.status === 200) {
      yield put(actionTypes.postClubSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}
// TODO: club Recommend list
function* getClubsRecommend({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/clubs/recommend`, {
        params: payload.parameters,
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubsRecommendSuccess({ ...response.data }));

      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}
// TODO: club id
function* getClub({ payload }) {
  // console.log('club Saga getClub id : ', payload.id);
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}`, config)
    );

    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubSuccess({ ...response.data }));
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

// TODO: club Pin
function* postClubPin({ payload }) {
  try {
    const response = yield call(
      () => axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/pin`, '', config),
      ''
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('Pin : ', error);
  }
}
// TODO: club Unpin
function* postClubUnpin({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/unpin`, '', config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('Unpin : ', error);
  }
}
// TODO: club join
function* postClubJoin({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/join`, '', config)
    );
    if (response.data.message === 'ok') {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
      }
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('Unpin : ', error);
  }
}

// TODO: club boards
function* getClubBoardGroups({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/board-groups`, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubBoardGroupsSuccess({ ...response.data }));
      // console.log('clubSaga getClubBoardGroups data : ', response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}
// TODO postClubShareInit

function* postClubShare({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/share`, payload.parameters, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.postClubShareSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
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
      axios.post(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/board-group`,
        payload.parameters,
        config
      )
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.postClubBoardGroupSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      // yield put(adminTypes.updateSelected({ id: response?.data?.data?.id, type: 0 }));
      // console.log('clubSaga postClubBoardGroup success data : ', response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('postClubBoardGroup : ', error);
  }
}

function* patchClubBannerImage({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/banner-image`,
        payload.parameters,
        config
      )
    );
    if (response.data.message === 'ok') {
      console.log('clubSaga patchClubBannerImage response : ', response);
      yield put(actionTypes.getClubInit({ id: payload.id }));
      yield call(sagaCallback, payload, response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('patchClubBannerImage : ', error);
  }
}

function* patchClubProfileImage({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/profile-image`,
        payload.parameters,
        config
      )
    );
    if (response.data.message === 'ok') {
      console.log('clubSaga patchClubProfileImage response : ', response);
      yield put(actionTypes.getClubInit({ id: payload.id }));
      yield call(sagaCallback, payload, response?.data?.data);
      // console.log('clubSaga patchClubProfileImage success data : ', response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log('postClubBoardGroup : ', error);
  }
}

function* getClubDashboard({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/dashboard`, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubDashboardSuccess({ ...response.data }));
      console.log(response?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

function* patchClub({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}`, payload.parameters, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.patchClubSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      console.log(response?.data);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

function* deleteClubTemporary({ payload }) {
  try {
    const response = yield call(() =>
      axios.delete(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/posts/temporary`, config)
    );
    if (response.status === 204) {
      if (payload.actionList) {
        yield all(payload.actionList.map((action) => put(action)));
        yield call(sagaCallback, payload, response?.data?.data);
      }
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

// TODO: club Profiles
function* getclubProfiles({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/profiles`,
        { params: payload.parameters },
        config
      )
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getclubProfilesSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

function* clubSaga() {
  yield all([
    takeEvery(actionTypes.getClubsInit, getClubs),
    takeEvery(actionTypes.getMoreClubsInit, getMoreClubs),
    takeEvery(actionTypes.postClubInit, postClub),
    takeEvery(actionTypes.getClubsRecommendInit, getClubsRecommend),
    takeEvery(actionTypes.getClubInit, getClub),
    takeEvery(actionTypes.postClubPinInit, postClubPin),
    takeEvery(actionTypes.postClubUnpinInit, postClubUnpin),
    takeEvery(actionTypes.postClubJoinInit, postClubJoin),
    takeEvery(actionTypes.getClubBoardGroupsInit, getClubBoardGroups),
    takeEvery(actionTypes.postClubBoardGroupInit, postClubBoardGroup),
    takeEvery(actionTypes.patchClubBannerImageInit, patchClubBannerImage),
    takeEvery(actionTypes.patchClubProfileImageInit, patchClubProfileImage),
    takeEvery(actionTypes.postClubShareInit, postClubShare),
    takeEvery(actionTypes.getClubDashboardInit, getClubDashboard),
    takeEvery(actionTypes.patchClubInit, patchClub),
    takeEvery(actionTypes.deleteClubTemporaryInit, deleteClubTemporary),
    takeEvery(actionTypes.getclubProfilesInit, getclubProfiles)
  ]);
}

export const ClubSaga = [fork(clubSaga)];
