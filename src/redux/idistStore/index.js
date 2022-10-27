import userReducer from './userSlice';
import clubReducer from './clubSlice';
import postReducer from './postsSlice';
import BoardGroupReducer from './boardGroupSlice';
import BoardReducer from './boardSlice';
import CommentReducer from './commentSlice';
import TagReducer from './tagSlice';
import ProfileReducer from './profileSlice';
import ActivitiesReducer from './activitiesSlice';
import rootAdminReducer from './admin/rootAdminReducer';

const idistReducer = {
  user: userReducer,
  club: clubReducer,
  post: postReducer,
  boardGroup: BoardGroupReducer,
  board: BoardReducer,
  comment: CommentReducer,
  tag: TagReducer,
  profile: ProfileReducer,
  activity: ActivitiesReducer,
  ...rootAdminReducer
};

export default idistReducer;
