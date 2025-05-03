import { useState } from 'react';

const Students = () => {
  // Dados de exemplo
  const [turmas] = useState([
    { id: 1, nome: "3º Ano A", escolaNome: "Escola Municipal A" },
    { id: 2, nome: "2º Ano B", escolaNome: "Colégio Estadual B" }
  ]);
  
  const [alunos, setAlunos] = useState([
    { 
      id: 1, 
      nome: "Ana Silva", 
      nascimento: "2010-05-15", 
      cpf: "12345678900", 
      turmaId: 1,
      turmaNome: "3º Ano A"
    }
  ]);
  
  // Estados para o formulário
  const [showForm, setShowForm] = useState(false);
  const [currentAluno, setCurrentAluno] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    cpf: '',
    turmaId: ''
  });

  // Formata CPF
  const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Manipulador de mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const cleanedValue = value.replace(/\D/g, '');
      let formattedValue = cleanedValue;
      
      if (cleanedValue.length > 3) {
        formattedValue = `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
      }
      if (cleanedValue.length > 6) {
        formattedValue = `${formattedValue.slice(0, 7)}.${formattedValue.slice(7)}`;
      }
      if (cleanedValue.length > 9) {
        formattedValue = `${formattedValue.slice(0, 11)}-${formattedValue.slice(11)}`;
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue.slice(0, 14) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Manipulador para submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const turmaSelecionada = turmas.find(t => t.id === parseInt(formData.turmaId));
    const alunoData = {
      ...formData,
      turmaNome: turmaSelecionada?.nome || "Turma não encontrada",
      cpf: formData.cpf.replace(/\D/g, '') // Remove formatação do CPF para armazenar
    };

    if (currentAluno) {
      setAlunos(alunos.map(a => 
        a.id === currentAluno.id ? { ...a, ...alunoData } : a
      ));
    } else {
      setAlunos([...alunos, { ...alunoData, id: Date.now() }]);
    }
    
    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (aluno) => {
    setCurrentAluno(aluno);
    setFormData({
      nome: aluno.nome,
      nascimento: aluno.nascimento,
      cpf: formatCPF(aluno.cpf),
      turmaId: aluno.turmaId.toString()
    });
    setShowForm(true);
  };

  // Manipulador para deletar aluno
  const handleDelete = (id) => {
    setAlunos(alunos.filter(a => a.id !== id));
    if (currentAluno?.id === id) resetForm();
  };

  // Reseta o formulário
  const resetForm = () => {
    setShowForm(false);
    setCurrentAluno(null);
    setFormData({
      nome: '',
      nascimento: '',
      cpf: '',
      turmaId: ''
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Alunos</h1>
        <button 
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancelar' : currentAluno ? 'Cancelar Edição' : 'Adicionar Aluno'}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nome Completo*</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ex: João da Silva"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">CPF*</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="000.000.000-00"
                  maxLength="14"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Data de Nascimento*</label>
                <input
                  type="date"
                  name="nascimento"
                  value={formData.nascimento}
                  onChange={handleChange}
                  className="form-control"
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Turma*</label>
                <select
                  name="turmaId"
                  value={formData.turmaId}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione a turma</option>
                  {turmas.map(turma => (
                    <option key={turma.id} value={turma.id}>
                      {turma.nome} - {turma.escolaNome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-footer">
              {currentAluno && (
                <button 
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(currentAluno.id)}
                >
                  Excluir Aluno
                </button>
              )}
              <div className="form-footer-right">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  {currentAluno ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Lista de alunos cadastrados */}
      <div className="section">
        <h2 className="section-title">Alunos Cadastrados</h2>
        
        {alunos.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum aluno cadastrado ainda.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Adicionar Aluno
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Nascimento</th>
                  <th>Turma</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td>{formatCPF(aluno.cpf)}</td>
                    <td>{new Date(aluno.nascimento).toLocaleDateString('pt-BR')}</td>
                    <td>{aluno.turmaNome}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(aluno)}
                          className="btn-action btn-edit"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                          </svg>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(aluno.id)}
                          className="btn-action btn-delete"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 6h18" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2"/>
                          </svg>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;