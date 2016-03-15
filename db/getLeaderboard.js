import r from 'rethinkdb';
import { connection } from './connection';

r.db('fitapp').table("users").orderBy({index: r.desc('points')}).filter({}).limit(25)

export const getLeaderboard = (team) => {
  let teamFilter = null;
  if (team === 'All') {
    teamFilter = {};
  } else {
    teamFilter = { team: team }
  }

  return r.db('fitapp').table("users")
  .orderBy({index: r.desc('points')})
  .filter(teamFilter).limit(100).coerceTo('array')
  .run(connection)
}
