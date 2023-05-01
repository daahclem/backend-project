const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'daahclem', '1234Kwadwo', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;