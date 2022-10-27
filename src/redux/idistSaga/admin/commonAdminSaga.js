import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import * as actionTypes from 'redux/idistStore/admin/commonAdminSlice';
import idistApi from 'redux/idistApi';
import { clubModel } from 'redux/idistApi/model';

function* getClub({ payload }) {
  try {
    // let response;
    // let data;
    // if (payload.id) {
    //   response = yield call(idistApi.getClub, payload);
    //   data = clubModel(response.data?.data);
    // } else {
    //   response = yield call(idistApi.getClubByParams, payload);
    //   data = clubModel(response.data?.data[0]);
    // }
    // if (response.data.message === 'ok') {
    //   yield put(actionTypes.getClubSuccess(data));
    // }
    const response = yield call(idistApi.getClub, payload);
    if (response.data.message === 'ok') {
      yield put(actionTypes.getClubSuccess(clubModel(response.data?.data)));
    }
  } catch (error) {
    yield put(actionTypes.getClubFailure(error));
    console.log(error);
  }
}

function* getClubByAddress({ payload }) {
  try {
    const response = yield call(idistApi.getClubByParams, { params: { address: payload.address } });
    if (response.data.message === 'ok') {
      console.log(clubModel(response.data?.data[0]));
      yield put(actionTypes.getClubSuccess(clubModel(response.data?.data[0])));
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
      console.log('postClub commonAdminSaga.js : ', response.data.data);
      yield put(actionTypes.postClubSuccess(clubModel(response.data?.data)));
    }
  } catch (error) {
    yield put(actionTypes.postClubFailure(error));
    console.log(error);
  }
}

function* patchClubBannerImage({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminClubBannerImage, payload);
    console.log('patchClubBannerImage response : ', response);
    if (response.status === 200 || response.data.message === 'ok') {
      const response2 = yield call(idistApi.getClub, payload);
      // console.log(response2);
      // console.log(response?.data?.data);
      yield put(actionTypes.patchClubBannerImageSuccess(clubModel(response2.data?.data)));
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
      yield put(actionTypes.patchClubProfileImageSuccess(clubModel(response2.data?.data)));
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
  yield all([takeEvery(actionTypes.getClubByAddressInit, getClubByAddress)]);
  yield all([takeEvery(actionTypes.postClubInit, postClub)]);
  yield all([takeEvery(actionTypes.patchClubBannerImageInit, patchClubBannerImage)]);
  yield all([takeEvery(actionTypes.patchClubProfileImageInit, patchClubProfileImage)]);
}

export const commonAdminSaga = [fork(_commonAdminSaga)];
