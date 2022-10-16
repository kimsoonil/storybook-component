import { takeLatest, all, put, fork, call, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/idistStore/boardSlice';
import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';

const config = getToken();
// const getUrl = (path) => `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/board/${path}`;

function* getBoardPosts({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/board/${payload.id}/posts`, {
        params: payload.parameters,
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getBoardPostsSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}
function* getMoreBoardPosts({ payload }) {
  try {
    const { currentPage, isEndOfCatalogue } = yield select((state) => state.board);
    if (isEndOfCatalogue) return;
    payload.parameters.page = currentPage + 1;
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/board/${payload.id}/posts`, {
        params: payload.parameters,
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getMoreBoardPostsSuccess({ ...response.data, payload }));
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}
function* getBoard({ payload }) {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/board/${payload.id}`, '', config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getBoardSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
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
      axios.patch(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/admin/board/${payload.id}`,
        payload.parameters,
        config
      )
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.patchBoardSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      // if (payload.actionList) {
      //   yield all(payload.actionList.map((action) => put(action)));
      // }
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
      axios.post(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/club/${payload.id}/post`, payload.parameters, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.postBoardPostSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}

function* patchBoardMerge({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/admin/board/${payload.id}/merge`,
        payload.parameters,
        config
      )
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.postBoardPostSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardFailure(error));
    console.log(error);
  }
}

function* deleteBoard({ payload }) {
  try {
    const response = yield call(() =>
      axios.delete(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/admin/board/${payload.id}`, config)
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.deleteBoardSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
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
    takeLatest(actionTypes.getMoreBoardPostsInit, getMoreBoardPosts),
    takeLatest(actionTypes.getBoardInit, getBoard),
    takeLatest(actionTypes.patchBoardInit, patchBoard),
    takeLatest(actionTypes.postBoardPostInit, postBoardPost),
    takeLatest(actionTypes.patchBoardMergeInit, patchBoardMerge),
    takeLatest(actionTypes.deleteBoardInit, deleteBoard)
  ]);
}

export const BoardSaga = [fork(boardSaga)];
