import { UPDATE_CHALLENGES, ADD_MEMBER, REMOVE_MEMBER } from '../constants/ActionTypes';
import { socket } from '../index';

export function updateChallenges(data) {
  return {
    type: UPDATE_CHALLENGES,
    challenges: data
  };
}

export function addMember(challengeId, userId) {
  socket.emit('addMember', { challengeId, userId });
  return {
    type: ADD_MEMBER
  };
}

export function removeMember(challengeId, userId) {
  socket.emit('removeMember', { challengeId, userId });
  return {
    type: REMOVE_MEMBER
  };
}
