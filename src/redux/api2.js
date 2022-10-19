// example for Rest API
// import fetchMovie from '../mock/fetchMovie';
import { result as signUpMock } from '../mock/signUpMock';
import { result as movieMock } from '../mock/movieMock';
import { results as movieListMock } from '../mock/moviesMock';
import { result as checkEamilMock } from '../mock/checkEmailMock';

export default class Api {
  // signup 요청
  static getMockSignUp() {
    return signUpMock;
  }

  // checkEmail 요청
  static getCheckEmail() {
    return checkEamilMock;
  }

  // get Movie
  static getMockMovie() {
    return movieMock;
  }

  // get Movie list
  static getMockMovies() {
    return movieListMock;
  }
}
