import { UPDATE_CHALLENGES } from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case UPDATE_CHALLENGES:
      return Object.assign({}, state, action.challenges);
    default:
      return state;
  }
}
