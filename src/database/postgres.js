const { Sequelize, DataTypes } = require('sequelize');

// Configure PostgreSQL
const sequelize = new Sequelize('mydb', 'postgres', '1234Kwadwo', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define the model for the data
const Data = sequelize.define('Data', {
  field1: { type: DataTypes.STRING, allowNull: false },
  field2: { type: DataTypes.STRING, allowNull: false }
  // Add more fields as needed, matching your CSV structure
});

// Initialize the database and the model
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Data model has been synchronized.');

  } catch (error) {
    console.error('Unable to connect to the PostgreSQL:', error);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  Data,
  initDatabase
};
