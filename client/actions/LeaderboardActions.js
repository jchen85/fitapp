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
    const request = new Request(`/users/top/${team}`, {
      method: 'get'
    });

    return fetch(request)
      .then(response => response.json())
      .then(json => {
        dispatch(setLeaderboard(json));
      });
  };
}

export function fetchTeamScores() {
  return (dispatch) => {
    const request = new Request('/teams', {
      method: 'get'
    });

    return fetch(request)
      .then(response => response.json())
      .then(json => {
        dispatch(setTeamScores(json));
      });
  };
}

