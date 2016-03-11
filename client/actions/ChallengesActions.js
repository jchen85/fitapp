import { UPDATE_CHALLENGES, ADD_MEMBER } from '../constants/ActionTypes';
import { socket } from '../index';

export function updateChallenges(data) {
  return {
    type: UPDATE_CHALLENGES,
    challenges: data
  };
}

export function addMember(challengeId, userId) {
  socket.emit('addMember', { challengeId, userId });
}
