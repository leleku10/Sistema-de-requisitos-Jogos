import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o useNavigate
import axios from "axios"; // Certifique-se de que o axios está instalado
import "./Acess.css";

function Acess({ onAuthenticate }) {
  const navigate = useNavigate(); // Usando o useNavigate para navegação
  const [isLogin, setIsLogin] = useState(true); // Controla se estamos no formulário de Login ou Cadastro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState(""); // Nome para o cadastro

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { email, password }); // Requisição para login
      const token = response.data.token; // Espera o token no retorno
      onAuthenticate(token); // Atualiza o estado de autenticação no App
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      alert("Erro ao fazer login: " + error.response.data.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("/user", { nome, email, password }); // Requisição para cadastro
      alert("Usuário criado com sucesso!");
      setIsLogin(true); // Após o cadastro, volta para a tela de login
    } catch (error) {
      alert("Erro ao criar usuário: " + error.response.data.message);
    }
  };

  // Função para alternar entre Login e Cadastro
  const toggleForm = () => {
    setIsLogin((prev) => !prev); // Alterna entre Login e Cadastro
  };

  // Formulário de Login
  function Login() {
    return (
      <div className="acess-container">
        <div className="heading">Entre com sua conta</div>
        <form className="acess-form" action="">
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
              onClick={handleLogin}
            >
              Entrar
            </button>
            <div className="acc-text">
              Novo aqui?{" "}
              <button
                type="button"
                onClick={toggleForm} // Alterna para o formulário de Cadastro
                style={{ color: "#0000ff", cursor: "pointer" }}
              >
                Criar conta
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Formulário de Cadastro
  function Cadastro() {
    return (
      <div className="acess-container">
        <div className="heading">Criar conta </div>
        <form className="acess-form" action="">
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
              onClick={handleRegister} // Envia a requisição de cadastro
            >
              Criar
            </button>
            <div className="acc-text">
              Já tem uma conta?{" "}
              <button
                type="button"
                onClick={toggleForm} // Alterna para o formulário de Login
                style={{ color: "#0000ff", cursor: "pointer" }}
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Renderiza o formulário dependendo do valor de isLogin
  return isLogin ? Login() : Cadastro();
}

export default Acess;
