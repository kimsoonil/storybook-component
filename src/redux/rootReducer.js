import { combineReducers } from 'redux';

import idistReducer from './idistStore';

const rootReducer = () => combineReducers(idistReducer);

export default rootReducer;
