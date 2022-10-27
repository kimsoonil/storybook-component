import forumListReducer from 'redux/store/forum/forumListSlice';
import subscribeForumReducer from 'redux/store/forum/subscribeForumSlice';
import postRankingListReducer from 'redux/store/forum/postRankingListSlice';
import likePostReducer from 'redux/store/forum/likePostSlice';
import forumRankingListReducer from 'redux/store/forum/forumRankingListSlice';
import forumPostReducer from 'redux/store/forum/fourmPostSlice';
import latestPostsReducer from 'redux/store/forum/fourmPostSlice';
import forumCreateReducer from 'redux/store/forum/forumCreateSlice';
import forumEditReducer from 'redux/store/forum/forumEditSlice';
import forumInfoReducer from 'redux/store/forum/forumInfoSlice';
import forumHistoryReducer from 'redux/store/forum/forumHistorySlice';
import forumBookMarkedListReducer from 'redux/store/forum/forumBookmarkedSlice';
import forumBestReducer from 'redux/store/forum/forumBestSlice';

const forumReducer = {
  forumList: forumListReducer,
  subscribeForum: subscribeForumReducer,
  postRankingList: postRankingListReducer,
  likePost: likePostReducer,
  forumRankingList: forumRankingListReducer,
  forumPost: forumPostReducer,
  latestPosts: latestPostsReducer,
  forumCreate: forumCreateReducer,
  forumEdit: forumEditReducer,
  forumInfo: forumInfoReducer,
  forumHistory: forumHistoryReducer,
  forumBookMarkedList: forumBookMarkedListReducer,
  forumBest: forumBestReducer
};
export default forumReducer;
