import "./Form.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";

function Form() {
  // Definindo o estado para os campos do formulário
  const [platform, setPlatform] = useState("windows");
  const [processor, setProcessor] = useState("");
  const [graphics, setGraphics] = useState("");
  const [memory, setMemory] = useState("8");

  // Função para enviar a configuração
  const sendConfiguration = () => {
    const configData = {
      platform,
      processor,
      graphics,
      memory,
    };

    // Envia a solicitação POST para a rota /configs
    fetch("/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(configData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Configuração criada com sucesso!");
        } else {
          console.error("Erro ao criar a configuração.");
        }
      })
      .catch((error) => console.error("Erro na solicitação:", error));
  };

  // Função para verificar os jogos
  const checkGames = () => {
    console.log("Checando jogos...");
    sendConfiguration(); // Chama a função de envio de configuração
  };

  // Função para avaliar o PC
  const ratePC = () => {
    console.log("Avaliando PC...");
    sendConfiguration(); // Chama a função de envio de configuração
  };

  return (
    <div className="wrapper">
      <label className="switch">
        <div className="flip-card__front">
          <div className="title">Conte-nos sobre o seu PC</div>
          <form className="flip-card__form" action="">
            <label htmlFor="platform">SISTEMA OPERACIONAL</label>
            <input
              list="platform-options"
              id="platform" // Este ID agora é único
              name="platform"
              placeholder="Exemplo: Windows"
              value={platform} // Usando o estado para controlar o valor
              onChange={(e) => setPlatform(e.target.value)} // Atualizando o estado
            />
            <datalist id="platform-options">
              <option value="Windows" />
              <option value="Linux" />
              <option value="MacOS" />
            </datalist>

            <label htmlFor="processor">PROCESSADOR</label>
            <input
              list="processor-options"
              id="processor" // Este ID agora é único
              name="processor"
              placeholder="Exemplo: Intel Core i5-6600K"
              value={processor} // Usando o estado para controlar o valor
              onChange={(e) => setProcessor(e.target.value)} // Atualizando o estado
            />
            <datalist id="processor-options">
              <option value="Intel Core i5-6600K" />
              <option value="Intel Core i7-9700K" />
              <option value="AMD Ryzen 5 3600" />
              <option value="AMD Ryzen 7 3700X" />
              <option value="Intel Core i9-11900K" />
            </datalist>

            <label htmlFor="graphics">PLACA DE VÍDEO</label>
            <input
              list="graphicCards-options"
              id="graphics" // Este ID agora é único
              name="graphics"
              placeholder="Exemplo: NVIDIA RTX 3060"
              value={graphics} // Usando o estado para controlar o valor
              onChange={(e) => setGraphics(e.target.value)} // Atualizando o estado
            />
            <datalist id="graphicCards-options">
              <option value="NVIDIA RTX 3060" />
              <option value="Intel Core i7-9700K" />
              <option value="AMD Ryzen 5 3600" />
              <option value="AMD Ryzen 7 3700X" />
              <option value="Intel Core i9-11900K" />
            </datalist>

            <label htmlFor="memory">MEMÓRIA RAM</label>
            <input
              list="memory-options"
              id="memory" // Este ID agora é único
              name="memory"
              placeholder="Exemplo: 16GB"
              value={memory} // Usando o estado para controlar o valor
              onChange={(e) => setMemory(e.target.value)} // Atualizando o estado
            />
            <datalist id="memory-options">
              <option value="4GB" />
              <option value="8GB" />
              <option value="16GB" />
              <option value="32GB" />
            </datalist>

            <div className="buttons">
              <button type="button" id="btn-verify" onClick={checkGames}>
                Verificar
              </button>
              <button type="button" id="btn-pcRoda" onClick={ratePC}>
                Que jogos meu PC roda?
              </button>
            </div>
          </form>
        </div>
      </label>
    </div>
  );
}

export default Form;
