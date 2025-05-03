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
      <h1 className="page-title">Escolas</h1>

      {/* Formulário Inline */}
      <div className="inline-form">
        <div className="inline-form-header">
          <h2 className="inline-form-title">
            {currentSchool ? 'Editar Escola' : 'Adicionar Nova Escola'}
          </h2>
          <button 
            className={`inline-form-toggle ${showForm ? 'active' : ''}`}
            onClick={() => {
              if (showForm) resetForm();
              else setShowForm(true);
            }}
          >
            {currentSchool ? 'Cancelar Edição' : showForm ? 'Cancelar' : 'Adicionar Escola'}
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
            <label htmlFor="name">Nome da Escola*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="compact-form-group">
            <label htmlFor="address">Endereço*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="compact-form-group">
            <label htmlFor="phone">Telefone*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
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
              {currentSchool ? 'Atualizar Escola' : 'Salvar Escola'}
            </button>
            {currentSchool && (
              <button 
                type="button"
                className="btn-compact btn-form-danger"
                onClick={() => handleDelete(currentSchool.id)}
              >
                Excluir Escola
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de escolas cadastradas */}
      <div className="items-list mt-8">
        <h2 className="section-title">Escolas Cadastradas</h2>
        
        {schools.length === 0 ? (
          <p className="text-gray-500">Nenhuma escola cadastrada ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map(school => (
              <div key={school.id} className="item-card">
                <div className="item-card-body">
                  <h3>{school.name}</h3>
                  <p className="text-gray-600">{school.address}</p>
                  <p className="text-gray-600">{school.phone}</p>
                  <div className="item-actions">
                    <button
                      onClick={() => handleEdit(school)}
                      className="btn-form btn-edit btn-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(school.id)}
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

export default Schools;