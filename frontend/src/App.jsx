import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Schools from './pages/Schools';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/escolas" element={<Schools />} />
            <Route path="/sobre" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;