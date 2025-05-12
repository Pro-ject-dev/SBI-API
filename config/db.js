const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',        
  dialect: 'mysql',
  logging:true,   
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
