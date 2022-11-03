import { takeLatest, put, fork, call } from 'redux-saga/effects';

import * as actionTypes from 'redux/idistStore/tagSlice';
import axios from 'axios';
import { getToken } from 'utils/Cookies/Cookies';

const config = getToken();

// TODO: club list
function* getTags() {
  try {
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1/tags`, {
        ...config
      })
    );
    if (response.data.message === 'ok') {
      yield put(actionTypes.getTagsSuccess({ ...response.data }));

      console.log(response.data);
    }
  } catch (error) {
    yield put(actionTypes.tagsFailure(error));
    console.log(error);
  }
}

function* tagSaga() {
  yield takeLatest(actionTypes.getTagsInit.type, getTags);
}

export const TagSaga = [fork(tagSaga)];
