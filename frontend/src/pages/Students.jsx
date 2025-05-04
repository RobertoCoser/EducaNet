import React, { useState, useEffect } from 'react';
import api from '../api'; // Instância do Axios
import StudentForm from '../components/StudentForm';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Busca os alunos do backend
  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Manipula a exibição do formulário
  const handleShowForm = (student = null) => {
    setCurrentStudent(student);
    setShowForm(true);
  };

  // Manipula o fechamento do formulário
  const handleCloseForm = () => {
    setCurrentStudent(null);
    setShowForm(false);
  };

  // Deleta um aluno
  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Alunos</h1>
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
          {showForm ? 'Cancelar' : 'Adicionar Aluno'}
        </button>
      </div>

      {/* Formulário Inline */}
      {showForm && (
        <div className="card form-card">
          <StudentForm 
            currentStudent={currentStudent}
            onClose={handleCloseForm}
            onSave={fetchStudents}
          />
        </div>
      )}

      {/* Lista de alunos cadastrados */}
      <div className="section">
        <h2 className="section-title">Alunos Cadastrados</h2>
        
        {students.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum aluno cadastrado ainda.</p>
            <button 
              className="btn btn-primary"
              onClick={() => handleShowForm()}
            >
              Adicionar Aluno
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {students.map(student => (
              <div key={student._id} className="card student-card">
                <div className="card-content">
                  <h3>{student.name}</h3>
                  <div className="card-details">
                    <p><span className="detail-label">Idade:</span> {student.age}</p>
                    <p><span className="detail-label">Turma:</span> {student.className}</p>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleShowForm(student)}
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
                    onClick={() => handleDelete(student._id)}
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

export default Students;