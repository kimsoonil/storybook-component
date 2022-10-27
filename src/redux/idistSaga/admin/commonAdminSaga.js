import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import * as actionTypes from 'redux/idistStore/admin/commonAdminSlice';
import idistApi from 'redux/idistApi';

function* getClub({ payload }) {
  try {
    const response = yield call(idistApi.getClub, payload);
    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.getClubFailure(error));
    console.log(error);
  }
}

// 이거 아직 미완!!!!
function* postClub({ payload }) {
  try {
    const response = yield call(idistApi.postAdminClub, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      console.log('이거 아직 미완!!!! : postClub commonAdminSaga.js');
      // yield put(actionTypes.postClubSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.postClubFailure(error));
    console.log(error);
  }
}

function* patchClubBannerImage({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminClubBannerImage, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      const response2 = yield call(idistApi.getClub, payload);
      // console.log(response2);
      // console.log(response?.data?.data);
      yield put(actionTypes.patchClubBannerImageSuccess(response2.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.patchClubBannerImageFailure(error));
    console.log(error);
  }
}

function* patchClubProfileImage({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminClubProfileImage, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      const response2 = yield call(idistApi.getClub, payload);
      console.log(response2);
      // console.log(response?.data?.data);
      yield put(actionTypes.patchClubProfileImageSuccess(response2.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.patchClubProfileImageFailure(error));
    console.log(error);
  }
}

// Todo - patchClubTagsInit,
// function* patchClubTags

function* _commonAdminSaga() {
  yield all([takeEvery(actionTypes.getClubInit, getClub)]);
  yield all([takeEvery(actionTypes.postClubInit, postClub)]);
  yield all([takeEvery(actionTypes.patchClubBannerImageInit, patchClubBannerImage)]);
  yield all([takeEvery(actionTypes.patchClubProfileImageInit, patchClubProfileImage)]);
}

export const commonAdminSaga = [fork(_commonAdminSaga)];
