import { useState } from 'react';

const Classes = () => {
  // Dados de exemplo
  const [escolas] = useState([
    { id: 1, name: "Escola Municipal A" },
    { id: 2, name: "Colégio Estadual B" }
  ]);
  
  const [turmas, setTurmas] = useState([
    { id: 1, nome: "3º Ano A", ano: 3, escolaId: 1, escolaNome: "Escola Municipal A" },
    { id: 2, nome: "2º Ano B", ano: 2, escolaId: 2, escolaNome: "Colégio Estadual B" }
  ]);
  
  // Estados para o formulário inline
  const [showForm, setShowForm] = useState(false);
  const [currentTurma, setCurrentTurma] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    ano: '',
    escolaId: ''
  });

  // Manipulador de mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manipulador para submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const escolaSelecionada = escolas.find(e => e.id === parseInt(formData.escolaId));
    const turmaData = {
      ...formData,
      escolaNome: escolaSelecionada?.name || "Escola não encontrada"
    };

    if (currentTurma) {
      // Atualiza turma existente
      setTurmas(turmas.map(t => 
        t.id === currentTurma.id ? { ...t, ...turmaData } : t
      ));
    } else {
      // Adiciona nova turma
      setTurmas([...turmas, { ...turmaData, id: Date.now() }]);
    }
    
    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (turma) => {
    setCurrentTurma(turma);
    setFormData({
      nome: turma.nome,
      ano: turma.ano,
      escolaId: turma.escolaId.toString()
    });
    setShowForm(true);
  };

  // Manipulador para deletar turma
  const handleDelete = (id) => {
    setTurmas(turmas.filter(t => t.id !== id));
    if (currentTurma?.id === id) resetForm();
  };

  // Reseta o formulário
  const resetForm = () => {
    setShowForm(false);
    setCurrentTurma(null);
    setFormData({
      nome: '',
      ano: '',
      escolaId: ''
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Turmas</h1>

      {/* Formulário Inline */}
      <div className="inline-form">
        <div className="inline-form-header">
          <h2 className="inline-form-title">
            {currentTurma ? 'Editar Turma' : 'Adicionar Nova Turma'}
          </h2>
          <button 
            className={`inline-form-toggle ${showForm ? 'active' : ''}`}
            onClick={() => {
              if (showForm) resetForm();
              else setShowForm(true);
            }}
          >
            {currentTurma ? 'Cancelar Edição' : showForm ? 'Cancelar' : 'Adicionar Turma'}
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
            <label htmlFor="nome">Nome da Turma*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: 3º Ano A"
            />
          </div>

          <div className="compact-form-group">
            <label htmlFor="ano">Ano*</label>
            <select
              id="ano"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o ano</option>
              {[1, 2, 3, 4, 5].map(ano => (
                <option key={ano} value={ano}>{ano}º Ano</option>
              ))}
            </select>
          </div>

          <div className="compact-form-group">
            <label htmlFor="escolaId">Escola*</label>
            <select
              id="escolaId"
              name="escolaId"
              value={formData.escolaId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a escola</option>
              {escolas.map(escola => (
                <option key={escola.id} value={escola.id}>{escola.name}</option>
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
              {currentTurma ? 'Atualizar Turma' : 'Salvar Turma'}
            </button>
            {currentTurma && (
              <button 
                type="button"
                className="btn-compact btn-form-danger"
                onClick={() => handleDelete(currentTurma.id)}
              >
                Excluir Turma
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de turmas cadastradas */}
      <div className="items-list mt-8">
        <h2 className="section-title">Turmas Cadastradas</h2>
        
        {turmas.length === 0 ? (
          <p className="text-gray-500">Nenhuma turma cadastrada ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {turmas.map(turma => (
              <div key={turma.id} className="item-card">
                <div className="item-card-body">
                  <h3>{turma.nome}</h3>
                  <p className="text-gray-600">Ano: {turma.ano}º</p>
                  <p className="text-gray-600">Escola: {turma.escolaNome}</p>
                  <div className="item-actions">
                    <button
                      onClick={() => handleEdit(turma)}
                      className="btn-form btn-edit btn-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(turma.id)}
                      className="btn-form btn-danger btn-sm"
                    >
                      Excluir
                    </button>
                  </div>
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