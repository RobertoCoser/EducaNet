const Class = require('../models/Class');
const School = require('../models/School');

// Lista todas as turmas
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('escolaId', 'name'); // Popula o campo escolaId com o nome da escola
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar turmas', error });
  }
};

// Cria uma nova turma
exports.createClass = async (req, res) => {
  try {
    const { nome, ano, escolaId } = req.body;

    // Verifica se a escola existe
    const escola = await School.findById(escolaId);
    if (!escola) {
      return res.status(404).json({ message: 'Escola não encontrada' });
    }

    const newClass = await Class.create({ nome, ano, escolaId });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar turma', error });
  }
};

// Atualiza uma turma pelo ID
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano, escolaId } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { nome, ano, escolaId },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar turma', error });
  }
};

// Exclui uma turma pelo ID
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    res.status(200).json({ message: 'Turma excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir turma', error });
  }
};