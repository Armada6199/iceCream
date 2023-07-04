'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';
const sequelize = new Sequelize(DATABASE_URL);
const favorites=require('./flavors/model');
const flavores=require('./favorites/model');
const users=require('../auth/models/users');
const Collection=require('./data-collections');
const favoritesModel=favorites(sequelize,DataTypes);
const flavoresModel=flavores(sequelize,DataTypes);
const userModel=users(sequelize,DataTypes);

module.exports = {
  db: sequelize,
  users:new Collection(userModel),
  favorites:new Collection(favoritesModel),
  flavores:new Collection(flavoresModel)
}