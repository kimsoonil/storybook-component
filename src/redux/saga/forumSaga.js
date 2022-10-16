import { forumListSaga } from './forum/forumListSaga';
import { subscribeForumSaga } from './forum/subscribeForumSaga';
import { postRankingListSaga } from './forum/postRankingListSaga';
import { likePostSaga } from './forum/likePostSaga';
import { forumRankingListSaga } from './forum/forumRankingListSaga';
import { latestPostsSaga } from './forum/latestPostsSaga';

const forumSaga = [
  ...forumListSaga,
  ...subscribeForumSaga,
  ...postRankingListSaga,
  ...likePostSaga,
  ...forumRankingListSaga,
  ...latestPostsSaga
];
export default forumSaga;
