import path from 'path';
import { passport } from './fitbitauth';
import { app } from './server';
import request from 'request';

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