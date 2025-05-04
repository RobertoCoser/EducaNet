import React, { useState, useEffect } from 'react';
import api from '../api'; // Instância do Axios
import ClassForm from '../components/ClassForm';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  // Busca as turmas do backend
  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Manipula a exibição do formulário
  const handleShowForm = (classItem = null) => {
    setCurrentClass(classItem);
    setShowForm(true);
  };

  // Manipula o fechamento do formulário
  const handleCloseForm = () => {
    setCurrentClass(null);
    setShowForm(false);
  };

  // Deleta uma turma
  const handleDelete = async (id) => {
    try {
      await api.delete(`/classes/${id}`);
      fetchClasses();
    } catch (error) {
      console.error('Erro ao excluir turma:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Turmas</h1>
        <button 
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            if (showForm) {
              handleCloseForm(); // Fecha o formulário
            } else {
              handleShowForm(); // Abre o formulário
            }
          }}
        >
          {showForm ? 'Cancelar' : 'Adicionar Turma'}
        </button>
      </div>

      {/* Formulário Inline */}
      {showForm && (
        <div className="card form-card">
          <ClassForm 
            currentClass={currentClass}
            onClose={handleCloseForm}
            onSave={fetchClasses}
          />
        </div>
      )}

      {/* Lista de turmas cadastradas */}
      <div className="section">
        <h2 className="section-title">Turmas Cadastradas</h2>
        
        {classes.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma turma cadastrada ainda.</p>
            <button 
              className="btn btn-primary"
              onClick={() => handleShowForm()}
            >
              Adicionar Turma
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {classes.map(classItem => (
              <div key={classItem._id} className="card class-card">
                <div className="card-content">
                  <h3>{classItem.name}</h3>
                  <div className="card-details">
                    <p><span className="detail-label">Ano:</span> {classItem.year}</p>
                    <p><span className="detail-label">Escola:</span> {classItem.escolaName || 'N/A'}</p>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleShowForm(classItem)}
                    className="btn-action btn-edit"
                    aria-label="Editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(classItem._id)}
                    className="btn-action btn-delete"
                    aria-label="Excluir"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;