import r from 'rethinkdb';
import { connection } from './connection';

const getUser = (id) => {
  return r.db('fitapp').table('users').get(id).run(connection);
};

export { getUser };
