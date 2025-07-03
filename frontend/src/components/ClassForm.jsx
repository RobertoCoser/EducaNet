import React, { useState, useEffect } from 'react';
import api from '../api/index'; 

const ClassForm = ({ currentClass, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: '', 
    ano: '',
    escolaId: '' 
  });

  const [schools, setSchools] = useState([]); 

  // Busca as escolas do backend
  const fetchSchools = async () => {
    try {
      const response = await api.get('/schools'); 
      setSchools(response.data);
    } catch (error) {
      console.error('Erro ao buscar escolas:', error);
    }
  };

  useEffect(() => {
    fetchSchools();

    if (currentClass) {
      setFormData({
        nome: currentClass.nome, 
        ano: currentClass.ano,   
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
        await api.put(`/classes/${currentClass.id}`, formData);
      } else {
        await api.post('/classes', formData);
      }
      onSave(); 
      onClose(); 
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
            name="nome" 
            value={formData.nome} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Ano*</label>
          <input
            type="number"
            name="ano" 
            value={formData.ano} 
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
              <option key={school.id} value={school.id}>
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