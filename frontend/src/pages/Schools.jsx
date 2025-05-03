import { useState } from 'react';

const Schools = () => {
  // Estado para gerenciar as escolas
  const [schools, setSchools] = useState([
    { id: 1, name: "Escola Municipal A", address: "Rua A, 123", phone: "(11) 1234-5678" },
    { id: 2, name: "Colégio Estadual B", address: "Av. B, 456", phone: "(11) 9876-5432" }
  ]);
  
  // Estado para o formulário inline
  const [showForm, setShowForm] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  // Manipulador de mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manipulador para submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentSchool) {
      // Atualiza escola existente
      setSchools(schools.map(s => 
        s.id === currentSchool.id ? { ...s, ...formData } : s
      ));
    } else {
      // Adiciona nova escola
      setSchools([...schools, { ...formData, id: Date.now() }]);
    }
    
    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (school) => {
    setCurrentSchool(school);
    setFormData({
      name: school.name,
      address: school.address,
      phone: school.phone
    });
    setShowForm(true);
  };

  // Manipulador para deletar escola
  const handleDelete = (id) => {
    setSchools(schools.filter(s => s.id !== id));
    if (currentSchool?.id === id) resetForm();
  };

  // Reseta o formulário
  const resetForm = () => {
    setShowForm(false);
    setCurrentSchool(null);
    setFormData({
      name: '',
      address: '',
      phone: ''
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Escolas</h1>
        <button 
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancelar' : currentSchool ? 'Cancelar Edição' : 'Adicionar Escola'}
        </button>
      </div>

      {/* Formulário Inline */}
      {showForm && (
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nome da Escola*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Endereço*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              {currentSchool && (
                <button 
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(currentSchool.id)}
                >
                  Excluir Escola
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
                  {currentSchool ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </form>
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
              onClick={() => setShowForm(true)}
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
                    <p><span className="detail-label">Telefone:</span> {school.phone}</p>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleEdit(school)}
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
                    onClick={() => handleDelete(school.id)}
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

export default Schools;