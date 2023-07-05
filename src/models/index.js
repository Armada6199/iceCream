'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';
const sequelize = new Sequelize(DATABASE_URL);
const favorites=require('./favorites/model');
const flavores=require('./flavors/model');
const users=require('../auth/models/users');
const Collection=require('./data-collections');
const favoritesModel=favorites(sequelize,DataTypes);
const flavoresModel=flavores(sequelize,DataTypes);
const userModel=users(sequelize,DataTypes);
userModel.hasMany(favoritesModel);
favoritesModel.belongsTo(userModel);
favoritesModel.hasOne(flavoresModel);
flavoresModel.belongsTo(favoritesModel);
module.exports = {
  db: sequelize,
  users:new Collection(userModel),
  favorites:new Collection(favoritesModel),
  flavors:new Collection(flavoresModel)
}