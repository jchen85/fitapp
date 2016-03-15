import { SET_LEADERBOARD } from '../constants/ActionTypes';

const initialState = [];

export default function leaderboard(state = initialState, action) {
  switch (action.type) {
    case SET_LEADERBOARD:
      return action.leaderboard;
    default:
      return state;
  }
}
