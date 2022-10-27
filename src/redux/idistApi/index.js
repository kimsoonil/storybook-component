import axios from 'axios';
import { getToken } from 'utils/Cookies/Cookies';

const tokenConfig = getToken();
const endUrl = `${process.env.REACT_APP_SUPER_CLUB_URL}/api/v1`;

const _axios = axios.create({
  baseURL: endUrl,
  headers: {
    ...tokenConfig?.headers,
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
});

_axios.interceptors.request.use(
  (config) => {
    // console.log(config.url);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// user - guest
const getUserMe = (props) => _axios.get(`/user/me`, { params: props?.params });

// category - guest
const getCategories = (props) => _axios.get(`/clubs/categories`, { params: props?.params });

// club - admin
const getAdminClubDashboard = (props) => _axios.get(`/admin/club/${props.id}/dashboard`, { params: props?.params });

const patchAdminClub = (props) => _axios.patch(`/admin/club/${props.id}`, props?.data);
const patchAdminClubBannerImage = (props) => _axios.patch(`/admin/club/${props.id}/banner-image`, props?.data);
const patchAdminClubProfileImage = (props) => _axios.patch(`/admin/club/${props.id}/profile-image`, props?.data);
const patchAdminClubTags = (props) => _axios.patch(`/admin/club/${props.id}/tags`, props?.data);

const postAdminClub = (props) => _axios.post(`/admin/club`, props?.data);
const postAdminClubBoardGroup = (props) => _axios.post(`/admin/club/${props.id}/board-group`, props?.data);
const postAdminClubAddressCheck = (props) =>
  _axios.post(`/admin${props.id ? `/club/${props.id}` : `/clubs`}/address/check`, props?.data);
const postAdminClubNameCheck = (props) =>
  _axios.post(`/admin${props.id ? `/club/${props.id}` : `/clubs`}/title/check`, props?.data);

// club - guest
const getClubBoardGroups = (props) => _axios.get(`/club/${props.id}/board-groups`, { params: props?.params });
const getClubPosts = (props) => _axios.get(`/club/${props.id}/posts`, { params: props?.params });
const getClub = (props) => _axios.get(`/club/${props.id}`, { params: props?.params });
const getClubs = (props) => _axios.get(`/clubs`, { params: props?.params });

const postClubJoin = (props) => _axios.post(`/club/${props.id}/join`, props?.data);
const postClubLeave = (props) => _axios.post(`/club/${props.id}/leave`, props?.data);
const postClubPin = (props) => _axios.post(`/club/${props.id}/pin`, props?.data);
const postClubShare = (props) => _axios.post(`/club/${props.id}/share`, props?.data);
const postClubUnpin = (props) => _axios.post(`/club/${props.id}/unpin`, props?.data);

// club - member
const deleteClubPostsTemporary = (props) =>
  _axios.delete(`/club/${props.id}/posts/temporary`, { params: props?.params });

const getClubProfiles = (props) => _axios.get(`/club/${props.id}/profiles`, { params: props?.params });

const postClubPost = (props) => _axios.post(`/club/${props.id}/post`, props?.data);

// boardGroup - admin
const deleteAdminBoardGroup = (props) => _axios.delete(`/admin/board-group/${props.id}`, { params: props?.params });

const patchAdminBoardGroup = (props) => _axios.patch(`/admin/board-group/${props.id}`, props?.data);
const patchAdminBoardGroupMerge = (props) => _axios.patch(`/admin/board-group/${props.id}/merge`, props?.data);
const patchAdminBoardGroupOrder = (props) => _axios.patch(`/admin/board-group/${props.id}/order`, props?.data);

const postAdminBoardGroupBoard = (props) => _axios.post(`/admin/board-group/${props.id}/board`, props?.data);

//boardGroup - guest
const getBoardGroup = (props) => _axios.get(`/board-group/${props.id}`, { params: props?.params });

// board - admin
const deleteAdminBoard = (props) => _axios.delete(`/admin/board/${props.id}`, { params: props?.params });

const patchAdminBoard = (props) => _axios.patch(`/admin/board/${props.id}`, props?.data);
const patchAdminBoardMerge = (props) => _axios.patch(`/admin/board/${props.id}/merge`, props?.data);
const patchAdminBoardOrder = (props) => _axios.patch(`/admin/board/${props.id}/order`, props?.data);

// board - guest
const getBoardPosts = (props) => _axios.get(`/board/${props.id}/posts`, { params: props?.params });
const getBoard = (props) => _axios.get(`/board/${props.id}`, { params: props?.params });

// post - admin
/**
 *
 * @param {number} props.params.board 게시판에 속한
 * @param {*} props.params.is_active 활성화 여부
 * @param {*} props.params.ordering report_count, report_date, created
 * @returns
 */
const getAdminPosts = (props) => _axios.get(`/admin/posts`, { params: props?.params });

const postAdminPostActivate = (props) => _axios.post(`/admin/post/${props.id}/activate`, props?.data);
const postAdminPostDeactivate = (props) => _axios.post(`/admin/post/${props.id}/deactivate`, props?.data);
const postAdminPostsActivate = (props) => _axios.post(`/admin/posts/activate`, props?.data);
const postAdminPostsDeactivate = (props) => _axios.post(`/admin/posts/deactivate`, props?.data);

// post - guest
const getPost = (props) => _axios.get(`/post/${props.id}`, { params: props?.params });
const getPostComments = (props) => _axios.get(`/post/${props.id}/comments`, { params: props?.params });
const getPosts = (props) => _axios.get(`/posts`, { params: props?.params });

const postPostPin = (props) => _axios.post(`/post/${props.id}/pin`, props?.data);
const postPostShare = (props) => _axios.post(`/post/${props.id}/share`, props?.data);
const postPostUnpin = (props) => _axios.post(`/post/${props.id}/unpin`, props?.data);

// post - member
const deletePostTemporary = (props) => _axios.delete(`/post/${props.id}/temporary`, { params: props?.params });

const getPostLikes = (props) => _axios.get(`/post/${props.id}/likes`, { params: props?.params });

const patchPostTags = (props) => _axios.patch(`/post/${props.id}/tags`, props?.data);

const postPostComment = (props) => _axios.post(`/post/${props.id}/comment`, props?.data);
const postPostDislike = (props) => _axios.post(`/post/${props.id}/dislike`, props?.data);
const postPostLike = (props) => _axios.post(`/post/${props.id}/like`, props?.data);
const postPostUndislike = (props) => _axios.post(`/post/${props.id}/undislike`, props?.data);
const postPostUnlike = (props) => _axios.post(`/post/${props.id}/unlike`, props?.data);

// profile - member
const getProfile = (props) => _axios.get(`/profile/${props.id}`, { params: props?.params });

// comment - admin
const patchAdminComment = (props) => _axios.patch(`/admin/comment/${props.id}`, props?.data);

// comment - member
const postCommentDislike = (props) => _axios.post(`/comment/${props.id}/dislike`, props?.data);
const postCommentLike = (props) => _axios.post(`/comment/${props.id}/like`, props?.data);
const postCommentReport = (props) => _axios.post(`/comment/${props.id}/report`, props?.data);
const postCommentUndislike = (props) => _axios.post(`/comment/${props.id}/undislike`, props?.data);
const postCommentUnlike = (props) => _axios.post(`/comment/${props.id}/unlike`, props?.data);

const getAdminClubComments = (props) => _axios.get(`/admin/club/${props.id}/comments`, { params: props?.params });
const getAdminClubPosts = (props) => _axios.get(`/admin/club/${props.id}/posts`, { params: props?.params });

const postAdminClubReportChoice = (props) => _axios.post(`/admin/club/${props.id}/report-choice`, props?.data);
const postAdminCommentActivate = (props) => _axios.post(`/admin/comment/${props.id}/activate`, props?.data);
const postAdminCommentDeactivate = (props) => _axios.post(`/admin/comment/${props.id}/deactivate`, props?.data);
const postAdminCommentsActivate = (props) => _axios.post(`/admin/comments/activate`, props?.data);
const postAdminCommentsDeactivate = (props) => _axios.post(`/admin/comments/deactivate`, props?.data);
const postAdminProfileActivate = (props) => _axios.post(`/admin/profile/${props.id}/activate`, props?.data);
const postAdminProfileDeactivate = (props) => _axios.post(`/admin/profile/${props.id}/deactivate`, props?.data);
const patchAdminReportChoice = (props) => _axios.patch(`/admin/report-choice/${props.id}`, props?.data);
const deleteAdminReportChoice = (props) => _axios.delete(`/admin/report-choice/${props.id}`, { params: props?.params });
const postBoardSubscribe = (props) => _axios.post(`/board/${props.id}/subscribe`, props?.data);
const postBoardUnsubscribe = (props) => _axios.post(`/board/${props.id}/unsubscribe`, props?.data);
const getClubReportChoices = (props) => _axios.get(`/club/${props.id}/report-choices`, { params: props?.params });
const postClubSubscribe = (props) => _axios.post(`/club/${props.id}/subscribe`, props?.data);
const postClubUnsubscribe = (props) => _axios.post(`/club/${props.id}/unsubscribe`, props?.data);
const getClubsRecommend = (props) => _axios.get(`/clubs/recommend`, { params: props?.params });
const patchComment = (props) => _axios.patch(`/comment/${props.id}`, props?.data);
const deleteComment = (props) => _axios.delete(`/comment/${props.id}`, { params: props?.params });
const postMediaFile = (props) => _axios.post(`/media/file`, props?.data);
const getMediaFile = (props) => _axios.get(`/media/file/${props.id}`, { params: props?.params });
const postMediaGif = (props) => _axios.post(`/media/gif`, props?.data);
const getMediaGif = (props) => _axios.get(`/media/gif/${props.id}`, { params: props?.params });
const postMediaImage = (props) => _axios.post(`/media/image`, props?.data);
const getMediaImage = (props) => _axios.get(`/media/image/${props.id}`, { params: props?.params });
const postMediaVideo = (props) => _axios.post(`/media/video`, props?.data);
const getMediaVideo = (props) => _axios.get(`/media/video/${props.id}`, { params: props?.params });
const patchPost = (props) => _axios.patch(`/post/${props.id}`, props?.data);
const deletePost = (props) => _axios.delete(`/post/${props.id}`, { params: props?.params });
const patchPostBannerImage = (props) => _axios.patch(`/post/${props.id}/banner-image`, props?.data);
const postProfileSubscribe = (props) => _axios.post(`/profile/${props.id}/subscribe`, props?.data);
const postProfileUnsubscribe = (props) => _axios.post(`/profile/${props.id}/unsubscribe`, props?.data);
const getTags = (props) => _axios.get(`/tags`, { params: props?.params });

export default {
  // user - guest
  getUserMe,

  // category - guest
  getCategories,

  // club - admin
  getAdminClubDashboard,
  patchAdminClub,
  patchAdminClubBannerImage,
  patchAdminClubProfileImage,
  patchAdminClubTags,
  postAdminClub,
  postAdminClubBoardGroup,
  postAdminClubAddressCheck,
  postAdminClubNameCheck,

  // club - guest
  getClubBoardGroups,
  getClubPosts,
  getClub,
  getClubs,
  postClubJoin,
  postClubLeave,
  postClubPin,
  postClubShare,
  postClubUnpin,

  // club - member
  deleteClubPostsTemporary,
  getClubProfiles,
  postClubPost,

  // boardGroup - admin
  deleteAdminBoardGroup,
  patchAdminBoardGroup,
  patchAdminBoardGroupMerge,
  patchAdminBoardGroupOrder,
  postAdminBoardGroupBoard,

  // boardGroup - guest
  getBoardGroup,

  // board - admin
  deleteAdminBoard,
  patchAdminBoard,
  patchAdminBoardMerge,
  patchAdminBoardOrder,

  // board - guest
  getBoardPosts,
  getBoard,

  // post - admin
  getAdminPosts,
  postAdminPostActivate,
  postAdminPostDeactivate,
  postAdminPostsActivate,
  postAdminPostsDeactivate,

  // post - guest
  getPost,
  getPostComments,
  getPosts,
  postPostPin,
  postPostShare,
  postPostUnpin,

  // post - member
  deletePostTemporary,
  getPostLikes,
  patchPostTags,
  postPostComment,
  postPostDislike,
  postPostLike,
  postPostUndislike,
  postPostUnlike,

  // profile - member
  getProfile,

  // comment - admin
  patchAdminComment,

  // comment - member
  postCommentDislike,
  postCommentLike,
  postCommentReport,
  postCommentUndislike,
  postCommentUnlike,
  getAdminClubComments,
  getAdminClubPosts,
  postAdminClubReportChoice,
  postAdminCommentActivate,
  postAdminCommentDeactivate,
  postAdminCommentsActivate,
  postAdminCommentsDeactivate,
  postAdminProfileActivate,
  postAdminProfileDeactivate,
  patchAdminReportChoice,
  deleteAdminReportChoice,
  postBoardSubscribe,
  postBoardUnsubscribe,
  getClubReportChoices,
  postClubSubscribe,
  postClubUnsubscribe,
  getClubsRecommend,
  patchComment,
  deleteComment,
  postMediaFile,
  getMediaFile,
  postMediaGif,
  getMediaGif,
  postMediaImage,
  getMediaImage,
  postMediaVideo,
  getMediaVideo,
  patchPost,
  deletePost,
  patchPostBannerImage,
  postProfileSubscribe,
  postProfileUnsubscribe,
  getTags
};
