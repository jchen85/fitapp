import r from 'rethinkdb';
import config from './config';
let connection = null;

r.connect(config, (err, conn) => {
  if (err) throw err;
  connection = conn;
  r.db('fitapp').tableCreate('users').run(connection, (err2, result) => {
    if (err2) console.log('users table exists, no problem');
  });
});

export { connection };
