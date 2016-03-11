import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import { FitbitOAuth2Strategy } from 'passport-fitbit-oauth2';
import passport from 'passport';
import { app } from './server';
import { addUser } from '../db/addUser';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

const CLIENT_ID = '227NBJ';
const CLIENT_SECRET = 'aedb001f7aaf82f2382fef672f23b395';

app.use(passport.initialize());
app.use(passport.session({
  resave: false,
  saveUninitialized: true
}));

const fitbitStrategy = new FitbitOAuth2Strategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  scope: ['activity', 'heartrate', 'location', 'profile'],
  callbackURL: 'http://localhost:3000/auth/fitbit/callback'
}, (accessToken, refreshToken, profile, done) => {
  // TODO: save accessToken here for later use

  done(null, {
    accessToken,
    refreshToken,
    profile
  });
});

passport.use(fitbitStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const fitbitAuthenticate = passport.authenticate('fitbit', {
  successRedirect: '/auth/fitbit/success',
  failureRedirect: '/auth/fitbit/failure'
});

app.get('/auth/fitbit', fitbitAuthenticate);
app.get('/auth/fitbit/callback', fitbitAuthenticate);

app.get('/auth/fitbit/success', (req, res, next) => {
  addUser(req.user)
  .then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    if (err) throw err;
  });
});

export { passport };
