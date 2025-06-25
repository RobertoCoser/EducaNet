const Class = require("../models/Class");
const School = require("../models/School");

// Lista todas as turmas
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [
        { model: School, as: "escola", attributes: ["name", "address"] },
      ],
    });
    res.status(200).json(classes);
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar turmas", error: error.message });
  }
};

// Cria uma nova turma
exports.createClass = async (req, res) => {
  try {
    const { nome, ano, escolaId } = req.body;
    if (!nome || !ano || !escolaId) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios: nome, ano e escolaId" });
    }

    // Verifica se a escola existe
    const escola = await School.findByPk(escolaId);
    if (!escola) {
      return res.status(404).json({ message: "Escola não encontrada" });
    }

    const newClass = await Class.create({ nome, ano, escolaId });
    res.status(201).json(newClass);
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    res
      .status(500)
      .json({ message: "Erro ao criar turma", error: error.message });
  }
};

// Atualiza uma turma pelo ID
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano, escolaId } = req.body;

    if (!id || !nome || !ano || !escolaId) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios: id, nome, ano e escolaId" });
    }

    // Verifica se a escola existe
    if (escolaId) {
      const escola = await School.findByPk(escolaId);
      if (!escola) {
        return res.status(404).json({ message: "Escola não encontrada" });
      }
    }

    const [updated] = await Class.update(
      { nome, ano, escolaId },
      { where: { id } }
    );
    if (!updated) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }
    const updatedClass = await Class.findByPk(id);
    res.status(200).json(updatedClass);
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    res
      .status(500)
      .json({ message: "Erro ao atualizar turma", error: error.message });
  }
};

// Exclui uma turma pelo ID
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID da turma é obrigatório" });
    }
    const deleted = await Class.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }
    res.status(200).json({ message: "Turma excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir turma:", error);
    res
      .status(500)
      .json({ message: "Erro ao excluir turma", error: error.message });
  }
};
