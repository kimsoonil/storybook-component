import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { resetMovie, getMovie, getMovieSuccess, getMovieFailure } from 'redux/store/movieSlice';
import { SUCCESS } from 'constants/type';
import { fetchMovie } from '../api';
// import Api from '../api2';

function* onLoadMovieAsync({ payload }) {
  try {
    const movieId = payload;
    const response = yield call(fetchMovie, movieId);
    if (response.status === SUCCESS) {
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

function* onLoadResetMovieAsync() {
  try {
    yield put(resetMovie);
    // const data = Api.getMockMovie();
    // yield put(getMovieSuccess({ ...data }));
  } catch (error) {
    console.log(error);
    yield put(getMovieFailure(error));
  }
}

function* onLoadResetMovie() {
  yield takeLatest(resetMovie.type, onLoadResetMovieAsync);
}

export const movieSaga = [fork(onLoadMovie), fork(onLoadResetMovie)];
