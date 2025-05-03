import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav>
      <ul className="nav-left">
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/escolas" className={isActive('/escolas')}>Escolas</Link></li>
        <li><Link to="/turmas" className={isActive('/turmas')}>Turmas</Link></li>
        <li><Link to="/alunos" className={isActive('/alunos')}>Alunos</Link></li>
      </ul>
      <ul className="nav-right">
        <li><Link to="/sobre" className={isActive('/sobre')}>Sobre</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;