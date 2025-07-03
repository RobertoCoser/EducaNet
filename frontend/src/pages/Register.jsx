import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const illustration = (
  <svg
    width="180"
    height="130"
    viewBox="0 0 410 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", margin: "0 auto 18px auto" }}
  >
    <ellipse cx="205" cy="270" rx="180" ry="25" fill="#e3f2fd" />
    <rect x="90" y="80" width="230" height="120" rx="16" fill="#43a047" />
    <rect x="120" y="115" width="60" height="15" rx="6" fill="#fff" opacity="0.75"/>
    <rect x="120" y="140" width="170" height="10" rx="5" fill="#fff" opacity="0.45"/>
    <rect x="120" y="160" width="110" height="10" rx="5" fill="#fff" opacity="0.45"/>
    <circle cx="310" cy="120" r="22" fill="#fff" opacity="0.2"/>
    <rect x="170" y="85" width="80" height="8" rx="4" fill="#fff" opacity="0.22"/>
    <circle cx="105" cy="200" r="18" fill="#fff" opacity="0.35"/>
    <circle cx="320" cy="195" r="13" fill="#fff" opacity="0.35"/>
    <rect x="220" y="180" width="70" height="12" rx="6" fill="#fff" opacity="0.20"/>
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Erro ao cadastrar.");
        return;
      }

      // Cadastro feito, redireciona para login
      navigate("/login");
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#fff",
        padding: 34,
        borderRadius: 18,
        boxShadow: "0 2px 24px 0 rgba(67, 160, 71, 0.10), 0 1.5px 8px -1px rgba(67,160,71,0.04)",
        maxWidth: 400,
        width: "95vw",
        margin: "28px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {illustration}
        <h2 style={{
          textAlign: "center",
          color: "#388e3c",
          margin: "0 0 18px 0",
          fontWeight: 700,
          letterSpacing: 1
        }}>Criar Conta</h2>
        <form
          className="register-form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label style={{
              color: "#388e3c",
              fontWeight: 500,
              alignSelf: "flex-start",
              marginLeft: 6,
            }}>Nome completo:</label>
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "95%",
                padding: 10,
                marginTop: 5,
                border: "1.5px solid #e0f2f1",
                borderRadius: 6,
                fontSize: "1rem",
                background: "#f7fbfa",
                display: "block",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label style={{
              color: "#388e3c",
              fontWeight: 500,
              alignSelf: "flex-start",
              marginLeft: 6,
            }}>E-mail:</label>
            <input
              name="email"
              type="email"
              placeholder="exemplo@email.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "95%",
                padding: 10,
                marginTop: 5,
                border: "1.5px solid #e0f2f1",
                borderRadius: 6,
                fontSize: "1rem",
                background: "#f7fbfa",
                display: "block",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label style={{
              color: "#388e3c",
              fontWeight: 500,
              alignSelf: "flex-start",
              marginLeft: 6,
            }}>Senha:</label>
            <input
              name="password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: "95%",
                padding: 10,
                marginTop: 5,
                border: "1.5px solid #e0f2f1",
                borderRadius: 6,
                fontSize: "1rem",
                background: "#f7fbfa",
                display: "block",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label style={{
              color: "#388e3c",
              fontWeight: 500,
              alignSelf: "flex-start",
              marginLeft: 6,
            }}>Confirme a senha:</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirme a senha"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: "95%",
                padding: 10,
                marginTop: 5,
                border: "1.5px solid #e0f2f1",
                borderRadius: 6,
                fontSize: "1rem",
                background: "#f7fbfa",
                display: "block",
              }}
            />
          </div>
          {error && <div style={{
            color: "#e53935",
            background: "#fff6f6",
            border: "1px solid #ffcdd2",
            borderRadius: 4,
            padding: "7px 10px",
            fontSize: "0.97em",
            textAlign: "center",
            width: "95%",
          }}>{error}</div>}
          <button type="submit" style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: 6,
            background: "#43a047",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: 0.5,
            cursor: "pointer",
            transition: "background 0.18s"
          }}>
            Cadastrar
          </button>
        </form>
        <div style={{
          marginTop: 18,
          textAlign: "center",
          color: "#666",
          fontSize: "0.98em"
        }}>
          Já tem conta? <Link to="/login" style={{
            color: "#388e3c", fontWeight: 500, textDecoration: "none"
          }}>Entrar</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;