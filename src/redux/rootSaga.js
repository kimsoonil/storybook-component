import { all } from 'redux-saga/effects';
import boardSaga from './saga/boardSaga';
import clubSaga from './saga/clubSaga';
import commonSaga from './saga/commonSaga';
import snsSaga from './saga/snsSaga';
import forumSaga from './saga/forumSaga';
import idistSaga from './idistSaga';

export default function* rootSaga() {
  yield all([...boardSaga, ...clubSaga, ...commonSaga, ...snsSaga, ...forumSaga, ...idistSaga]);
}
