import { takeLeading, put, fork } from 'redux-saga/effects';
import { showPopup, hidePopup, setUrl, isConfirmPopup2 } from 'redux/store/common/popupSlice';

function* onLoadPopupShowAsync({ payload }) {
  try {
    console.log('popup saga', payload);
    yield put(showPopup(payload));
  } catch (error) {
    console.log(error);
  }
}

function* onLoadPopupShow() {
  yield takeLeading(showPopup.type, onLoadPopupShowAsync);
}

function* onLoadPopupHideAsync() {
  try {
    yield put(hidePopup);
  } catch (error) {
    console.log(error);
  }
}

function* onLoadPopupHide() {
  yield takeLeading(hidePopup.type, onLoadPopupHideAsync);
}

function* onLoadPopupSetUrlAsync({ payload }) {
  try {
    yield put(setUrl(payload));
  } catch (error) {
    console.log(error);
  }
}

function* onLoadPopupSetUrl() {
  yield takeLeading(setUrl.type, onLoadPopupSetUrlAsync);
}

function* onLoadPopupConfirmAsync() {
  try {
    yield put(isConfirmPopup2());
  } catch (error) {
    console.log(error);
  }
}

function* onLoadPopupConfirm() {
  yield takeLeading(isConfirmPopup2.type, onLoadPopupConfirmAsync);
}

export const popupSaga = [
  fork(onLoadPopupShow),
  fork(onLoadPopupHide),
  fork(onLoadPopupSetUrl),
  fork(onLoadPopupConfirm)
];
