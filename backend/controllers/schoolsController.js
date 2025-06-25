const School = require("../models/School");

// Lista todas as escolas
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar escolas", error });
  }
};

// Cria uma nova escola
exports.createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const newSchool = await School.create({ name, address });
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar escola", error });
  }
};

// Atualiza uma escola pelo ID
exports.updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const [updated] = await School.update({ name, address }, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Escola não encontrada" });
    }
    const updatedSchool = await School.findByPk(id);
    res.status(200).json(updatedSchool);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar escola", error });
  }
};

// Exclui uma escola pelo ID
exports.deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await School.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Escola não encontrada" });
    }
    res.status(200).json({ message: "Escola excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir escola", error });
  }
};
