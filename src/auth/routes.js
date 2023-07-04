'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
const permissions = require('./middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.put('/users',bearerAuth,permissions('update',async(req,res,next)=>{
  const id=req.params.id;
  try {
  const updated=await users.findOne({where:{id}});
  res.status(201).send(updated);
  } catch (error) {
    next(error);
  }
}))
authRouter.delete('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const id=req.params.id;
  try {
    const deletedRecord = await users.destroy({where:{id}});
    res.status(200).json(deletedRecord);
  } catch (error) {
    next(error);
  }

});

module.exports = authRouter;
