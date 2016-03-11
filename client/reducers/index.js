import { combineReducers } from 'redux';
import user from './user';
import challenges from './challenges';

const rootReducer = combineReducers({
  user,
  challenges
});

export default rootReducer;
