'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';
const sequelize = new Sequelize(DATABASE_URL);
const clothes=require('./clothes/model');
const food=require('./food/model');
const users=require('../auth/models/users');
const Collection=require('./data-collections');
const clothesModel=clothes(sequelize,DataTypes);
const foodModel=food(sequelize,DataTypes);
const userModel=users(sequelize,DataTypes);

module.exports = {
  db: sequelize,
  clothes:new Collection(clothesModel),
  food:new Collection(foodModel),
  users:new Collection(userModel)
}