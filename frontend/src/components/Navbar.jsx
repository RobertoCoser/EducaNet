import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      {/* Logo/Title */}
      <div className="nav-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L12 15L23 9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 9L12 15L23 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 21V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>EducaNet</span>
      </div>

      {/* Links principais (esquerda) */}
      <ul className="nav-links nav-left">
        <li>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/escolas" className={`nav-link ${isActive('/escolas')}`}>
            Escolas
          </Link>
        </li>
        <li>
          <Link to="/turmas" className={`nav-link ${isActive('/turmas')}`}>
            Turmas
          </Link>
        </li>
        <li>
          <Link to="/alunos" className={`nav-link ${isActive('/alunos')}`}>
            Alunos
          </Link>
        </li>
      </ul>

      {/* Links secundários (direita) */}
      <ul className="nav-links nav-right">
        <li>
          <Link to="/sobre" className={`nav-link ${isActive('/sobre')}`}>
            Sobre
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;