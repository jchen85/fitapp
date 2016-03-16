
// Enable ES6 transpile
require('babel-register');

const path = require('path');
const express = require('express');
const webpack = require('webpack');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


module.exports = {
  app: app,
  io: io
};


// Fitbit OAuth routes and Passport config
require('./fitbitauth');

// All other routes
require('./routes');

// Socket configuration
require('./socket.js');

server.listen(3000);
