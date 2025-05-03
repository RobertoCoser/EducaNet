import { useState } from 'react';
import StudentForm from '../components/StudentForm';

const Students = () => {
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
  
  const [currentAluno, setCurrentAluno] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data) => {
    const turmaSelecionada = turmas.find(t => t.id === parseInt(data.turmaId));
    
    const alunoData = {
      ...data,
      turmaNome: turmaSelecionada?.nome || "Turma não encontrada"
    };

    if (isEditing) {
      setAlunos(alunos.map(a => 
        a.id === currentAluno.id ? { ...a, ...alunoData } : a
      ));
    } else {
      setAlunos([...alunos, { ...alunoData, id: Date.now() }]);
    }
    setCurrentAluno(null);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setAlunos(alunos.filter(a => a.id !== id));
    setCurrentAluno(null);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        {currentAluno ? (isEditing ? 'Editar Aluno' : 'Novo Aluno') : 'Alunos'}
      </h1>

      {currentAluno ? (
        <StudentForm
          turmas={turmas}
          initialData={currentAluno}
          onSubmit={handleSubmit}
          onDelete={() => handleDelete(currentAluno.id)}
          onCancel={() => setCurrentAluno(null)}
          isEditing={isEditing}
        />
      ) : (
        <>
          <button
            onClick={() => {
              setCurrentAluno({ 
                nome: '', 
                nascimento: '', 
                cpf: '', 
                turmaId: '' 
              });
              setIsEditing(false);
            }}
            className="btn-form btn-form-primary"
          >
            Adicionar Aluno
          </button>

          <div className="table-container mt-4">
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
                    <td>{aluno.cpf}</td>
                    <td>{new Date(aluno.nascimento).toLocaleDateString()}</td>
                    <td>{aluno.turmaNome}</td>
                    <td>
                      <div className="item-actions">
                        <button
                          onClick={() => {
                            setCurrentAluno(aluno);
                            setIsEditing(true);
                          }}
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
        </>
      )}
    </div>
  );
};

export default Students;