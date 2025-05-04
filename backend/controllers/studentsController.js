const Student = require('../models/Student');
const Class = require('../models/Class');

// Lista todos os alunos
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('turmaId', 'nome'); // Popula o campo turmaId com o nome da turma
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos', error });
  }
};

// Cria um novo aluno
exports.createStudent = async (req, res) => {
  try {
    const { nome, cpf, dataNascimento, turmaId } = req.body;

    // Verifica se a turma existe
    const turma = await Class.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    // Verifica se o CPF já está cadastrado
    const existingStudent = await Student.findOne({ cpf });
    if (existingStudent) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    const newStudent = await Student.create({ nome, cpf, dataNascimento, turmaId });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar aluno', error });
  }
};

// Atualiza um aluno pelo ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, dataNascimento, turmaId } = req.body;

    // Verifica se a turma existe
    if (turmaId) {
      const turma = await Class.findById(turmaId);
      if (!turma) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }
    }

    // Verifica se o CPF já está cadastrado em outro aluno
    if (cpf) {
      const existingStudent = await Student.findOne({ cpf, _id: { $ne: id } });
      if (existingStudent) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { nome, cpf, dataNascimento, turmaId },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar aluno', error });
  }
};

// Exclui um aluno pelo ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir aluno', error });
  }
};