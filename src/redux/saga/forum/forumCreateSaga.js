import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { reset, reqForumCreate, forumCreateSuccess, forumCreateFailure } from 'redux/store/forum/forumCreateSlice';
import { CREATED } from 'constants/type';
import { fetchCreateForum } from '../../api';

function* onLoadCreateForumAsync({ payload }) {
  const { navigate, formData } = payload;
  console.log(payload);
  try {
    const response = yield call(fetchCreateForum, formData);
    if (response.status === CREATED) {
      yield put(forumCreateSuccess({ ...response.data }));
      console.log('create after::::', response.data);
      navigate(`/forum/theme/${response.data.data.id}`);
    }
  } catch (error) {
    console.log(error);
    yield put(forumCreateFailure(error));
  }
}

function* onLoadCreateForum() {
  yield takeLatest(reqForumCreate.type, onLoadCreateForumAsync);
}

function* onLoadCreateForumResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
  }
}

function* onLoadCreateForumReset() {
  yield takeLatest(reset.type, onLoadCreateForumResetAsync);
}

export const forumCreateSaga = [fork(onLoadCreateForum), fork(onLoadCreateForumReset)];
