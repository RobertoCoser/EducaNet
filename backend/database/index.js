const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("educanet", "root", "1478", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
