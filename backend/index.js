const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const schoolRoutes = require('./routes/schools');
const classRoutes = require('./routes/classes');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/educanet', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas de Escolas
app.use('/api/schools', schoolRoutes);

// Rotas de Turmas
app.use('/api/classes', classRoutes);

// Rotas de Alunos
app.use('/api/students', studentRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});