import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
          <Link to="/schools" className={`nav-link ${isActive('/schools')}`}>
            Escolas
          </Link>
        </li>
        <li>
          <Link to="/classes" className={`nav-link ${isActive('/classes')}`}>
            Turmas
          </Link>
        </li>
        <li>
          <Link to="/students" className={`nav-link ${isActive('/students')}`}>
            Alunos
          </Link>
        </li>
      </ul>

      {/* Links secundários (direita) */}
      <ul className="nav-links nav-right">
        <li>
          <button
            onClick={handleLogout}
            className="nav-link nav-logout"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4em'
            }}
            title="Sair"
          >
            {/* Ícone de logout */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sair
          </button>
        </li>
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