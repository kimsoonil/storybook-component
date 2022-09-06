import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/categoriesSlice';

// TODO: club list
function* getCategories() {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`), '');
    if (response.status === 200) {
      yield put(actionTypes.getClubSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.clubFailure(error));
    console.log(error);
  }
}

function* clubSaga() {
  yield all([takeLatest(actionTypes.getCategoriesInit, getCategories)]);
}

export const ClubSaga = [fork(clubSaga)];
