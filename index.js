'use strict';

require('dotenv').config();
const {start} = require('./src/server.js');
const { db } = require('./src/models');

db.sync().then(() => {
  start(process.env.PORT || 5000);
});
