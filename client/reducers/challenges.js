import { UPDATE_CHALLENGES, ADD_MEMBER, REMOVE_MEMBER } from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case UPDATE_CHALLENGES:
      return Object.assign({}, state, action.challenges);
    case ADD_MEMBER:
      return state;
    case REMOVE_MEMBER:
      return state;
    default:
      return state;
  }
}
