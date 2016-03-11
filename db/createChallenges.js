import r from 'rethinkdb';
import { connection } from './connection';

r.db('fitapp').table('challenges').insert({
  id: 1,
  category: 'steps',
  requirement: 5000,
  wager: 100,
  members: [],
}, { conflict: 'replace' }).run(connection, (err) => {
  if (err) throw err;
});

r.db('fitapp').table('challenges').insert({
  id: 2,
  category: 'steps',
  requirement: 1000,
  wager: 100,
  members: [],
}, { conflict: 'replace' }).run(connection, (err) => {
  if (err) throw err;
});

r.db('fitapp').table('challenges').insert({
  id: 3,
  category: 'calories',
  requirement: 1000,
  wager: 100,
  members: [],
}, { conflict: 'replace' }).run(connection, (err) => {
  if (err) throw err;
});

r.db('fitapp').table('challenges').insert({
  id: 4,
  category: 'calories',
  requirement: 500,
  wager: 100,
  members: [],
}, { conflict: 'replace' }).run(connection, (err) => {
  if (err) throw err;
});
