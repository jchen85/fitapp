import { combineReducers } from 'redux';
import user from './user';
import challenges from './challenges';
import leaderboard from './leaderboard';

const rootReducer = combineReducers({
  user,
  challenges,
  leaderboard
});

export default rootReducer;
