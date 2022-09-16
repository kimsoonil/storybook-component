import { all } from 'redux-saga/effects';
import idistSaga from './idistSaga';

export default function* rootSaga() {
  yield all([...idistSaga]);
}
