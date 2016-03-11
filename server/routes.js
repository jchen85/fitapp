import path from 'path';
import { app } from './server';
import { getUser } from '../db/getUser';

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
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
