import path from 'path';
import { app } from './server';
import { getUser } from '../db/getUser';
import { getLeaderboard } from '../db/getLeaderboard';
import { getTeamScores } from '../db/getTeamScores';

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    console.log('no session')
    res.redirect('/auth/fitbit');
  }
};

app.get('/', loggedIn, (req, res) => {
  // request({
  //   url: 'https://api.fitbit.com/1/user/4DJTY5/profile.json',
  //   headers: {
  //     'User-Agent': 'request',
  //     Authorization: `Bearer ${req.user.accessToken}`
  //   }
  // }, (err, result) => {
  //   if (err) throw err;
  //   res.send(result);
  // });
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/users/profile', loggedIn, (req, res) => {
  getUser(req.user.profile.id)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    if (err) throw err;
  });
});

app.get('/users/top/:team', (req, res) => {
  getLeaderboard(req.params.team)
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    if (err) throw err;
  });
});

app.get('/teams', (req, res) => {
  getTeamScores()
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    if (err) throw err;
  });
});

// Put this at the end so client side routing will work
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../index.html'));
});
