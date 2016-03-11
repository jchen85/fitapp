import r from 'rethinkdb';
import { connection } from './config';
import request from 'request-promise';

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
      name: user.profile.displayName
    }, { conflict: 'update' }
    ).run(connection);
  });
};

export { addUser };
