// example for Rest API
// import fetchMovie from '../mock/fetchMovie';
import { result as signUpMock } from '../mock/signUpMock';
import { result as logInMock } from '../mock/logInMock';
import { result as movieMock } from '../mock/movieMock';
import { results as movieListMock } from '../mock/moviesMock';
import { result as checkEamilMock } from '../mock/checkEmailMock';
import { result as authCodeMock } from '../mock/authCodeMock';
import { result as nickNameMock } from '../mock/nickNameMock';
import { result as accountInfoMock } from '../mock/accountInfoMock';
import { result as checkNickNameMock } from '../mock/checkNickNameMock';
import { result as changePasswordMock } from '../mock/changePasswordMock';
import { result as deleteSnsIdMock } from '../mock/deleteSnsIdMock';
import { results as reqForumListMock } from '../mock/forumListMock';
import { result as subscribeForumMock } from '../mock/subscribeForumMock';
import { results as postRankingListMock } from '../mock/postRankingListMock';
import { result as likePostMock } from '../mock/likePostMock';
import { results as forumRankingListMock } from '../mock/forumRankingListMock';
import { results as reqlatestPostsMock } from '../mock/reqlatestPostsMock';
import { results as searchUserMock } from '../mock/searchUserMock';

export default class Api {
  // signup 요청
  static reqLogIn() {
    return logInMock;
  }

  // signup 요청
  static getMockSignUp() {
    return signUpMock;
  }

  // checkEmail 요청
  static reqAuthEmail() {
    return checkEamilMock;
  }

  // checkEmail 요청
  static reqAuthCode() {
    return authCodeMock;
  }

  // nickName 요청
  static editNickName() {
    return nickNameMock;
  }

  // nickName 요청
  static accountInfo() {
    return accountInfoMock;
  }

  // checknickName 요청
  static reqCheckNickName() {
    return checkNickNameMock;
  }

  // checknickName 요청
  static reqChangePassword() {
    return changePasswordMock;
  }

  // snsid 삭제
  static reqDeleteSnsId() {
    return deleteSnsIdMock;
  }

  // get Movie
  static getMockMovie() {
    return movieMock;
  }

  // get Movie list
  static getMockMovies() {
    return movieListMock;
  }

  // get forum list
  static reqForumList() {
    return reqForumListMock;
  }

  static getSubscribeForumMock() {
    return subscribeForumMock;
  }

  static getPostRankingList() {
    return postRankingListMock;
  }

  static setLikePostMock() {
    return likePostMock;
  }

  static forumRankingListMock() {
    return forumRankingListMock;
  }

  static reqlatestPosts() {
    return reqlatestPostsMock;
  }

  static searchUserMock() {
    return searchUserMock;
  }
}
