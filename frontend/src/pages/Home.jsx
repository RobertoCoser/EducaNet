import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  return (
    <main className="home-modern">
      <section className="welcome">
        <h1>Bem-vindo ao <span>EducaNet</span></h1>
        <p>Gerencie suas escolas, turmas e alunos de forma simples e eficiente.</p>
      </section>

      <section className="modules-grid">
        <Link to="/escolas" className="module-card">
          <div className="icon">🏫</div>
          <h3>Escolas</h3>
          <p>Visualize e cadastre escolas.</p>
        </Link>

        <Link to="/turmas" className="module-card">
          <div className="icon">📚</div>
          <h3>Turmas</h3>
          <p>Gerencie as turmas das escolas.</p>
        </Link>

        <Link to="/alunos" className="module-card">
          <div className="icon">👩‍🎓</div>
          <h3>Alunos</h3>
          <p>Controle os dados de matrícula dos alunos.</p>
        </Link>
      </section>
    </main>
  );
};

export default Home;
