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
  
  // Estados para o formulário
  const [showForm, setShowForm] = useState(false);
  const [currentTurma, setCurrentTurma] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    ano: '',
    escolaId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const escolaSelecionada = escolas.find(e => e.id === parseInt(formData.escolaId));
    const turmaData = {
      ...formData,
      escolaNome: escolaSelecionada?.name || "Escola não encontrada"
    };

    if (currentTurma) {
      setTurmas(turmas.map(t => 
        t.id === currentTurma.id ? { ...t, ...turmaData } : t
      ));
    } else {
      setTurmas([...turmas, { ...turmaData, id: Date.now() }]);
    }
    
    resetForm();
  };

  const handleEdit = (turma) => {
    setCurrentTurma(turma);
    setFormData({
      nome: turma.nome,
      ano: turma.ano,
      escolaId: turma.escolaId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTurmas(turmas.filter(t => t.id !== id));
    if (currentTurma?.id === id) resetForm();
  };

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
      <div className="page-header">
        <h1 className="page-title">Turmas</h1>
        <button 
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancelar' : currentTurma ? 'Cancelar Edição' : 'Adicionar Turma'}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nome da Turma*</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ex: 3º Ano A"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ano*</label>
                <select
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione o ano</option>
                  {[1, 2, 3, 4, 5].map(ano => (
                    <option key={ano} value={ano}>{ano}º Ano</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Escola*</label>
                <select
                  name="escolaId"
                  value={formData.escolaId}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione a escola</option>
                  {escolas.map(escola => (
                    <option key={escola.id} value={escola.id}>{escola.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-footer">
              {currentTurma && (
                <button 
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(currentTurma.id)}
                >
                  Excluir Turma
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
                  {currentTurma ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Lista de turmas cadastradas */}
      <div className="section">
        <h2 className="section-title">Turmas Cadastradas</h2>
        
        {turmas.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma turma cadastrada ainda.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Adicionar Turma
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {turmas.map(turma => (
              <div key={turma.id} className="card school-card">
                <div className="card-content">
                  <h3>{turma.nome}</h3>
                  <div className="card-details">
                    <p><span className="detail-label">Ano:</span> {turma.ano}º</p>
                    <p><span className="detail-label">Escola:</span> {turma.escolaNome}</p>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleEdit(turma)}
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
                    onClick={() => handleDelete(turma.id)}
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