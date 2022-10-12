import { takeLeading, put, fork } from 'redux-saga/effects';
import { showPopup, hidePopup } from 'redux/store/popupSlice';

function* onLoadPopupShowAsync({ payload }) {
  try {
    console.log(payload);
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

export const popupSaga = [fork(onLoadPopupShow), fork(onLoadPopupHide)];
