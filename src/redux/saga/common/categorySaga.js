import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { reqCategoryList, categoryListSuccess, categoryListFailure } from 'redux/store/common/categoryListSlice';
import { SUCCESS } from 'constants/type';
import { fetchCategoryList } from 'redux/api';

function* onLoadcategoryListAsync() {
  try {
    const response = yield call(fetchCategoryList);
    if (response.status === SUCCESS) {
      yield put(categoryListSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(categoryListFailure(error));
  }
}

function* onLoadcategoryList() {
  yield takeLatest(reqCategoryList.type, onLoadcategoryListAsync);
}

export const categorySaga = [fork(onLoadcategoryList)];
