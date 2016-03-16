
// Enable ES6 transpile
require('babel-register');

const express = require('express');
const webpack = require('webpack');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

if (process.env.NODE_ENV !== 'production') {
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
};


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
