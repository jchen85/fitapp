import { UPDATE_USER_INFO } from '../constants/ActionTypes';

const initialState = {
  id: 0,
  name: 'Loading...',
  age: 0,
  points: 0,
  avatar: 'Loading...'
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return Object.assign({}, state, {
        id: action.userInfo.id,
        name: action.userInfo.name,
        points: action.userInfo.points,
        avatar: action.userInfo.avatar,
        age: action.userInfo.age,
        team: action.userInfo.team
      });
    default:
      return state;
  }
}
