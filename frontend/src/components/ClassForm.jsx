import { useForm } from 'react-hook-form';

const ClassForm = ({ 
  escolas, 
  initialData, 
  onSubmit, 
  onDelete, 
  onCancel,
  isEditing = false 
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label>Nome da Turma*</label>
        <input 
          {...register('nome', { required: 'Campo obrigatório' })}
        />
      </div>

      <div className="form-group">
        <label>Ano/Série*</label>
        <input
          type="number"
          {...register('ano', { required: 'Campo obrigatório' })}
        />
      </div>

      <div className="form-group">
        <label>Escola*</label>
        <select
          {...register('escolaId', { required: 'Selecione uma escola' })}
        >
          <option value="">Selecione uma escola</option>
          {escolas.map(escola => (
            <option key={escola.id} value={escola.id}>
              {escola.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        {isEditing && (
          <button 
            type="button" 
            className="btn-form btn-danger"
            onClick={onDelete}
          >
            Excluir Turma
          </button>
        )}
        
        <button 
          type="button" 
          className="btn-form btn-form-secondary"
          onClick={() => {
            reset();
            onCancel?.();
          }}
        >
          Cancelar
        </button>
        
        <button 
          type="submit" 
          className="btn-form btn-form-primary"
        >
          {isEditing ? 'Atualizar Turma' : 'Cadastrar Turma'}
        </button>
      </div>
    </form>
  );
};

export default ClassForm;