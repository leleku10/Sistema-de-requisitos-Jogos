import './About.css';
import React from 'react';

function About() {
    return (
        <div className="About">
           

            <div class="container">
                <h1>Sobre nós</h1> <br/>
                    <p id="text_about">Bem-vindo ao nosso site, o seu aliado na hora de saber se o seu PC está pronto para rodar seus jogos favoritos! Nosso objetivo é simplificar a vida dos gamers, eliminando as incertezas sobre o desempenho de seus computadores com uma análise rápida, precisa e intuitiva.
                        Desenvolvemos uma plataforma que analisa automaticamente as configurações do seu sistema — desde o processador, memória RAM e placa de vídeo até o armazenamento e sistema operacional — e compara com os requisitos técnicos dos jogos. Com nossa tecnologia, você descobre rapidamente se o seu PC suporta o jogo desejado e, se necessário, recebe recomendações de atualização para melhorar seu desempenho.
                        Sabemos que cada gamer é único e que uma experiência de jogo fluida faz toda a diferença. Nossa equipe é formada por entusiastas de tecnologia e jogos, sempre prontos para atualizar a plataforma com os requisitos dos lançamentos mais recentes. Junte-se a nós e descubra se seu PC está pronto para encarar o próximo desafio virtual!</p>
            </div>
        </div>
    );
}

export default About;