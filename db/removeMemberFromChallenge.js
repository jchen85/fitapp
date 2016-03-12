import r from 'rethinkdb';
import { connection } from './connection';

// This removes members by first locating the challenge by its id,
// then replacing the members array with a copy of the same members array
// that has been filtered to remove the member who wants to leave
const removeMemberFromChallenge = (challengeId, userId) => {
  return r.db('fitapp').table('challenges')
    .get(challengeId)
    .update({ members: r.row('members').filter(item => { return item.ne(userId); }) })
    .run(connection);
};

export { removeMemberFromChallenge };
