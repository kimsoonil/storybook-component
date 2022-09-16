import { UserSaga } from './userSaga';
import { ClubSaga } from './clubSaga';
import { PostSaga } from './postsSaga';
import { BoardGroupSaga } from './boardGroupSaga';
import { BoardSaga } from './boardSaga';
import rootAdminSaga from './admin/rootAdminSaga';

const idistSaga = [...UserSaga, ...ClubSaga, ...BoardGroupSaga, ...BoardSaga, ...rootAdminSaga, ...PostSaga];

export default idistSaga;
