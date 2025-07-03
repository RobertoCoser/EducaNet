import React, { useState, useEffect } from 'react';
import api from '../api/index'; // Instância do Axios
import SchoolForm from '../components/SchoolForm';

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);

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
  }, []);

  // Manipula a exibição do formulário
  const handleShowForm = (school = null) => {
    setCurrentSchool(school);
    setShowForm(true);
  };

  // Manipula o fechamento do formulário
  const handleCloseForm = () => {
    setCurrentSchool(null);
    setShowForm(false);
  };

  // Manipula a exclusão de uma escola
  const handleDelete = async (schoolId) => {
    try {
      await api.delete(`/schools/${schoolId}`);
      fetchSchools(); // Atualiza a lista de escolas após a exclusão
    } catch (error) {
      console.error('Erro ao excluir escola:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Escolas</h1>
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
          {showForm ? 'Cancelar' : 'Adicionar Escola'}
        </button>
      </div>

      {/* Formulário Inline */}
      {showForm && (
        <div className="card form-card">
          <SchoolForm 
            currentSchool={currentSchool}
            onClose={handleCloseForm} // Passa a função de fechamento
            onSave={fetchSchools} // Atualiza as escolas após salvar
          />
        </div>
      )}

      {/* Lista de escolas cadastradas */}
      <div className="section">
        <h2 className="section-title">Escolas Cadastradas</h2>
        
        {schools.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma escola cadastrada ainda.</p>
            <button 
              className="btn btn-primary"
              onClick={() => handleShowForm()}
            >
              Adicionar Escola
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {schools.map(school => (
              <div key={school.id} className="card school-card">
                <div className="card-content">
                  <h3>{school.name}</h3>
                  <div className="card-details">
                    <p><span className="detail-label">Endereço:</span> {school.address}</p>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleShowForm(school)}
                    className="btn-action btn-edit"
                    aria-label="Editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(school.id)}
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

export default Schools;