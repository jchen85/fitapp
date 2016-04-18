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
    dispatch(updateUserInfo({
      id: 1,
      name: 'Jay',
      age: 30,
      points: 1000,
      avatar: 'http://i.imgur.com/sEX3UCS.png',
      team: 'Bravo'
    }));
    socket.emit('joinGame', 1);
  };
}
