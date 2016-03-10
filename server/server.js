// Enable ES6 transpile
require('babel-register');

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));



module.exports = {
  app: app
};

// Fitbit OAuth routes and Passport config
require('./fitbitauth');

// All other routes
require('./routes');

app.listen(3000);