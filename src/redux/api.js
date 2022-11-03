import axios from 'util/axios.config';

// SignUp
export const fetchReCapcha = (token) => axios.post(`${process.env.REACT_APP_API_URL}/post`, { token });
export const fetchLogIn1 = (userInfo) => axios.post(`${process.env.REACT_APP_API_ACCOUNT_URL}1/login`, userInfo);
export const fetchLogIn2 = (userInfo) => axios.post(`${process.env.REACT_APP_API_PLATFORM_URL}auth/login`, userInfo);
// 삭제 예정
export const fetchAuthSns = (snsType) => window.open(`${process.env.REACT_APP_API_PLATFORM_URL}auth/${snsType}`);
// email 체크
export const fetchAuthEmail = (data) => axios.post(`${process.env.REACT_APP_API_ACCOUNT_URL}1/verify/send`, data);
// auth code 확인
export const fetchAuthCodeCheck = (data) => axios.post(`${process.env.REACT_APP_API_ACCOUNT_URL}1/verify/check`, data);
// 비밀번호변경
export const fetchChangePwd = (data) => axios.post(`${process.env.REACT_APP_API_ACCOUNT_URL}1/verify/password`, data);
// 회원가입
export const fetchSignUp = (data) => axios.post(`${process.env.REACT_APP_API_ACCOUNT_URL}1/register`, data);
// 닉네임 변경
export const fetchChangeNickname = (data) => axios.put(`${process.env.REACT_APP_API_PLATFORM_URL}auth/users/me`, data);

// Forum
export const fetchUploadFile = (data) =>
  axios.post('http://localhost:8080/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const fetchDeleteFile = (filename) => axios.delete(`http://localhost:8080/files/${filename}`);

export const fetchCreateForum = (data) =>
  axios.post(`${process.env.REACT_APP_API_URL}forum`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const fetchEditForum = (data, id) => axios.patch(`${process.env.REACT_APP_API_URL}forum/${id}`, data);

// get
export const fetchForumInfo = (data) => axios.get(`${process.env.REACT_APP_API_URL}forum/${data}`);
export const fetchForumList = (data) => axios.get(`${process.env.REACT_APP_API_URL}forums`, { params: data });
export const fetchBookMarkedForumList = (data) => axios.get(`${process.env.REACT_APP_API_URL}forums`, { params: data });
export const fetchCategoryList = () => axios.get(`${process.env.REACT_APP_API_URL}forums/categories`);
export const fetchForumBest = () => axios.get(`${process.env.REACT_APP_API_URL}forums/best`);
export const fetchForumRankingList = (data) => axios.get(`${process.env.REACT_APP_API_URL}forums`, { params: data });
export const fetchForumPostList = (data) => axios.get(`${process.env.REACT_APP_API_URL}forums/posts`, { params: data });
// 이름 바꿔야..
export const fetchForumPostSave = (data, id) =>
  axios.post(`${process.env.REACT_APP_API_URL}forum/${id}/post`, data.parameters);
export const fetchForumIdPostList = (data) =>
  axios.get(`${process.env.REACT_APP_API_URL}forum/${data.forumId}/posts`, { params: data });

export const fetchForumCommentSave = (data) =>
  axios.post(`${process.env.REACT_APP_API_URL}post/${data.id}/comment`, data?.parameters);

export const fetchForumPin = (data) => axios.post(`${process.env.REACT_APP_API_URL}forum/${data}/pin`);
export const fetchForumUnpin = (data) => axios.post(`${process.env.REACT_APP_API_URL}forum/${data}/unpin`);
