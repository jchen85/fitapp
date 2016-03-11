import r from 'rethinkdb';
import { connection } from './connection';

const addMemberToChallenge = (challengeId, userId) => {
  return r.db('fitapp').table('challenges')
    .get(challengeId)
    // use setInsert to ensure members don't get inserted twice
    .update({ members: r.row('members').setInsert(userId) })
    .run(connection);
};

export { addMemberToChallenge };
