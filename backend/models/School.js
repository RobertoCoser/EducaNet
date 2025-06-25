const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const School = sequelize.define(
  "School",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "schools",
  }
);

module.exports = School;
