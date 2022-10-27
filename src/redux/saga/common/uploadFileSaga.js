import { takeLatest, call, put, fork } from 'redux-saga/effects';
import {
  reset,
  reqUploadFile,
  uploadFileSuccess,
  uploadFileFailure,
  reqDeleteFile,
  deleteFileSuccess,
  deleteFileFailure
} from 'redux/store/common/uploadFileSlice';
import { SUCCESS } from 'constants/type';
import { fetchUploadFile, fetchDeleteFile } from '../../api';

function* onLoadUploadFileAsync({ payload }) {
  console.log('upload saga:', payload);
  try {
    const response = yield call(fetchUploadFile, payload);
    if (response.status === SUCCESS) {
      yield put(uploadFileSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(uploadFileFailure(error));
  }
}

function* onLoadUploadFile() {
  yield takeLatest(reqUploadFile.type, onLoadUploadFileAsync);
}

function* onLoadDeleteFileAsync({ payload }) {
  console.log('delete saga:', payload);
  try {
    const response = yield call(fetchDeleteFile, payload);
    if (response.status === SUCCESS) {
      yield put(deleteFileSuccess({ ...response.data }));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteFileFailure(error));
  }
}

function* onLoadDeleteFile() {
  yield takeLatest(reqDeleteFile.type, onLoadDeleteFileAsync);
}

function* onLoadUploadFileResetAsync() {
  try {
    yield put(reset);
  } catch (error) {
    console.log(error);
  }
}

function* onLoadUploadFileReset() {
  yield takeLatest(reset.type, onLoadUploadFileResetAsync);
}

export const uploadFileSaga = [fork(onLoadUploadFileReset), fork(onLoadUploadFile), fork(onLoadDeleteFile)];
