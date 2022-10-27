import { takeEvery, all, put, fork, call } from 'redux-saga/effects';
import * as actionTypes from 'redux/idistStore/admin/boardAdminSlice';
import idistApi from 'redux/idistApi';
import { boardGroupModel, boardModel } from 'redux/idistApi/model';

function* getBoardGroups({ payload }) {
  try {
    const response = yield call(idistApi.getClubBoardGroups, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(
        actionTypes.getBoardGroupsSuccess(
          response.data?.data.map((boardGroup) => boardGroupModel({ ...boardGroup, clubId: payload.id }))
        )
      );
    }
  } catch (error) {
    yield put(actionTypes.getBoardGroupsFailure(error));
    console.log(error);
  }
}

function* getBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.getBoardGroup, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.getBoardGroupSuccess(boardGroupModel(response.data?.data)));
    }
  } catch (error) {
    yield put(actionTypes.getBoardGroupFailure(error));
    console.log(error);
  }
}

function* postBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.postAdminClubBoardGroup, payload);
    if (response.status === 201 || response.data.message === 'ok') {
      yield put(actionTypes.postBoardGroupSuccess(boardGroupModel({ ...response.data?.data, clubId: payload.id })));
    }
  } catch (error) {
    yield put(actionTypes.postBoardGroupFailure(error));
    console.log(error);
  }
}

function* patchBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoardGroup, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.patchBoardGroupSuccess(boardGroupModel({ ...response.data?.data, id: payload.id })));
    }
  } catch (error) {
    yield put(actionTypes.patchBoardGroupFailure(error));
    console.log(error);
  }
}

function* renameBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoardGroup, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.renameBoardGroupSuccess(boardGroupModel({ ...response.data?.data, id: payload.id })));
    }
  } catch (error) {
    yield put(actionTypes.renameBoardGroupFailure(error));
    console.log(error);
  }
}

function* switchActivateBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoardGroup, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(
        actionTypes.switchActivateBoardGroupSuccess(boardGroupModel({ ...response.data?.data, id: payload.id }))
      );
    }
  } catch (error) {
    yield put(actionTypes.switchActivateBoardGroupFailure(error));
    console.log(error);
  }
}

function* mergeBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoardGroupMerge, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.mergeBoardGroupSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.mergeBoardGroupFailure(error));
    console.log(error);
  }
}

function* orderBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoardGroupOrder, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.orderBoardGroupSuccess(response.data?.data));
      yield put(actionTypes.getBoardGroupsInit({ id: payload.clubId }));
    }
  } catch (error) {
    yield put(actionTypes.orderBoardGroupFailure(error));
    console.log(error);
  }
}

function* deleteBoardGroup({ payload }) {
  try {
    const response = yield call(idistApi.deleteAdminBoardGroup, payload);
    if (response.status === 204 || response.data.message === 'ok') {
      yield put(actionTypes.deleteBoardGroupSuccess(payload));
    }
  } catch (error) {
    yield put(actionTypes.deleteBoardGroupFailure(error));
    console.log(error);
  }
}

function* getBoard({ payload }) {
  try {
    const response = yield call(idistApi.getBoard, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.getBoardSuccess(boardModel(response.data?.data)));
    }
  } catch (error) {
    yield put(actionTypes.getBoardFailure(error));
    console.log(error);
  }
}

function* postBoard({ payload }) {
  try {
    const response = yield call(idistApi.postAdminBoardGroupBoard, payload);
    if (response.status === 201 || response.data.message === 'ok') {
      yield put(actionTypes.postBoardSuccess(boardModel({ ...response.data?.data, boardGroupId: payload.id })));
    }
  } catch (error) {
    yield put(actionTypes.postBoardFailure(error));
    console.log(error);
  }
}

function* patchBoard({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoard, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.patchBoardSuccess(boardModel({ ...response.data?.data, id: payload.id })));
    }
  } catch (error) {
    yield put(actionTypes.patchBoardFailure(error));
    console.log(error);
  }
}

function* renameBoard({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoard, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.renameBoardSuccess(boardModel({ ...response.data?.data, id: payload.id })));
    }
  } catch (error) {
    yield put(actionTypes.renameBoardFailure(error));
    console.log(error);
  }
}

function* switchActivateBoard({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoard, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.switchActivateBoardSuccess(boardModel({ ...response.data?.data, id: payload.id })));
    }
  } catch (error) {
    yield put(actionTypes.switchActivateBoardFailure(error));
    console.log(error);
  }
}

function* mergeBoard({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoardMerge, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.mergeBoardSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.mergeBoardFailure(error));
    console.log(error);
  }
}

function* orderBoard({ payload }) {
  try {
    const response = yield call(idistApi.patchAdminBoardOrder, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.orderBoardSuccess(response.data?.data));
      yield put(actionTypes.getBoardGroupsInit({ id: payload.clubId }));
    }
  } catch (error) {
    yield put(actionTypes.orderBoardFailure(error));
    console.log(error);
  }
}

function* deleteBoard({ payload }) {
  try {
    const response = yield call(idistApi.deleteAdminBoard, payload);
    if (response.status === 204 || response.data.message === 'ok') {
      yield put(actionTypes.deleteBoardSuccess(payload));
    }
  } catch (error) {
    yield put(actionTypes.deleteBoardFailure(error));
    console.log(error);
  }
}

function* getBoardPosts({ payload }) {
  try {
    const response = yield call(idistApi.getBoardPosts, payload);
    if (response.status === 200 || response.data.message === 'ok') {
      yield put(actionTypes.getBoardPostsSuccess(response.data?.data));
    }
  } catch (error) {
    yield put(actionTypes.getBoardPostsFailure(error));
    console.log(error);
  }
}

function* _boardAdminSaga() {
  yield all([takeEvery(actionTypes.getBoardGroupsInit, getBoardGroups)]);

  yield all([takeEvery(actionTypes.getBoardGroupInit, getBoardGroup)]);
  yield all([takeEvery(actionTypes.postBoardGroupInit, postBoardGroup)]);
  yield all([takeEvery(actionTypes.patchBoardGroupInit, patchBoardGroup)]);
  yield all([takeEvery(actionTypes.renameBoardGroupInit, renameBoardGroup)]);
  yield all([takeEvery(actionTypes.switchActivateBoardGroupInit, switchActivateBoardGroup)]);
  yield all([takeEvery(actionTypes.mergeBoardGroupInit, mergeBoardGroup)]);
  yield all([takeEvery(actionTypes.orderBoardGroupInit, orderBoardGroup)]);
  yield all([takeEvery(actionTypes.deleteBoardGroupInit, deleteBoardGroup)]);

  yield all([takeEvery(actionTypes.getBoardInit, getBoard)]);
  yield all([takeEvery(actionTypes.postBoardInit, postBoard)]);
  yield all([takeEvery(actionTypes.patchBoardInit, patchBoard)]);
  yield all([takeEvery(actionTypes.renameBoardInit, renameBoard)]);
  yield all([takeEvery(actionTypes.switchActivateBoardInit, switchActivateBoard)]);
  yield all([takeEvery(actionTypes.mergeBoardInit, mergeBoard)]);
  yield all([takeEvery(actionTypes.orderBoardInit, orderBoard)]);
  yield all([takeEvery(actionTypes.deleteBoardInit, deleteBoard)]);

  yield all([takeEvery(actionTypes.getBoardPostsInit, getBoardPosts)]);
}

export const boardAdminSaga = [fork(_boardAdminSaga)];
