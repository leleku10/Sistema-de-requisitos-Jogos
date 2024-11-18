import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Acess.css";

function Acess({ onAuthenticate }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Alterna entre login e cadastro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");

  // Função para login
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8800/login", { email, password }); // Corrigida a URL para login
      const token = response?.data?.token; // Validação segura
      if (token) {
        onAuthenticate(token);
        navigate("/"); // Redireciona após o login
      } else {
        alert("Login falhou. Verifique suas credenciais.");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Erro ao fazer login.";
      alert(message);
    }
  };

  // Função para cadastro
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8800/register", { nome, email, password }); // Corrigida a URL para cadastro
      alert(response?.data?.message || "Usuário criado com sucesso!");
      setIsLogin(true); // Alterna para a tela de login
    } catch (error) {
      const message = error.response?.data?.message || "Erro ao criar usuário.";
      alert(message);
    }
  };

  // Alternar entre os formulários
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="acess-container">
      <div className="heading">{isLogin ? "Entre com sua conta" : "Criar conta"}</div>
      <form className="acess-form">
        {!isLogin && (
          <div className="acess-input-field">
            <input
              required
              autoComplete="off"
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="nome">Nome completo</label>
          </div>
        )}
        <div className="acess-input-field">
          <input
            required
            autoComplete="off"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="acess-input-field">
          <input
            required
            autoComplete="off"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
        </div>
        <div className="btn-container">
          <button
            className="acess-btn"
            type="button"
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? "Entrar" : "Criar conta"}
          </button>
          <div className="acc-text">
            {isLogin ? "Novo aqui?" : "Já tem uma conta?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              style={{ color: "#0000ff", cursor: "pointer" }}
            >
              {isLogin ? "Criar conta" : "Entrar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Acess;
