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
      setClasses(response.data); // Atualiza o estado com as turmas retornadas
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
              <div key={classItem.id} className="card class-card">
                <div className="card-content">
                  <h3>{classItem.nome}</h3> {/* Altere "name" para "nome" */}
                  <div className="card-details">
                    <p><span className="detail-label">Ano:</span> {classItem.ano}</p> {/* Altere "year" para "ano" */}
                    <p>
                      <span className="detail-label">Escola:</span> 
                      {classItem.escolaId?.name || 'N/A'} {/* Exibe o nome da escola */}
                    </p>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleShowForm(classItem)}
                    className="btn-action btn-edit"
                    aria-label="Editar"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(classItem.id)}
                    className="btn-action btn-delete"
                    aria-label="Excluir"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 6h18" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2"/>
                    </svg>
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