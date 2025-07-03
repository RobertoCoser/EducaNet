const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sequelize = require("../database");

const JWT_SECRET = "sua_chave_secreta"; 

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Cadastro de admin ou usuário comum
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifica se já existe um usuário/admin com esse e-mail
    const existing = await Admin.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "E-mail já cadastrado." });
    }

    // Cria hash da senha
    const hash = await bcrypt.hash(password, 10);

    // Cria novo admin (ou usuário, caso mude o model)
    const admin = await Admin.create({ name, email, password: hash });

    res.status(201).json({ id: admin.id, name: admin.name, email: admin.email });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};