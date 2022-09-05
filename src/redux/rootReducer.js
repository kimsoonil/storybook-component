import { combineReducers } from 'redux';

// import MovieReducer from 'redux/store/movieListSlice';
// import SignUpReducer from 'redux/store/signUpSlice';
// import MovieInfoReducer from 'redux/store/movieSlice';
// import CheckEmailReducer from 'redux/store/checkEmailSlice';
import ClubAdnimReducer from 'redux/store/club/clubSlice';
import PopupReducer from 'redux/store/popupSlice';
import userReducer from 'redux/store/userSlice';
import clubReducer from 'redux/store/clubSlice';
import ClubEditingReducer from './store/club/clubEditingSlice';
// import history from 'utils/history';

const rootReducer = () =>
  combineReducers({
    // router: connectRouter(history),
    // movie: MovieReducer,
    // movieInfo: MovieInfoReducer,
    // signUp: SignUpReducer,
    // checkEmail: CheckEmailReducer
    clubAdnim: ClubAdnimReducer,
    clubEditing: ClubEditingReducer,
    popup: PopupReducer,
    user: userReducer,
    club: clubReducer
  });

export default rootReducer;
