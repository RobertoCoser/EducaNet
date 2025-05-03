import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [alunos] = useState([
    { id: 1, nome: "Ana Silva", turma: "3º Ano A", escola: "Escola Municipal A" },
    { id: 2, nome: "Carlos Oliveira", turma: "2º Ano B", escola: "Colégio Estadual B" },
    { id: 3, nome: "Mariana Santos", turma: "3º Ano A", escola: "Escola Municipal A" }
  ]);

  const [escolas] = useState([
    { id: 1, name: "Escola Municipal A", address: "Rua A, 123" },
    { id: 2, name: "Colégio Estadual B", address: "Av. B, 456" }
  ]);

  const [turmas] = useState([
    { id: 1, nome: "3º Ano A", escolaId: 1 },
    { id: 2, nome: "2º Ano B", escolaId: 2 }
  ]);

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="page-title">Bem-vindo ao EducaNet</h1>
        <p className="page-subtitle">Sistema de Gestão Escolar</p>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <h3>Escolas Cadastradas</h3>
          <p className="count">{escolas.length}</p>
          <Link to="/escolas" className="btn-link">Ver escolas</Link>
        </div>
        
        <div className="stat-card">
          <h3>Turmas Ativas</h3>
          <p className="count">{turmas.length}</p>
          <Link to="/turmas" className="btn-link">Ver turmas</Link>
        </div>
        
        <div className="stat-card">
          <h3>Alunos Matriculados</h3>
          <p className="count">{alunos.length}</p>
          <Link to="/alunos" className="btn-link">Ver alunos</Link>
        </div>
      </div>

      <div className="recent-students">
        <div className="section-header">
          <h2>Alunos Recentes</h2>
          <Link to="/alunos" className="view-all">Ver todos</Link>
        </div>
        
        <div className="students-list">
          {alunos.slice(0, 3).map(aluno => (
            <div key={aluno.id} className="student-card">
              <div className="student-avatar">
                {aluno.nome.charAt(0)}
              </div>
              <div className="student-info">
                <h3>{aluno.nome}</h3>
                <p className="student-class">{aluno.turma}</p>
                <p className="student-school">{aluno.escola}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Ações Rápidas</h2>
        <div className="action-buttons">
          <Link to="/alunos/novo" className="action-btn primary">
            <span className="icon">+</span>
            <span>Matricular Aluno</span>
          </Link>
          
          <Link to="/turmas/nova" className="action-btn secondary">
            <span className="icon">+</span>
            <span>Criar Turma</span>
          </Link>
          
          <Link to="/escolas/nova" className="action-btn tertiary">
            <span className="icon">+</span>
            <span>Cadastrar Escola</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;