import { forumListSaga } from './forum/forumListSaga';
import { forumAllSearchListSaga } from './forum/forumAllSearchListSaga';
import { subscribeForumSaga } from './forum/subscribeForumSaga';
import { postRankingListSaga } from './forum/postRankingListSaga';
import { likePostSaga } from './forum/likePostSaga';
import { forumRankingListSaga } from './forum/forumRankingListSaga';
import { latestPostsSaga } from './forum/latestPostsSaga';
import { forumPostSaga } from './forum/fourmPostSaga';
import { forumCreateSaga } from './forum/forumCreateSaga';
import { forumEditSaga } from './forum/forumEditSaga';
import { forumInfoSaga } from './forum/forumInfoSaga';
import { forumBookMarkSaga } from './forum/forumBookMarkSaga';
import { forumBookMarkedListSaga } from './forum/forumBookMarkedListSaga';
import { forumBestSaga } from './forum/forumBestSaga';
import { forumIdPostListSaga } from './forum/forumIdPostListSaga';

const forumSaga = [
  ...forumListSaga,
  ...forumAllSearchListSaga,
  ...subscribeForumSaga,
  ...postRankingListSaga,
  ...likePostSaga,
  ...forumRankingListSaga,
  ...latestPostsSaga,
  ...forumPostSaga,
  ...forumCreateSaga,
  ...forumEditSaga,
  ...forumInfoSaga,
  ...forumBookMarkSaga,
  ...forumBookMarkedListSaga,
  ...forumBestSaga,
  ...forumIdPostListSaga
];
export default forumSaga;
