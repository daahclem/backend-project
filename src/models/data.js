const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');

const Data = sequelize.define('Data', {
  field1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  field2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Data;
