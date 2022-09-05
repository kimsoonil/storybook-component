import { all } from 'redux-saga/effects';

import { ClubAdnimSaga } from 'redux/saga/club/clubSaga';
import { UserSaga } from './saga/userSaga';
import { ClubSaga } from './saga/clubSaga';

export default function* rootSaga() {
  yield all([...UserSaga, ...ClubSaga, ...ClubAdnimSaga]);
}
