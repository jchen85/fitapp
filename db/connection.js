import r from 'rethinkdb';
import config from './config';
let connection = null;

r.connect(config, (err, conn) => {
  if (err) throw err;
  connection = conn;
  r.db('fitapp').tableCreate('users').run(connection, (err2, result) => {
    if (err2) console.log('users table exists already so nothing happened');
  });
  r.db('fitapp').tableCreate('challenges').run(connection, (err3, result) => {
    if (err3) console.log('challenges table exists already so nothing happened');
    require('./createChallenges');
  });
});

export { connection };
