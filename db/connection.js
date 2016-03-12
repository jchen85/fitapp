import r from 'rethinkdb';
import config from './config';
let connection = null;

// This file creates our tables if they don't already exist, then recreates the challenges

r.connect(config, (err, conn) => {
  if (err) throw err;
  connection = conn;

  r.db('fitapp').tableCreate('users').run(connection, (err, result) => {
    if (err) console.log('users table exists already so nothing happened');
  });

  r.db('fitapp').tableCreate('challenges').run(connection, (err, result) => {
    if (err) console.log('challenges table exists already so nothing happened');
    require('./createChallenges');
  });

  r.db('fitapp').tableCreate('joinStats').run(connection, (err, result) => {
    if (err) console.log('joinStats table exists already so nothing happened');
  });
});

export { connection };
