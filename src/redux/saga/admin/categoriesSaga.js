import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { categoriesInit, categoriesSuccess, categoriesFailure } from 'redux/store/admin/categoriesSlice';

import axios from 'axios';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

function* onLoadCategoriesAsync({ payload }) {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`, config));
    if (response.status === 200) {
      yield put(categoriesSuccess({ ...response?.data }));
    }
  } catch (error) {
    console.log(error.response.data);
    yield put(categoriesFailure(error.response.data));
  }
}

function* onLoadCategories() {
  yield takeLatest(categoriesInit.type, onLoadCategoriesAsync);
}

export const categoriesSaga = [fork(onLoadCategories)];
