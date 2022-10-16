import forumListReducer from 'redux/store/forum/forumListSlice';
import subscribeForumReducer from 'redux/store/forum/subscribeForumSlice';
import postRankingListReducer from 'redux/store/forum/postRankingListSlice';
import likePostReducer from 'redux/store/forum/likePostSlice';
import forumRankingListReducer from 'redux/store/forum/forumRankingListSlice';
import latestPostsReducer from 'redux/store/forum/latestPostsSlice';

const forumReducer = {
  forumList: forumListReducer,
  subscribeForum: subscribeForumReducer,
  postRankingList: postRankingListReducer,
  likePost: likePostReducer,
  forumRankingList: forumRankingListReducer,
  latestPosts: latestPostsReducer
};
export default forumReducer;
