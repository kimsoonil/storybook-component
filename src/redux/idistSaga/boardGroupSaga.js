import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/idistStore/boardGroupSlice';
import { getToken } from 'utils/Cookies/Cookies';
import { sagaCallback } from 'utils';

const config = getToken();
// const getUrl = (path) => `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/board-group/${path}`;

function* getBoardGroup({ payload }) {
  try {
    // const response = yield call(() => axios.get(getUrl(payload.id), '', config));
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/board-group/${payload.id}`, config)
    );

    if (response.data.message === 'ok') {
      yield put(actionTypes.getBoardGroupSuccess({ ...response.data }));
      // console.log(response?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* patchBoardGroup({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/admin/board-group/${payload.id}`,
        payload.data,
        config
      )
    );
    if (response.status == 200) {
      yield put(actionTypes.patchBoardGroupSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      // if (payload.actionList) {
      //   yield all(payload.actionList.map((action) => put(action)));
      // }
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* postBoardGroupBoard({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/admin/board-group/${payload.id}/board`,
        payload.data,
        config
      )
    );
    if (response.status == 200 || response.status == 201) {
      yield put(actionTypes.postBoardGroupBoardSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      // if (payload.actionList) {
      //   yield all(payload.actionList.map((action) => put(action)));
      // }
      // console.log('postBoardGroupBoard data : ', response.data.data);
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* patchBoardGroupMerge({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(
        `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/admin/board-group/${payload.id}/merge`,
        payload.data,
        config
      )
    );
    if (response.status == 200) {
      yield put(actionTypes.patchBoardGroupMergeSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      // if (payload.actionList) {
      //   yield all(payload.actionList.map((action) => put(action)));
      // }
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* deleteBoardGroup({ payload }) {
  try {
    const response = yield call(() =>
      axios.delete(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/admin/board-group/${payload.id}`, config)
    );
    if (response.status === 204) {
      yield put(actionTypes.deleteBoardGroupSuccess({ ...response.data }));
      yield call(sagaCallback, payload, response?.data?.data);
      // if (payload.actionList) {
      //   yield all(payload.actionList.map((action) => put(action)));
      // }
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* boardGroupSaga() {
  yield all([
    takeLatest(actionTypes.getBoardGroupInit, getBoardGroup),
    takeLatest(actionTypes.patchBoardGroupInit, patchBoardGroup),
    takeLatest(actionTypes.postBoardGroupBoardInit, postBoardGroupBoard),
    takeLatest(actionTypes.patchBoardGroupMergeInit, patchBoardGroupMerge),
    takeLatest(actionTypes.deleteBoardGroupInit, deleteBoardGroup)
  ]);
}

export const BoardGroupSaga = [fork(boardGroupSaga)];
