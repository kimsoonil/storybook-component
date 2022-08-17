import { combineReducers } from 'redux';
import MovieReducer from 'redux/store/movieListSlice';
import SignUpReducer from 'redux/store/signUpSlice';
import MovieInfoReducer from 'redux/store/movieSlice';
import CheckEmailReducer from 'redux/store/checkEmailSlice';
// import history from 'util/history';

const rootReducer = () =>
  combineReducers({
    // router: connectRouter(history),
    movie: MovieReducer,
    movieInfo: MovieInfoReducer,
    signUp: SignUpReducer,
    checkEmail: CheckEmailReducer
  });
export default rootReducer;
