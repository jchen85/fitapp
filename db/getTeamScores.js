import r from 'rethinkdb';
import { connection } from './connection';

export const getTeamScores = () => {
  return r.db('fitapp').table('users')
  .group('team').sum('points')
  .ungroup().orderBy(r.desc('reduction')).run(connection);
};
