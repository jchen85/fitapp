import r from 'rethinkdb';
import { connection } from './config';

const addUser = (user) => {
  return r.db('fitapp').table('users').insert({
    id: user.id,
    name: user.displayName
  }, { conflict: 'update' }
  ).run(connection);
};

export { addUser };
