import { io } from './server';
import { getChallenges } from '../db/getChallenges';
import { addMemberToChallenge } from '../db/addMemberToChallenge';
import { removeMemberFromChallenge } from '../db/removeMemberFromChallenge';
import r from 'rethinkdb';
import { connection } from '../db/connection';
import { challengeCost } from '../constants/gameSettings';

io.on('connection', (socket) => {
  // give each new connection the full set of challenges
  getChallenges()
  .then(cursor => {
    const challengesObj = {};

    cursor.eachAsync(row => {
      challengesObj[row.id] = row;
    })
    .then(() => {
      socket.emit('updateChallenges', challengesObj);
    });
  })
  .catch(err => {
    if (err) throw err;
  });

  socket.on('addMember', data => {
    r.db('fitapp').table('users').get(data.userId)
    .update(row => {
      return {
        points: row('points').sub(challengeCost)
      };
    })
    .run(connection)
    .then(() => {
      addMemberToChallenge(data.challengeId, data.userId)
      .catch(err => {
        if (err) throw err;
      });
    });
  });

  socket.on('removeMember', data => {
    r.db('fitapp').table('users').get(data.userId)
    .update(row => {
      return {
        points: row('points').add(challengeCost)
      };
    })
    .run(connection)
    .then(() => {
      removeMemberFromChallenge(data.challengeId, data.userId)
      .catch(err => {
        if (err) throw err;
      });
    });
  });

  // subscribe user to changefeed of his profile in order to keep client state consistent with db
  socket.on('joinGame', userId => {
    r.db('fitapp').table('users').get(userId).changes().run(connection)
    .then(cursor => {
      cursor.eachAsync(row => {
        socket.emit('updateUserInfo', row.new_val);
      });
    });
  });
});

// Subscribe to the changefeed for challenges: https://www.rethinkdb.com/docs/changefeeds/javascript/
// Then send the updated challenges back to connected clients
// This is wrapped in a function so that it can be called after the challenges table is created upon
// server start (db/createChallenges.js)
export const broadcastChanges = () => {
  r.db('fitapp').table('challenges').changes().run(connection)
  .then(cursor => {
    cursor.eachAsync(row => {
      if (row.new_val) {
        const newObj = {};
        newObj[row.new_val.id] = row.new_val;
        io.sockets.emit('updateChallenges', newObj);
      }
    });
  })
  .catch(err => {
    if (err) throw err;
  });
};
