const Class = require('../models/Class');
const School = require('../models/School');

// Lista todas as turmas
exports.getAllClasses = async (req, res) => {
  try {
    // Popula o campo escolaId com os detalhes da escola (nome e outros campos desejados)
    const classes = await Class.find().populate('escolaId', 'name address');
    res.status(200).json(classes);
  } catch (error) {
    console.error('Erro ao buscar turmas:', error); // Log para facilitar a depuração
    res.status(500).json({ message: 'Erro ao buscar turmas', error: error.message });
  }
};

// Cria uma nova turma
exports.createClass = async (req, res) => {
  try {
    const { nome, ano, escolaId } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !ano || !escolaId) {
      return res.status(400).json({ message: 'Campos obrigatórios: nome, ano e escolaId' });
    }

    // Verifica se a escola existe
    const escola = await School.findById(escolaId);
    if (!escola) {
      return res.status(404).json({ message: 'Escola não encontrada' });
    }

    // Cria a nova turma
    const newClass = await Class.create({ nome, ano, escolaId });
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Erro ao criar turma:', error); // Log para facilitar a depuração
    res.status(500).json({ message: 'Erro ao criar turma', error: error.message });
  }
};

// Atualiza uma turma pelo ID
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano, escolaId } = req.body;

    // Validação de campos obrigatórios
    if (!id || !nome || !ano || !escolaId) {
      return res.status(400).json({ message: 'Campos obrigatórios: id, nome, ano e escolaId' });
    }

    // Verifica se a escola existe, caso tenha sido enviada
    if (escolaId) {
      const escola = await School.findById(escolaId);
      if (!escola) {
        return res.status(404).json({ message: 'Escola não encontrada' });
      }
    }

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
    console.error('Erro ao atualizar turma:', error); // Log para facilitar a depuração
    res.status(500).json({ message: 'Erro ao atualizar turma', error: error.message });
  }
};

// Exclui uma turma pelo ID
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID da turma é obrigatório' });
    }

    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    res.status(200).json({ message: 'Turma excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir turma:', error); // Log para facilitar a depuração
    res.status(500).json({ message: 'Erro ao excluir turma', error: error.message });
  }
};