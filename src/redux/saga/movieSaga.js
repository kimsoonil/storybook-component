import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { getMovie, getMovieSuccess, getMovieFailure } from 'redux/store/movieSlice';
import { fetchMovie } from '../api';
// import Api from '../api2';
// import {SUCCESS} from '../constants/type';

function* onLoadMovieAsync({ payload }) {
  try {
    const movieId = payload;
    const response = yield call(fetchMovie, movieId);
    if (response.status === 200) {
      yield put(getMovieSuccess({ ...response.data }));
    }
    // const data = Api.getMockMovie();
    // yield put(getMovieSuccess({ ...data }));
  } catch (error) {
    console.log(error);
    yield put(getMovieFailure(error));
  }
}

function* onLoadMovie() {
  yield takeLatest(getMovie.type, onLoadMovieAsync);
}

export const movieSaga = [fork(onLoadMovie)];
