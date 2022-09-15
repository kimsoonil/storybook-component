import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/boardSlice';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();
// const getUrl = (path) => `${process.env.REACT_APP_API_URL}/api/v1/board/${path}`;

// GET
// ​/board​/{board_pk}​/posts
// 리스트 조회

// GET
// ​/board​/{id}
// 객체 조회

// PATCH
// ​/board​/{id}
// 수정

// POST
// ​/board​/{board_pk}​/post
// 생성

// TODO: club list
function* getBoardPosts({ payload }) {
  try {
    // const response = yield call(() => axios.get(getUrl(payload.id), '', config));
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_API_URL}/api/v1/board/${payload.id}/posts`, '', config)
    );
    if (response.status === 200) {
      yield put(actionTypes.getBoardPostsSuccess({ ...response.data }));
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}

function* getIdBoard({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/board/${payload.id}`, '', config)
    );
    if (response.status == 200) {
      yield put(actionTypes.getIdBoardSuccess({ ...response.data }));
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}

function* patchBoard({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/board/${payload.id}`, payload.data, config)
    );
    if (response.status == 200) {
      yield put(actionTypes.patchBoardSuccess({ ...response.data }));
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}

function* postBoardPost({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/board/${payload.id}/post`, payload.data, config)
    );
    if (response.status == 200) {
      yield put(actionTypes.postBoardPostSuccess({ ...response.data }));
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}

function* boardSaga() {
  yield all([
    takeLatest(actionTypes.getBoardPostsInit, getBoardPosts),
    takeLatest(actionTypes.getIdBoardInit, getIdBoard),
    takeLatest(actionTypes.patchBoardInit, patchBoard),
    takeLatest(actionTypes.postBoardPostInit, postBoardPost)
  ]);
}

export const BoardSaga = [fork(boardSaga)];
