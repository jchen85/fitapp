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
  res.send(req.user);
});
