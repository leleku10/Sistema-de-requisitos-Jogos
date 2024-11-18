import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import { Link } from 'react-router-dom';

function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os jogos da API
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8800/game');
        setGames(response.data); // Armazenar os jogos no estado
      } catch (err) {
        setError('Erro ao carregar jogos');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // Chama a função uma vez ao carregar o componente

  if (loading) {
    return <div>Carregando jogos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container" >
      <h2>Jogos</h2>
      {/* Mapear todos os jogos recebidos da API */}
      {games.map((game) => (
        <div key={game.id}>
            <div className="container">

                <div className="game-grid">
                    <Link to={`/aboutGame/${game.id}`} className="game-card">
                    <img src={game.urlImg}></img>
                    <div className="info">
                        <h3>{game.nome}</h3>
                    </div>
                    </Link>
                </div>    

            </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
