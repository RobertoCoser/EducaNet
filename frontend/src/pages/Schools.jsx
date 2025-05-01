import { useState } from 'react';
import SchoolForm from '../components/SchoolForm';

const Schools = () => {
  const [schools, setSchools] = useState([]);
  
  const handleSubmit = (data) => {
    setSchools([...schools, { ...data, id: Date.now() }]);
  };

  return (
    <div>
      <h1 className="page-title">Escolas</h1>
      
      <SchoolForm onSubmit={handleSubmit} />
      
      <div className="schools-list">
        {schools.map(school => (
          <div key={school.id} className="school-item">
            <h3>{school.name}</h3>
            <p>{school.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schools;