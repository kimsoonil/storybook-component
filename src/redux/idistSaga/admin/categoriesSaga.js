import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { categoriesInit, categoriesSuccess, categoriesFailure } from 'redux/idistStore/admin/categoriesSlice';

import idistApi from 'redux/idistApi';

function* onLoadCategoriesAsync({ payload }) {
  try {
    const response = yield call(idistApi.getClubsCategories, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(categoriesSuccess({ ...response?.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(categoriesFailure(error));
  }
}

function* onLoadCategories() {
  yield takeLatest(categoriesInit.type, onLoadCategoriesAsync);
}

export const categoriesSaga = [fork(onLoadCategories)];
