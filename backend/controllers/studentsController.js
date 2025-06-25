const Student = require("../models/Student");
const Class = require("../models/Class");
const { Op } = require("sequelize");

// Lista todos os alunos
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{ model: Class, as: "turma", attributes: ["nome"] }],
    });
    res.status(200).json(students);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar alunos", error: error.message });
  }
};

// Cria um novo aluno
exports.createStudent = async (req, res) => {
  try {
    const { nome, cpf, dataNascimento, turmaId } = req.body;

    // Verifica se a turma existe
    const turma = await Class.findByPk(turmaId);
    if (!turma) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    // Verifica se o CPF já está cadastrado
    const existingStudent = await Student.findOne({ where: { cpf } });
    if (existingStudent) {
      return res.status(400).json({ message: "CPF já cadastrado" });
    }

    const newStudent = await Student.create({
      nome,
      cpf,
      dataNascimento,
      turmaId,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res
      .status(500)
      .json({ message: "Erro ao criar aluno", error: error.message });
  }
};

// Atualiza um aluno pelo ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, dataNascimento, turmaId } = req.body;

    // Verifica se a turma existe
    if (turmaId) {
      const turma = await Class.findByPk(turmaId);
      if (!turma) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }
    }

    // Verifica se o CPF já está cadastrado em outro aluno
    if (cpf) {
      const existingStudent = await Student.findOne({
        where: {
          cpf,
          id: { [Op.ne]: id },
        },
      });
      if (existingStudent) {
        return res.status(400).json({ message: "CPF já cadastrado" });
      }
    }

    const [updated] = await Student.update(
      { nome, cpf, dataNascimento, turmaId },
      { where: { id } }
    );
    if (!updated) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    const updatedStudent = await Student.findByPk(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res
      .status(500)
      .json({ message: "Erro ao atualizar aluno", error: error.message });
  }
};

// Exclui um aluno pelo ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    res.status(200).json({ message: "Aluno excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    res
      .status(500)
      .json({ message: "Erro ao excluir aluno", error: error.message });
  }
};
