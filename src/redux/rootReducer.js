import { combineReducers } from 'redux';

import MovieReducer from 'redux/store/movieListSlice';
import MovieInfoReducer from 'redux/store/movieSlice';
import LogInReducer from 'redux/store/logInSlice';
import commonReducer from './commonReducer';
import clubReducer from './clubReducer';
import boardReducer from './boardReducer';
import snsReducer from './snsReducer';
// _idist merge
import idistReducer from './idistStore';

const rootReducer = () =>
  combineReducers(
    Object.assign(commonReducer, clubReducer, boardReducer, snsReducer, idistReducer, {
      movie: MovieReducer,
      movieInfo: MovieInfoReducer,
      logIn: LogInReducer
    })
  );

export default rootReducer;
