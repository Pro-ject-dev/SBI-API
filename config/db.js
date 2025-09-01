const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bramha_industries", "root", "newpassword", {
  host: "127.0.0.1",
  dialect: "mysql",

});

module.exports = sequelize;
