import { UPDATE_USER_INFO } from '../constants/ActionTypes';

export function fetchUserInfo() {
  return (dispatch) => {
    const request = new Request('/users/profile', {
      method: 'get'
    });

    return fetch(request, { credentials: 'include' })
    // credentials must be included because the /users/profile endpoint
    // requires you to be logged in and cookied
      .then(response => response.json())
      .then((json) => {
        dispatch({
          type: UPDATE_USER_INFO,
          userInfo: json
        });
      });
  };
}