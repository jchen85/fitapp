// Enable ES6 transpile
require('babel-register');

var express = require('express');
var app = express();

module.exports = {
  app: app
};

// Fitbit OAuth routes and Passport config
require('./fitbitauth');

// All other routes
require('./routes');

app.listen(3000);
