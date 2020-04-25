const express = require('express');
const cookieParser = require('cookie-parser');

const { connectToDb } = require('./db');
const { installHandler } = require('./api_handler');


const auth = require('./auth.js');

require('dotenv').config();

const port = process.env.API_SERVER_PORT || 3000;

const app = express();

app.use(cookieParser());
app.use('/auth', auth.routes);

installHandler(app);

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Api Server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR', err);
  }
}());
