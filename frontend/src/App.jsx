import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Schools from './pages/Schools';
import Classes from './pages/Classes';
import Students from './pages/Students';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/escolas" element={<Schools />} />
            <Route path="/turmas" element={<Classes />} />
            <Route path="/alunos" element={<Students />} />
            <Route path="/sobre" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;