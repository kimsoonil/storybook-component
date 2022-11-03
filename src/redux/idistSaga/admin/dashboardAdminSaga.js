import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import * as actionTypes from 'redux/idistStore/admin/dashboardAdminSlice';
import idistApi from 'redux/idistApi';

function* getClubDashboard({ payload }) {
  try {
    const response = yield call(idistApi.getAdminClubDashboard, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.getClubDashboardSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.getClubDashboardFailure(error));
    console.log(error);
  }
}

function* dashboardAdminSagas() {
  yield all([takeEvery(actionTypes.getClubDashboardInit, getClubDashboard)]);
}

export const dashboardAdminSaga = [fork(dashboardAdminSagas)];
