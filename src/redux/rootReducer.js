import { combineReducers } from 'redux';

import commonReducer from './store/commonReducer';
import clubReducer from './store/clubReducer';
import boardReducer from './store/boardReducer';
import snsReducer from './store/snsReducer';
import forumReducer from './store/forumReducer';
import idistReducer from './idistStore';

const rootReducer = () =>
  combineReducers(Object.assign(commonReducer, clubReducer, boardReducer, snsReducer, forumReducer, idistReducer));

export default rootReducer;
