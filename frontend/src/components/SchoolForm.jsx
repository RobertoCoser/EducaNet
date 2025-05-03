const SchoolForm = ({ 
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
        <label>Nome da Escola:</label>
        <input {...register('name', { required: true })} />
      </div>
      
      <div className="form-group">
        <label>Endereço:</label>
        <input {...register('address', { required: true })} />
      </div>
      
      <div className="form-actions">
        {isEditing && (
          <button 
            type="button" 
            className="btn-form btn-danger"
            onClick={onDelete}
          >
            Excluir Escola
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
          {isEditing ? 'Atualizar Escola' : 'Cadastrar Escola'}
        </button>
      </div>
    </form>
  );
};

export default SchoolForm;