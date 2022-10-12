import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { getMovieList, getMovieListSuccess, getMovieListFailure } from 'redux/store/movieListSlice';
import { fetchMovies } from '../api';
// import Api from '../api2';
// import {SUCCESS} from 'constants/type';

function* onLoadMoviesAsync({ payload }) {
  try {
    const movieName = payload;
    const response = yield call(fetchMovies, movieName);
    if (response.data.message === 'ok') {
      yield put(getMovieListSuccess({ ...response.data }));
    }
    // const data = Api.getMockMovies();
    // yield put(setMovies({...data}))
  } catch (error) {
    yield put(getMovieListFailure(error));
    console.log(error);
  }
}

function* onLoadMovies() {
  yield takeLatest(getMovieList.type, onLoadMoviesAsync);
}

export const moviesSaga = [fork(onLoadMovies)];
