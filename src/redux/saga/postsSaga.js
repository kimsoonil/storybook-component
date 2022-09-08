import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/postsSlice';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

// TODO: club posts
function* getPosts({ payload }) {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts`), '');
    if (response.status === 200) {
      yield put(actionTypes.getPostsSuccess({ ...response.data }));
      console.log(response);
    }
  } catch (error) {
    yield put(actionTypes.postFailure(error));
    console.log(error);
  }
}

function* postSaga() {
  yield all([takeEvery(actionTypes.getPostsInit, getPosts)]);
}

export const PostSaga = [fork(postSaga)];
