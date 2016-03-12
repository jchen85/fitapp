import { UPDATE_USER_INFO } from '../constants/ActionTypes';
import { socket } from '../index';


export function updateUserInfo(data) {
  return {
    type: UPDATE_USER_INFO,
    userInfo: data
  };
}

// initial fetch of user info happens as HTTP request, subsequent updates
// happen over sockets and use updateUserInfo
export function fetchUserInfo() {
  return (dispatch) => {
    const request = new Request('/users/profile', {
      method: 'get'
    });

    return fetch(request, { credentials: 'include' })
    // credentials must be included because the /users/profile endpoint
    // requires you to be logged in and cookied
      .then(response => response.json())
      .then(json => {
        dispatch(updateUserInfo(json));
        socket.emit('joinGame', json.id);
      });
  };
}
