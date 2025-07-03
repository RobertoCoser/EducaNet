const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("educanet", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;