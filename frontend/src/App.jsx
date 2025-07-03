import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Schools from "./pages/Schools";
import Classes from "./pages/Classes";
import About from "./pages/About";

// Layout que inclui a Navbar em todas as rotas protegidas
function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de login (não protegida) */}
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />

        {/* Rotas protegidas com layout */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/sobre" element={<About />} />
        </Route>

        {/* Redirecionamento para home caso rota não encontrada */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;