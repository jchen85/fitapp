import { SET_TEAM_SCORES, SET_LEADERBOARD } from '../constants/ActionTypes';

export function setLeaderboard(data) {
  return {
    type: SET_LEADERBOARD,
    leaderboard: data
  };
}

export function setTeamScores(data) {
  return {
    type: SET_TEAM_SCORES,
    teamScores: data
  };
}

export function fetchLeaderboard(team) {
  return (dispatch) => {
    return fetch(`/users/top/${team}`)
      .then(response => response.json())
      .then(json => {
        dispatch(setLeaderboard(json));
      });
  };
}

export function fetchTeamScores() {
  return (dispatch) => {
    return fetch('/teams')
      .then(response => response.json())
      .then(json => {
        dispatch(setTeamScores(json));
      });
  };
}

