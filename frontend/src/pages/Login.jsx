import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../api/auth";

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
    <rect x="90" y="80" width="230" height="120" rx="16" fill="#1976d2" />
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#fff",
        padding: 34,
        borderRadius: 18,
        boxShadow: "0 2px 24px 0 rgba(25, 118, 210, 0.08), 0 1.5px 8px -1px rgba(25,118,210,0.04)",
        maxWidth: 380,
        width: "95vw",
        margin: "28px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centraliza tudo dentro do card
      }}>
        {illustration}
        <h2 style={{
          textAlign: "center",
          color: "#1976d2",
          margin: "0 0 18px 0",
          fontWeight: 700,
          letterSpacing: 1
        }}>Login</h2>
        <form
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
              color: "#1976d2",
              fontWeight: 500,
              alignSelf: "flex-start",
              marginLeft: 6,
            }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "95%",
                padding: 10,
                marginTop: 5,
                border: "1.5px solid #e3eaf2",
                borderRadius: 6,
                fontSize: "1rem",
                background: "#f7fbff",
                display: "block",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label style={{
              color: "#1976d2",
              fontWeight: 500,
              alignSelf: "flex-start",
              marginLeft: 6,
            }}>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "95%",
                padding: 10,
                marginTop: 5,
                border: "1.5px solid #e3eaf2",
                borderRadius: 6,
                fontSize: "1rem",
                background: "#f7fbff",
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
            background: "#1976d2",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: 0.5,
            cursor: "pointer",
            transition: "background 0.18s"
          }}>
            Entrar
          </button>
        </form>
        <div style={{
          marginTop: 18,
          textAlign: "center",
          color: "#666",
          fontSize: "0.98em"
        }}>
          Não tem conta? <Link to="/register" style={{
            color: "#1976d2", fontWeight: 500, textDecoration: "none"
          }}>Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;