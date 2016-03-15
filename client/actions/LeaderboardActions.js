import { SET_LEADERBOARD } from '../constants/ActionTypes';

export function setLeaderboard (data) {
  return {
    type: SET_LEADERBOARD,
    leaderboard: data
  };
}

// initial fetch of user info happens as HTTP request, subsequent updates
// happen over sockets and use updateUserInfo
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
