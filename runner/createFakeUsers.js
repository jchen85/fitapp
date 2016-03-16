import userGenerator from './userGenerator';
import r from 'rethinkdb';
import { connection } from '../db/connection';

const addFakeUserToDb = () => {
  const fakeUser = userGenerator();
  r.db('fitapp').table('users').insert(fakeUser)
  .run(connection)
  .catch(err => {
    if (err) throw err;
  });
};

const addFakeUserToChallenge = () => {
  r.db('fitapp').table('users').filter({ fake: true }).sample(1)
  .run(connection)
  .then((fakeUser) => {
    r.db('fitapp').table('challenges').sample(1).update({
      members: r.row('members').setInsert(...fakeUser)
    })
    .run(connection);
  })
  .catch(err => {
    if (err) throw err;
  });
};

/* Turned off when there are enough fake users
setInterval(() => {
  addFakeUserToDb();
}, 2000);
*/

setInterval(() => {
  addFakeUserToChallenge();
}, 2000);
