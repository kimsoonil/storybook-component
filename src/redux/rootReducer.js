import { combineReducers } from 'redux';

// import MovieReducer from 'redux/store/movieListSlice';
// import SignUpReducer from 'redux/store/signUpSlice';
// import MovieInfoReducer from 'redux/store/movieSlice';
// import CheckEmailReducer from 'redux/store/checkEmailSlice';
import PopupReducer from 'redux/store/popupSlice';
import userReducer from 'redux/store/userSlice';
import clubReducer from 'redux/store/clubSlice';
import postReducer from 'redux/store/postsSlice';
import BoardGroupReducer from './store/boardGroupSlice';
import BoardReducer from './store/boardSlice';
import AdminReducer from './store/adminSlice';
import rootAdminReducer from './store/admin/rootAdminReducer';
// import history from 'utils/history';

const rootReducer = () =>
  combineReducers({
    // router: connectRouter(history),
    // movie: MovieReducer,
    // movieInfo: MovieInfoReducer,
    // signUp: SignUpReducer,
    // checkEmail: CheckEmailReducer
    popup: PopupReducer,
    user: userReducer,
    club: clubReducer,
    post: postReducer,
    boardGroup: BoardGroupReducer,
    board: BoardReducer,
    admin: AdminReducer,
    ...rootAdminReducer
  });

export default rootReducer;
