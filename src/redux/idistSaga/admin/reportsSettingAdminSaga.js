import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import * as actionTypes from 'redux/idistStore/admin/reportsSettingAdminSlice';
import idistApi from 'redux/idistApi';

function* getReportChoices({ payload }) {
  try {
    const response = yield call(idistApi.getClubReportChoices, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      console.log('getReportChoices success');
      yield put(actionTypes.getReportChoicesSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.getReportChoicesFailure(error));
    console.log(error);
  }
}

function* patchReportChoice({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminReportChoice, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.patchReportChoiceSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.patchReportChoiceFailure(error));
    console.log(error);
  }
}

function* postReportChoice({ payload }) {
  try {
    const response = yield call(idistApi.postAdminClubReportChoice, payload);
    if (response.status === 201 || response.data.message === 'ok') {
      console.log('postReportChoice success');
      yield put(actionTypes.postReportChoiceSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.postReportChoiceFailure(error));
    console.log(error);
  }
}

function* deleteReportChoice({ payload }) {
  try {
    const response = yield call(idistApi.deleteAdminReportChoice, payload);
    if (response.status === 204 || response.data.message === 'ok') {
      console.log('deleteReportChoice success');
      yield put(actionTypes.deleteReportChoiceSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.deleteReportChoiceFailure(error));
    console.log(error);
  }
}

function* reportsSettingAdminSagas() {
  yield all([takeEvery(actionTypes.getReportChoicesInit, getReportChoices)]);
  yield all([takeEvery(actionTypes.patchReportChoiceInit, patchReportChoice)]);
  yield all([takeEvery(actionTypes.postReportChoiceInit, postReportChoice)]);
  yield all([takeEvery(actionTypes.deleteReportChoiceInit, deleteReportChoice)]);
}

export const reportsSettingAdminSaga = [fork(reportsSettingAdminSagas)];
