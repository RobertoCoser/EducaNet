const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Class = require("./Class");

const Student = sequelize.define(
  "Student",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "students",
  }
);

Student.belongsTo(Class, { foreignKey: "turmaId", as: "turma" });
Class.hasMany(Student, { foreignKey: "turmaId", as: "alunos" });

module.exports = Student;
