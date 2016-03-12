import { io } from './server';
import { getChallenges } from '../db/getChallenges';
import { addMemberToChallenge } from '../db/addMemberToChallenge';
import { removeMemberFromChallenge } from '../db/removeMemberFromChallenge';
import r from 'rethinkdb';
import { connection } from '../db/connection';

io.on('connection', (socket) => {
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
    addMemberToChallenge(data.challengeId, data.userId)
    .catch(err => {
      if (err) throw err;
    });
  });

  socket.on('removeMember', data => {
    removeMemberFromChallenge(data.challengeId, data.userId)
    .catch(err => {
      if (err) throw err;
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
      const newObj = {};
      newObj[row.new_val.id] = row.new_val;
      io.sockets.emit('updateChallenges', newObj);
    });
  })
  .catch(err => {
    if (err) throw err;
  });
};
