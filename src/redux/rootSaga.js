import { all } from 'redux-saga/effects';
import { signUpSaga } from './saga/signUpSaga';
import { movieSaga } from './saga/movieSaga';
import { moviesSaga } from './saga/movieListSaga';
import { checkEmailSaga } from './saga/checkEmailSaga';
import { testSaga } from './saga/testSaga';

export default function* rootSaga() {
  yield all([...moviesSaga, ...movieSaga, ...signUpSaga, ...checkEmailSaga, ...testSaga]);
}
