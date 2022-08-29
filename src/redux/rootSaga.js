import { all } from 'redux-saga/effects';
import { signUpSaga } from './saga/signUpSaga';
import { userSaga } from './saga/userSaga';
import { movieSaga } from './saga/movieSaga';
import { moviesSaga } from './saga/movieListSaga';
import { checkEmailSaga } from './saga/checkEmailSaga';
import { ClubSaga } from './saga/clubSaga';

export default function* rootSaga() {
  yield all([...moviesSaga, ...userSaga, ...movieSaga, ...signUpSaga, ...checkEmailSaga, ...ClubSaga]);
}
