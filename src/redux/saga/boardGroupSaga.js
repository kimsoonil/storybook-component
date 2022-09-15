import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from 'redux/store/boardGroupSlice';
import * as clubActionTypes from 'redux/store/clubSlice';
import * as adminTypes from 'redux/store/adminSlice';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();
// const getUrl = (path) => `${process.env.REACT_APP_API_URL}/api/v1/board-group/${path}`;

function* getIdBoardGroup({ payload }) {
  try {
    // const response = yield call(() => axios.get(getUrl(payload.id), '', config));
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_API_URL}/api/v1/board-group/${payload.id}`, config)
    );
    // const response = yield call(() => test());
    if (response.status === 200) {
      yield put(actionTypes.getIdBoardGroupSuccess({ ...response.data }));
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* patchBoardGroup({ payload }) {
  try {
    const response = yield call(() =>
      axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/board-group/${payload.id}`, payload.data, config)
    );
    if (response.status == 200) {
      yield put(actionTypes.patchBoardGroupSuccess({ ...response.data }));
      console.log(response?.data?.data);
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* postBoardGroupBoard({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/board-group/${payload.id}/board`, payload.data, config)
    );
    if (response.status == 200 || response.status == 201) {
      yield put(actionTypes.postBoardGroupBoardSuccess({ ...response.data }));
      yield put(clubActionTypes.getClubBoardGroupsInit({ id: payload.clubId }));
      yield put(
        adminTypes.setAdminBoards((prev) => ({ ...prev, selected: { id: response?.data?.data?.id, type: 1 } }))
      );
      console.log('postBoardGroupBoard data : ', response.data.data);
    }
  } catch (error) {
    yield put(actionTypes.boardGroupFailure(error));
    console.log(error);
  }
}

function* boardGroupSaga() {
  yield all([
    takeLatest(actionTypes.getIdBoardGroupInit, getIdBoardGroup),
    takeLatest(actionTypes.patchBoardGroupInit, patchBoardGroup),
    takeLatest(actionTypes.postBoardGroupBoardInit, postBoardGroupBoard)
  ]);
}

export const BoardGroupSaga = [fork(boardGroupSaga)];
