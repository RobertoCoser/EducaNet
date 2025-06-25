const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

// Rota para listar todos os alunos
router.get("/", studentsController.getAllStudents);

// Rota para criar um novo aluno
router.post("/", studentsController.createStudent);

// Rota para atualizar um aluno pelo ID
router.put("/:id", studentsController.updateStudent);

// Rota para excluir um aluno pelo ID
router.delete("/:id", studentsController.deleteStudent);

module.exports = router;
