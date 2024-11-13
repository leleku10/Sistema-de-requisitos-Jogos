import './Form.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';

function Form() {
    const checkGames = () => {
        const platform = document.getElementById("platform").value;
        const processor = document.getElementById("processor").value;
        const graphics = document.getElementById("graphics").value;
        const memory = document.getElementById("memory").value;
        console.log("Checking games for:", platform, processor, graphics, memory);
    };

    const ratePC = () => {
        console.log("Avaliando PC...");
    };

    return (
        <div>
            <header>
                <nav>
                    <h1 id="logo">CanMyPCRun</h1>
                    <Link to="#">Jogos</Link>
                    <Link to="/About">Sobre</Link>
                    <Link to="#">Recursos</Link>
                </nav>
            </header>

            <div className="container">
                <h1>Conte-nos sobre o seu PC</h1>

                <div style={{ display: 'flex' }}>
                    <img src="/images/plataforma.jpg" id="platform_icon" alt="Ícone de Plataforma" />
                    <label htmlFor="platform">PLATAFORMA</label>
                </div>
                <select id="platform">
                    <option value="windows">Windows</option>
                    <option value="mac">Mac</option>
                    <option value="linux">Linux</option>
                </select>

                <div style={{ display: 'flex' }}>
                    <img src="/images/cpu.png" id="cpu_icon" alt="Ícone de CPU" />
                    <label htmlFor="processor">PROCESSADOR</label>
                </div>
                <input type="text" id="processor" placeholder="Exemplo: Intel Core i5-6600K" />

                <div style={{ display: 'flex' }}>
                    <img src="/images/gpu.jpg" id="gpu_icon" alt="Ícone de GPU" />
                    <label htmlFor="graphics">PLACA DE VÍDEO</label>
                </div>
                <input type="text" id="graphics" placeholder="Exemplo: NVIDIA GeForce GTX 1070" />

                <div style={{ display: 'flex' }}>
                    <img src="/images/memory.png" id="memory_icon" alt="Ícone de Memória" />
                    <label htmlFor="memory">MEMÓRIA RAM</label>
                </div>
                <select id="memory">
                    <option value="4">8 GB</option>
                    <option value="8" selected>16 GB</option>
                    <option value="16">32 GB</option>
                    <option value="32">64 GB</option>
                </select>

                <button onClick={checkGames}>Que jogos meu PC roda?</button>
                <button onClick={ratePC}>Avalie meu PC</button>
            </div>
        </div>
    );
}

export default Form;
