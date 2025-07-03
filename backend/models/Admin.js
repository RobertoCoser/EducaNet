const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Admin = sequelize.define("Admin", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Admin;
