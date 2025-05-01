import { useForm } from 'react-hook-form';

const SchoolForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label>Nome da Escola</label>
        <input 
          {...register('name', { required: 'Campo obrigatório' })}
          placeholder="Digite o nome da escola"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      
      <div className="form-group">
        <label>Endereço</label>
        <input 
          {...register('address', { required: 'Campo obrigatório' })}
          placeholder="Digite o endereço completo"
        />
        {errors.address && <span className="error">{errors.address.message}</span>}
      </div>
      
      <button type="submit">Salvar Escola</button>
    </form>
  );
};

export default SchoolForm;