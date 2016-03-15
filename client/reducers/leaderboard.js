import { SET_TEAM_SCORES, SET_LEADERBOARD } from '../constants/ActionTypes';

const initialState = { leaderboard: [], teamScores: [] };

export default function leaderboard(state = initialState, action) {
  switch (action.type) {
    case SET_LEADERBOARD:
      return Object.assign({}, state, { leaderboard: action.leaderboard });
    case SET_TEAM_SCORES:
      console.log(action);
      return Object.assign({}, state, { teamScores: action.teamScores });
    default:
      return state;
  }
}
