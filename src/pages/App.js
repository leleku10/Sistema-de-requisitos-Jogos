import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import About from "./About";
import Form from "./Form";
import Acess from "./Acess";
import AboutGame from "./AboutGame";
import HomePage from "./HomePage";

function Header() {
  return (
    <header>
      <nav>
        <h1 id="logo">CanMyPCRun</h1>
        <Link to="/">Jogos</Link>
        <Link to="/About">Sobre</Link>
        <Link to="#">Contato</Link>
        <Link to="/Acess">Entrar</Link>
      </nav>
    </header>
  );
}


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para autenticar o usuário
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {/* Exibe o Header independentemente do estado de autenticação */}
      <Header />
      <main>
        <Routes>
          {/* Rota para autenticação */}
          <Route
            path="/Acess"
            element={<Acess onAuthenticate={handleAuthentication} />}
          />

          {/* Não há mais redirecionamento para /acess */}
          <Route path="/" element={<HomePage />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/About" element={<About />} />
          <Route path="/AboutGame/:id" element={<AboutGame />} />
          {/* Rota padrão (404) */}
          <Route
            path="*"
            element={<div>Página não encontrada!</div>}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
