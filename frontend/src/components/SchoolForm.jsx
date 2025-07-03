import React, { useState, useEffect } from 'react';
import api from '../api/index'; // Instância do Axios

const SchoolForm = ({ currentSchool, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });

  useEffect(() => {
    if (currentSchool) {
      setFormData({
        name: currentSchool.name,
        address: currentSchool.address
      });
    }
  }, [currentSchool]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSchool) {
        await api.put(`/schools/${currentSchool.id}`, formData);
      } else {
        await api.post('/schools', formData);
      }
      onSave();
      onClose(); // Fecha o formulário após salvar
    } catch (error) {
      console.error('Erro ao salvar escola:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Nome da Escola*</label>
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
          <label className="form-label">Endereço*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="form-footer">
        <button 
          type="button" 
          className="btn btn-outline"
          onClick={onClose} // Fecha o formulário ao clicar em "Cancelar"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          {currentSchool ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default SchoolForm;