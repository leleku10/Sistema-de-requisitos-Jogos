// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Form from "./Form";

function Header() {
  return (
    <header>
      <nav>
        <h1 id="logo">CanMyPCRun</h1>
        <Link to="/">Jogos</Link>
        <Link to="/About">Sobre</Link>
        <Link to="#">Contato</Link>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <div className="container">
      <div className="game-grid">
        <Link to="/Form" className="game-card">
          <img src="/images/dragon-age.jpg" alt="Dragon Age: The Veilguard" />
          <div className="info">
            <h3>Dragon Age: The Veilguard</h3>
          </div>
        </Link>
        <Link to="/Form" className="game-card">
          <img src="/images/fortnite.jpg" alt="Fortnite" />
          <div className="info">
            <h3>Fortnite</h3>
          </div>
        </Link>
        <Link to="/Form" className="game-card">
          <img src="/images/rdr.png" alt="RDR 2" />
          <div className="info">
            <h3>Red Dead Redemption 2</h3>
          </div>
        </Link>
        <Link to="/Form" className="game-card">
          <img src="/images/ark.png" alt="ARK: Survival Evolved" />
          <div className="info">
            <h3>ARK: Survival Evolved</h3>
          </div>
        </Link>
        <Link to="/Form" className="game-card">
          <img src="/images/apex.png" alt="Apex Legends" />
          <div className="info">
            <h3>Apex Legends</h3>
          </div>
        </Link>
        <Link to="/Form" className="game-card">
          <img src="/images/pubg.jpg" alt="PUBG" />
          <div className="info">
            <h3>PlayerUnknown's Battlegrounds</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
