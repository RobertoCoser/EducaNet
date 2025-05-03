const express = require('express');
const router = express.Router();
const schoolsController = require('../controllers/schoolsController');

// Rota para listar todas as escolas
router.get('/', schoolsController.getAllSchools);

// Rota para criar uma nova escola
router.post('/', schoolsController.createSchool);

// Rota para atualizar uma escola
router.put('/:id', schoolsController.updateSchool);

// Rota para excluir uma escola
router.delete('/:id', schoolsController.deleteSchool);

module.exports = router;