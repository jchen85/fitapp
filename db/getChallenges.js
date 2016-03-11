import r from 'rethinkdb';
import { connection } from './connection';

const getChallenges = () => {
  return r.db('fitapp').table('challenges').run(connection);
};

export { getChallenges };
