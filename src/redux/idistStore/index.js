import PopupReducer from './popupSlice';
import userReducer from './userSlice';
import clubReducer from './clubSlice';
import postReducer from './postsSlice';
import BoardGroupReducer from './boardGroupSlice';
import BoardReducer from './boardSlice';
import AdminReducer from './adminSlice';
import rootAdminReducer from './admin/rootAdminReducer';

const idistReducer = {
  popup: PopupReducer,
  user: userReducer,
  club: clubReducer,
  post: postReducer,
  boardGroup: BoardGroupReducer,
  board: BoardReducer,
  admin: AdminReducer,
  ...rootAdminReducer
};

export default idistReducer;
