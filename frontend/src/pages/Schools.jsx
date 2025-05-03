import { useState } from 'react';
import SchoolForm from '../components/SchoolForm';

const Schools = () => {
  // Estado para gerenciar as escolas
  const [schools, setSchools] = useState([
    { id: 1, name: "Escola Municipal A", address: "Rua A, 123" },
    { id: 2, name: "Colégio Estadual B", address: "Av. B, 456" }
  ]);
  
  // Estado para controle do formulário
  const [currentSchool, setCurrentSchool] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Manipulador para submit do formulário
  const handleSubmit = (data) => {
    if (isEditing) {
      // Atualiza escola existente
      setSchools(schools.map(s => 
        s.id === currentSchool.id ? { ...s, ...data } : s
      ));
    } else {
      // Adiciona nova escola
      setSchools([...schools, { ...data, id: Date.now() }]);
    }
    setCurrentSchool(null);
    setIsEditing(false);
  };

  // Manipulador para deletar escola
  const handleDelete = (id) => {
    setSchools(schools.filter(s => s.id !== id));
    setCurrentSchool(null);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        {currentSchool ? (isEditing ? 'Editar Escola' : 'Nova Escola') : 'Escolas'}
      </h1>

      {/* Renderiza o formulário ou a lista de escolas */}
      {currentSchool ? (
        <SchoolForm
          initialData={currentSchool}
          onSubmit={handleSubmit}
          onDelete={currentSchool.id ? () => handleDelete(currentSchool.id) : null}
          onCancel={() => setCurrentSchool(null)}
          isEditing={isEditing}
        />
      ) : (
        <>
          <button
            onClick={() => {
              setCurrentSchool({ name: '', address: '' });
              setIsEditing(false);
            }}
            className="btn-form btn-form-primary"
          >
            Adicionar Escola
          </button>

          {/* Lista de escolas */}
          <div className="items-list mt-4">
            {schools.map(school => (
              <div key={school.id} className="item-card">
                <div className="item-card-body">
                  <h3>{school.name}</h3>
                  <p>{school.address}</p>
                  <div className="item-actions">
                    <button
                      onClick={() => {
                        setCurrentSchool(school);
                        setIsEditing(true);
                      }}
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
        </>
      )}
    </div>
  );
};

export default Schools;