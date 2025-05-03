const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
  },
  escolaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School', // Relaciona com o modelo de Escolas
    required: true,
  },
}, {
  timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Class', ClassSchema);