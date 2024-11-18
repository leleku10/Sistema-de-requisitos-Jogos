import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Para pegar parâmetros da URL, como o ID do jogo

function AboutGame() {
  // Para armazenar as informações do jogo
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pegando o parâmetro da URL (assumindo que o ID do jogo está na URL)
  const { id } = useParams();

  useEffect(() => {
    // Função para buscar as informações do jogo
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/game/${id}`);
        setGame(response.data); // Armazenando as informações do jogo no estado
      } catch (error) {
        setError("Erro ao buscar os detalhes do jogo.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchGameDetails();
  }, [id]); // Vai rodar novamente se o parâmetro `id` mudar

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {game ? (
        <div>
          <h1>{game.nome}</h1>
          <ul>
            <li><strong>Processador:</strong> {game.processador}</li>
            <li><strong>Memória:</strong> {game.memoria}</li>
            <li><strong>Armazenamento:</strong> {game.armazenamento}</li>
            <li><strong>Placa de Vídeo:</strong> {game.placaVideo}</li>
          </ul>
          <input type="button" value="Clique aqui para saber se seu PC roda este Game" />

        </div>
      ) : (
        <p>Jogo não encontrado.</p>
      )}
    </div>
  );
}

export default AboutGame;
