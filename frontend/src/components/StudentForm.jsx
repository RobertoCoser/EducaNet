const StudentForm = ({ turmas, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label>Nome Completo*</label>
        <input
          {...register('nome', { required: 'Campo obrigatório' })}
          placeholder="Ex: João da Silva"
        />
        {errors.nome && <span className="error">{errors.nome.message}</span>}
      </div>

      <div className="form-group">
        <label>Data de Nascimento*</label>
        <input
          type="date"
          {...register('nascimento', { required: 'Campo obrigatório' })}
        />
        {errors.nascimento && <span className="error">{errors.nascimento.message}</span>}
      </div>

      <div className="form-group">
        <label>CPF*</label>
        <input
          {...register('cpf', { 
            required: 'Campo obrigatório',
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
              message: 'Formato inválido (XXX.XXX.XXX-XX)'
            }
          })}
          placeholder="000.000.000-00"
        />
        {errors.cpf && <span className="error">{errors.cpf.message}</span>}
      </div>

      <div className="form-group">
        <label>Turma*</label>
        <select
          {...register('turmaId', { required: 'Selecione uma turma' })}
        >
          <option value="">Selecione uma turma...</option>
          {turmas.map(turma => (
            <option key={turma.id} value={turma.id}>
              {turma.nome} - {turma.escolaNome}
            </option>
          ))}
        </select>
        {errors.turmaId && <span className="error">{errors.turmaId.message}</span>}
      </div>

      <div className="btn-form-group">
        <button type="submit" className="btn-form btn-form-primary">
          Matricular Aluno
        </button>
      </div>
    </form>
  );
};

export default StudentForm;