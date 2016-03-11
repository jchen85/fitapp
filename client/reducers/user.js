import { UPDATE_USER_INFO } from '../constants/ActionTypes';

export default function user(state = { id: 0, name: 'Loading...' }, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return Object.assign({}, state, {
        id: action.userInfo.id,
        name: action.userInfo.name
      });
    default:
      return state;
  }
}
