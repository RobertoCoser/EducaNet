import { useState } from 'react';
import ClassForm from '../components/ClassForm';

const Classes = () => {
  const [escolas] = useState([
    { id: 1, name: "Escola Municipal A" },
    { id: 2, name: "Colégio Estadual B" }
  ]);
  
  const [turmas, setTurmas] = useState([
    { id: 1, nome: "3º Ano A", ano: 3, escolaId: 1, escolaNome: "Escola Municipal A" },
    { id: 2, nome: "2º Ano B", ano: 2, escolaId: 2, escolaNome: "Colégio Estadual B" }
  ]);
  
  const [currentTurma, setCurrentTurma] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data) => {
    const escolaSelecionada = escolas.find(e => e.id === parseInt(data.escolaId));
    
    const turmaData = {
      ...data,
      escolaNome: escolaSelecionada?.name || "Escola não encontrada"
    };

    if (isEditing) {
      setTurmas(turmas.map(t => 
        t.id === currentTurma.id ? { ...t, ...turmaData } : t
      ));
    } else {
      setTurmas([...turmas, { ...turmaData, id: Date.now() }]);
    }
    setCurrentTurma(null);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setTurmas(turmas.filter(t => t.id !== id));
    setCurrentTurma(null);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        {currentTurma ? (isEditing ? 'Editar Turma' : 'Nova Turma') : 'Turmas'}
      </h1>

      {currentTurma ? (
        <ClassForm
          escolas={escolas}
          initialData={currentTurma}
          onSubmit={handleSubmit}
          onDelete={() => handleDelete(currentTurma.id)}
          onCancel={() => setCurrentTurma(null)}
          isEditing={isEditing}
        />
      ) : (
        <>
          <button
            onClick={() => {
              setCurrentTurma({ nome: '', ano: '', escolaId: '' });
              setIsEditing(false);
            }}
            className="btn-form btn-form-primary"
          >
            Adicionar Turma
          </button>

          <div className="items-list mt-4">
            {turmas.map(turma => (
              <div key={turma.id} className="item-card">
                <div className="item-card-body">
                  <h3>{turma.nome}</h3>
                  <p>Ano: {turma.ano}</p>
                  <p>Escola: {turma.escolaNome}</p>
                  <div className="item-actions">
                    <button
                      onClick={() => {
                        setCurrentTurma(turma);
                        setIsEditing(true);
                      }}
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
        </>
      )}
    </div>
  );
};

export default Classes;