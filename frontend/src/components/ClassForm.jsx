import React, { useState, useEffect } from 'react';
import api from '../api'; // Instância do Axios

const ClassForm = ({ currentClass, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    escolaId: '' // Campo para armazenar a escola selecionada
  });

  const [schools, setSchools] = useState([]); // Lista de escolas disponíveis

  // Busca as escolas do backend
  const fetchSchools = async () => {
    try {
      const response = await api.get('/schools'); // Endpoint para buscar escolas
      setSchools(response.data);
    } catch (error) {
      console.error('Erro ao buscar escolas:', error);
    }
  };

  useEffect(() => {
    fetchSchools();

    if (currentClass) {
      setFormData({
        name: currentClass.name,
        year: currentClass.year,
        escolaId: currentClass.escolaId || ''
      });
    }
  }, [currentClass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentClass) {
        await api.put(`/classes/${currentClass._id}`, formData);
      } else {
        await api.post('/classes', formData);
      }
      onSave(); // Atualiza a lista de turmas
      onClose(); // Fecha o formulário
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Nome da Turma*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Ano*</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Escola*</label>
          <select
            name="escolaId"
            value={formData.escolaId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" disabled>Selecione uma escola</option>
            {schools.map(school => (
              <option key={school._id} value={school._id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-footer">
        <button 
          type="button" 
          className="btn btn-outline"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          {currentClass ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default ClassForm;