import { UserSaga } from './userSaga';
import { ClubSaga } from './clubSaga';
import { PostSaga } from './postsSaga';
import { BoardGroupSaga } from './boardGroupSaga';
import { BoardSaga } from './boardSaga';
import { CommentSaga } from './commentSaga';
import { TagSaga } from './tagSaga';
import { ProfileSaga } from './profileSaga';
import rootAdminSaga from './admin/rootAdminSaga';

const idistSaga = [
  ...UserSaga,
  ...ClubSaga,
  ...BoardGroupSaga,
  ...BoardSaga,
  ...rootAdminSaga,
  ...PostSaga,
  ...CommentSaga,
  ...ProfileSaga,
  ...TagSaga
];

export default idistSaga;
