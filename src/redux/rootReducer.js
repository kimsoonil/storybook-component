import { combineReducers } from 'redux';
import MovieReducer from 'redux/store/movieListSlice';
import SignUpReducer from 'redux/store/signUpSlice';
import MovieInfoReducer from 'redux/store/movieSlice';
import CheckEmailReducer from 'redux/store/checkEmailSlice';
import userReducer from 'redux/store/userSlice';
import clubReducer from 'redux/store/clubSlice';

const rootReducer = () =>
  combineReducers({
    movie: MovieReducer,
    movieInfo: MovieInfoReducer,
    signUp: SignUpReducer,
    checkEmail: CheckEmailReducer,
    user: userReducer,
    club: clubReducer
  });
export default rootReducer;
