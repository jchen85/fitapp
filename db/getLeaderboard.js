import r from 'rethinkdb';
import { connection } from './connection';

export const getLeaderboard = (team) => {
  let teamFilter = null;
  if (team === 'All') {
    teamFilter = {};
  } else {
    teamFilter = { team };
  }

  return r.db('fitapp').table('users')
  .orderBy({ index: r.desc('points') })
  .filter(teamFilter).limit(100).coerceTo('array')
  .run(connection);
};
