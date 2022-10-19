import { all } from 'redux-saga/effects';

import { ClubAdnimSaga } from 'redux/saga/club/clubSaga';
import { UserSaga } from './saga/userSaga';
import { ClubSaga } from './saga/clubSaga';
import { PostSaga } from './saga/postsSaga';

export default function* rootSaga() {
  yield all([...UserSaga, ...ClubSaga, ...ClubAdnimSaga, ...PostSaga]);
}
