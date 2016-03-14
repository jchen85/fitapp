
// Enable ES6 transpile
require('babel-register');

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');

const app = express();
const compiler = webpack(config);

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '..')));

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
