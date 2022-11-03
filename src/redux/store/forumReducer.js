import forumListReducer from 'redux/store/forum/forumListSlice';
import forumAllSearchListReducer from 'redux/store/forum/forumAllSearchListSlice';
import subscribeForumReducer from 'redux/store/forum/subscribeForumSlice';
import postRankingListReducer from 'redux/store/forum/postRankingListSlice';
import likePostReducer from 'redux/store/forum/likePostSlice';
import forumRankingListReducer from 'redux/store/forum/forumRankingListSlice';
import forumPostReducer from 'redux/store/forum/fourmPostSlice';
import forumCreateReducer from 'redux/store/forum/forumCreateSlice';
import forumEditReducer from 'redux/store/forum/forumEditSlice';
import forumInfoReducer from 'redux/store/forum/forumInfoSlice';
import forumHistoryReducer from 'redux/store/forum/forumHistorySlice';
import forumBookMarkReducer from 'redux/store/forum/forumBookmarkSlice';
import forumBookMarkedListReducer from 'redux/store/forum/forumBookmarkedSlice';
import forumBestReducer from 'redux/store/forum/forumBestSlice';
import forumIdPostListReducer from 'redux/store/forum/forumIdPostListSlice';

const forumReducer = {
  forumList: forumListReducer,
  forumAllSearchList: forumAllSearchListReducer,
  subscribeForum: subscribeForumReducer,
  postRankingList: postRankingListReducer,
  likePost: likePostReducer,
  forumRankingList: forumRankingListReducer,
  forumPost: forumPostReducer,
  forumCreate: forumCreateReducer,
  forumEdit: forumEditReducer,
  forumInfo: forumInfoReducer,
  forumHistory: forumHistoryReducer,
  forumPin: forumBookMarkReducer,
  forumBookMarkedList: forumBookMarkedListReducer,
  forumBest: forumBestReducer,
  forumIdPostList: forumIdPostListReducer
};
export default forumReducer;
