import { all } from 'redux-saga/effects';

import { UserSaga } from './saga/userSaga';
import { ClubSaga } from './saga/clubSaga';
import { PostSaga } from './saga/postsSaga';
import { BoardGroupSaga } from './saga/boardGroupSaga';
import { BoardSaga } from './saga/boardSaga';
import rootAdminSaga from './saga/admin/rootAdminSaga';

export default function* rootSaga() {
  yield all([...UserSaga, ...ClubSaga, ...BoardGroupSaga, ...BoardSaga, ...rootAdminSaga, ...PostSaga]);
}
