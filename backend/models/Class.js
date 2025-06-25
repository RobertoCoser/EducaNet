const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const School = require("./School");

const Class = sequelize.define(
  "Class",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "classes",
  }
);

Class.belongsTo(School, { foreignKey: "escolaId", as: "escola" });
School.hasMany(Class, { foreignKey: "escolaId", as: "turmas" });

module.exports = Class;
