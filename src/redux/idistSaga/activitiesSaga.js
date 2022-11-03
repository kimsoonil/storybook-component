import { takeLatest, put, fork, call } from 'redux-saga/effects';
import * as actionTypes from 'redux/idistStore/activitiesSlice';
import { getToken } from 'utils/Cookies/Cookies';
import axios from 'axios';

const config = getToken();

function* getActivities() {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/activities`, { ...config })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.activitiesSuccess({ ...response?.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(actionTypes.activitiesFailure(error));
  }
}

function* activities() {
  yield takeLatest(actionTypes.getActivitiesInit, getActivities);
}

export const activitiesSaga = [fork(activities)];
