import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="home-modern">
      <section className="welcome">
        <h1>Bem-vindo ao <span className="text-primary">EducaNet</span></h1>
        <p className="subtitle">Sistema completo de gestão escolar</p>
      </section>

      <section className="cards-wrapper">
        <div className="cards-grid">
          <Link to="/escolas" className="card-expanded">
            <div className="icon-wrapper">
              <span className="icon">🏫</span>
            </div>
            <h3>Escolas</h3>
            <p>Gerencie todas as instituições de ensino cadastradas</p>
            <span className="link-indicator">
              Acessar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>

          <Link to="/turmas" className="card-expanded">
            <div className="icon-wrapper">
              <span className="icon">📚</span>
            </div>
            <h3>Turmas</h3>
            <p>Controle as turmas e suas configurações</p>
            <span className="link-indicator">
              Acessar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>

          <Link to="/alunos" className="card-expanded">
            <div className="icon-wrapper">
              <span className="icon">👩‍🎓</span>
            </div>
            <h3>Alunos</h3>
            <p>Gerencie os dados dos estudantes</p>
            <span className="link-indicator">
              Acessar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;