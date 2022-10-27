import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { reset, reqForumEdit, forumEditSuccess, forumEditFailure } from 'redux/store/forum/forumEditSlice';
import { SUCCESS } from 'constants/type';
import { fetchEditForum } from '../../api';

function* onLoadForumEditAsync({ payload }) {
  console.log(payload);
  const { navigate, formData } = payload;
  console.log('formData', formData);
  try {
    const response = yield call(fetchEditForum, formData);
    console.log(response);
    if (response.status === SUCCESS) {
      yield put(forumEditSuccess({ ...response }));
      navigate(`/forum/theme/${response.data.data.id}`);
    }
  } catch (error) {
    console.log(error);
    yield put(forumEditFailure(error));
  }
}

function* onLoadForumEdit() {
  yield takeLatest(reqForumEdit.type, onLoadForumEditAsync);
}

function* onLoadEditResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
  }
}

function* onLoadEditReset() {
  yield takeLatest(reset.type, onLoadEditResetAsync);
}

export const forumEditSaga = [fork(onLoadForumEdit), fork(onLoadEditReset)];
