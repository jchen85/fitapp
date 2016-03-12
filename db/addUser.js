import r from 'rethinkdb';
import { connection } from './connection';
import request from 'request-promise';
import { startingPoints } from '../constants/gameSettings';

const addUser = (user) => {
  return request({
    url: `https://api.fitbit.com/1/user/${user.profile.id}/activities/date/2016-03-10.json`,
    headers: {
      'User-Agent': 'request',
      Authorization: `Bearer ${user.accessToken}`
    }
  })
  .then((result) => {
    return r.db('fitapp').table('users').insert({
      id: user.profile.id,
      name: user.profile.displayName,
      points: startingPoints
    }, { conflict: 'replace' }
    ).run(connection);
  });
};

export { addUser };
