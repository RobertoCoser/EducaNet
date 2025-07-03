import React, { useState, useEffect } from 'react';
import api from '../api/index'; // Instância do Axios
import StudentForm from '../components/StudentForm';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Busca os alunos do backend
  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data); // Atualiza o estado com os alunos retornados
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
              <div key={student.id} className="card student-card">
                <div className="card-content">
                  <h3>{student.nome}</h3> {/* Exibe o nome do aluno */}
                  <div className="card-details">
                    <p><span className="detail-label">CPF:</span> {student.cpf}</p>
                    <p><span className="detail-label">Data de Nascimento:</span> {student.dataNascimento}</p>
                    <p><span className="detail-label">Turma:</span> {student.turmaId?.nome || 'N/A'}</p> {/* Exibe o nome da turma */}
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleShowForm(student)}
                    className="btn-action btn-edit"
                    aria-label="Editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
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

export default Students;