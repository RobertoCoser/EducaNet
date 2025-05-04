const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true, // CPF deve ser único
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  turmaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class', // Relaciona com o modelo de Turmas
    required: true,
  },
}, {
  timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Student', StudentSchema);