import r from 'rethinkdb';
import { connection } from './connection';
import request from 'request-promise';
import moment from 'moment';
import { challengeCost } from '../constants/gameSettings';

// First merge challenges with joinStats
// Then for each member in each challenge, retrieve their stats at the end
// Check to see if they met their goal
export const endChallenge = (challengeId) => {
  r.db('fitapp').table('challenges')
  .run(connection)
  .then(cursors => {
    cursors.each((err, challenge) => {
      challenge.members.forEach(member => {
        // Fake users have a 50% chance of completing the challenge and having their score change. Doesn't reflect the same math as would happen for a real user
        if (member.fake) {
          if (Math.floor(Math.random() * 2)) {
            r.db('fitapp').table('fakeUsers').get(member.id)
            .update(row => {
              return {
                points: row('points').add(challengeCost)
              };
            });
          } else {
            r.db('fitapp').table('fakeUsers').get(member.id)
            .update(row => {
              return {
                points: row('points') - challengeCost
              };
            });
          }
        } else {
          request({
            url: `https://api.fitbit.com/1/user/${member.id}/activities/date/${moment().format('YYYY-MM-DD')}.json`, // get today's activity summary from Fitbit API
            headers: {
              'User-Agent': 'request',
              Authorization: `Bearer ${member.accessToken}`
            }
          })
          .then((endingStats) => {
            r.db('fitapp').table('joinStats').get(member.id)
            .run(connection)
            .then(memberJoinStats => {
              endingStats = JSON.parse(endingStats).summary.steps;
              memberJoinStats = memberJoinStats[challengeId].stepsTaken;
              if (endingStats - memberJoinStats >= challenge.requirement) {
                r.db('fitapp').table('users').get(member.id)
                .update(row => {
                  return {
                    points: row('points').add(challengeCost)
                  };
                })
                .run(connection);
              }
            });
          })
          .catch(err => {
            if (err) throw err;
          });
        }
      });
    });
  });
};
