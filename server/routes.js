import path from 'path';
import { passport } from './fitbitauth';
import { app } from './server';

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', loggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
