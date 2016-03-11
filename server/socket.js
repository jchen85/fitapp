import { io } from './server';
import { getChallenges } from '../db/getChallenges';
import { addMemberToChallenge } from '../db/addMemberToChallenge';
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


  // Subscribe to the changefeed for challenges: https://www.rethinkdb.com/docs/changefeeds/javascript/
  // Then send the updated challenges back to client
  r.db('fitapp').table('challenges').changes().run(connection)
  .then(cursor => {
    cursor.eachAsync(row => {
      const newObj = {};
      newObj[row.new_val.id] = row.new_val;
      socket.emit('updateChallenges', newObj);
    });
  })
  .catch(err => {
    if (err) throw err;
  });

});
