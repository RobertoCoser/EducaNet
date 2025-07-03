import React, { useState, useEffect } from 'react';
import api from '../api/index'; // Instância do Axios

const StudentForm = ({ currentStudent, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    turmaId: '',
  });

  const [classes, setClasses] = useState([]); // Para armazenar as turmas disponíveis

  useEffect(() => {
    // Carrega as turmas disponíveis para o dropdown
    const fetchClasses = async () => {
      try {
        const response = await api.get('/classes'); // Endpoint que retorna as turmas
        setClasses(response.data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    fetchClasses();

    if (currentStudent) {
      setFormData({
        nome: currentStudent.nome,
        cpf: currentStudent.cpf,
        dataNascimento: currentStudent.dataNascimento,
        turmaId: currentStudent.turmaId,
      });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentStudent) {
        await api.put(`/students/${currentStudent.id}`, formData);
      } else {
        await api.post('/students', formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Nome do Aluno */}
        <div className="form-group">
          <label className="form-label">Nome do Aluno*</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* CPF */}
        <div className="form-group">
          <label className="form-label">CPF*</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Data de Nascimento */}
        <div className="form-group">
          <label className="form-label">Data de Nascimento*</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Turma */}
        <div className="form-group">
          <label className="form-label">Turma*</label>
          <select
            name="turmaId"
            value={formData.turmaId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" disabled>
              Selecione uma turma
            </option>
            {classes.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
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
          {currentStudent ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;