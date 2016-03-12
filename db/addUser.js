import r from 'rethinkdb';
import { connection } from './connection';
import request from 'request-promise';
import { startingPoints } from '../constants/gameSettings';
import moment from 'moment';

const addUser = (user) => {
  return request({
    url: `https://api.fitbit.com/1/user/${user.profile.id}/activities/date/${moment().format('YYYY-MM-DD')}.json`, // get today's activity summary from Fitbit API
    headers: {
      'User-Agent': 'request',
      Authorization: `Bearer ${user.accessToken}`
    }
  })
  .then((result) => {
    return r.db('fitapp').table('users').insert({
      id: user.profile.id,
      name: user.profile.displayName,
      points: startingPoints,
      accessToken: user.accessToken
    }, { conflict: 'replace' }
    ).run(connection);
  })
  .then(() => {
    return r.db('fitapp').table('joinStats')
    .insert({
      id: user.profile.id
    }).run(connection);
  })
  .catch(err => {
    if (err) throw err;
  });
};

export { addUser };
