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
      cpf: "123.456.789-00", 
      turmaId: 1,
      turmaNome: "3º Ano A"
    }
  ]);
  
  // Estados para o formulário inline
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
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Manipulador de mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Formatação do CPF enquanto digita
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
      // Atualiza aluno existente
      setAlunos(alunos.map(a => 
        a.id === currentAluno.id ? { ...a, ...alunoData } : a
      ));
    } else {
      // Adiciona novo aluno
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
      <h1 className="page-title">Alunos</h1>

      {/* Formulário Inline */}
      <div className="inline-form">
        <div className="inline-form-header">
          <h2 className="inline-form-title">
            {currentAluno ? 'Editar Aluno' : 'Adicionar Novo Aluno'}
          </h2>
          <button 
            className={`inline-form-toggle ${showForm ? 'active' : ''}`}
            onClick={() => {
              if (showForm) resetForm();
              else setShowForm(true);
            }}
          >
            {currentAluno ? 'Cancelar Edição' : showForm ? 'Cancelar' : 'Adicionar Aluno'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form 
          className={`inline-form-content ${showForm ? 'active' : ''}`}
          onSubmit={handleSubmit}
        >
          <div className="compact-form-group">
            <label htmlFor="nome">Nome Completo*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: João da Silva"
            />
          </div>

          <div className="compact-form-group">
            <label htmlFor="cpf">CPF*</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              placeholder="000.000.000-00"
              maxLength="14"
            />
          </div>

          <div className="compact-form-group">
            <label htmlFor="nascimento">Data de Nascimento*</label>
            <input
              type="date"
              id="nascimento"
              name="nascimento"
              value={formData.nascimento}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="compact-form-group">
            <label htmlFor="turmaId">Turma*</label>
            <select
              id="turmaId"
              name="turmaId"
              value={formData.turmaId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a turma</option>
              {turmas.map(turma => (
                <option key={turma.id} value={turma.id}>{turma.nome} - {turma.escolaNome}</option>
              ))}
            </select>
          </div>

          <div className="form-actions-compact">
            <button 
              type="button" 
              className="btn-compact btn-form-secondary"
              onClick={resetForm}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-compact btn-form-primary"
            >
              {currentAluno ? 'Atualizar Aluno' : 'Salvar Aluno'}
            </button>
            {currentAluno && (
              <button 
                type="button"
                className="btn-compact btn-form-danger"
                onClick={() => handleDelete(currentAluno.id)}
              >
                Excluir Aluno
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabela de alunos cadastrados */}
      <div className="items-list mt-8">
        <h2 className="section-title">Alunos Cadastrados</h2>
        
        {alunos.length === 0 ? (
          <p className="text-gray-500">Nenhum aluno cadastrado ainda.</p>
        ) : (
          <div className="table-responsive">
            <table className="students-table">
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
                      <div className="item-actions">
                        <button
                          onClick={() => handleEdit(aluno)}
                          className="btn-form btn-edit btn-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(aluno.id)}
                          className="btn-form btn-danger btn-sm"
                        >
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