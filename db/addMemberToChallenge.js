import r from 'rethinkdb';
import { connection } from './connection';
import request from 'request-promise';
import moment from 'moment';

const addMemberToChallenge = (challengeId, userId) => {
  return r.db('fitapp').table('users')
    .get(userId)
    .run(connection)
    .then(row => {
      return request({
        url: `https://api.fitbit.com/1/user/${row.id}/activities/date/${moment().format('YYYY-MM-DD')}.json`, // get today's activity summary from Fitbit API
        headers: {
          'User-Agent': 'request',
          Authorization: `Bearer ${row.accessToken}`
        }
      });
    })
    .then(data => {
      data = JSON.parse(data);
      r.db('fitapp').table('joinStats')
      .get(userId)
      .update({
        [challengeId]: {
          caloriesBurned: data.summary.activityCalories, // store his stats from the time he joined
          stepsTaken: data.summary.steps                  // the challenge so we can use it later
                                                          //  to check if he actually did it
        }
      })
      .run(connection);
    })
    .then(() => {
      return r.db('fitapp').table('challenges')
      .get(challengeId)
      // use setInsert to ensure members don't get inserted twice
      .update({ members: r.row('members').setInsert(userId) })
      .run(connection);
    })
    .catch(err => {
      if (err) throw err;
    });
};

export { addMemberToChallenge };
