import { all } from 'redux-saga/effects';
import { movieSaga } from './saga/movieSaga';
import { moviesSaga } from './saga/movieListSaga';
import boardSaga from './boardSaga';
import clubSaga from './clubSaga';
import commonSaga from './commonSaga';
import snsSaga from './snsSaga';
// _idist merge
import idistSaga from './idistSaga';

export default function* rootSaga() {
  yield all([...moviesSaga, ...movieSaga, ...boardSaga, ...clubSaga, ...commonSaga, ...snsSaga, ...idistSaga]);
}
