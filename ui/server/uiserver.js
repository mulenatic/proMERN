import dotenv from 'dotenv';
import express from 'express';
import SourceMapSupport from 'source-map-support';

import render from './render.jsx';

SourceMapSupport.install();
dotenv.config();

const port = process.env.UI_SERVER_PORT || 4000;

const app = express();

const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  console.log('Adding dev middleware, enabling HMR');
  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config.js')[0];
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.use(express.static('public'));

if (!process.env.UI_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = 'http://localhost:3000/graphql';
}

if (!process.env.UI_SERVER_API_ENDPOINT) {
  process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

app.get('/env.js', (req, res) => {
  const env = {
    UI_API_ENDPOINT: process.env.UI_API_ENDPOINT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  };
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('*', (req, res, next) => {
  render(req, res, next);
});

app.listen(port, () => {
  console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID}`);
  console.log(`UI_API_ENDPOINT: ${process.env.UI_API_ENDPOINT}`);
  console.log(`UI started on port ${port}`);
});

if (module.hot) {
  module.hot.accept('./render.jsx');
}
