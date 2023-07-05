'use strict';

const express = require('express');
const cors = require('cors');

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/auth.js');
const dynamicRoute=require('./routes/dynamicRoute.js');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send('one home page')
})
app.use(authRoutes);
app.use(dynamicRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Running on  ${port}`);
    });
  },
};