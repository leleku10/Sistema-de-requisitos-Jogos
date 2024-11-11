# API de Jogos e Comparação de Configuração

Esta API oferece endpoints para gerenciar usuários, jogos e suas respectivas configurações, além de realizar a comparação entre as configurações de jogos e de usuários para determinar se o jogo pode ser executado na máquina do usuário.

## Índice  
- [Instalação e Setup](#instalação-e-setup)  
- [Estrutura de Rotas](#estrutura-de-rotas)  
- [Exemplos de Requisição](#exemplos-de-requisição)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Fluxo de Comparação](#fluxo-de-comparação)  

---

## Instalação e Setup  

Para rodar este projeto localmente, siga as instruções abaixo:

### 1. Clone o Repositório  

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/usuario/repositorio.git
cd repositorio
```
## 2. ajuste o arquivo db.js para o seu banco local:
```bash

// Crie a conexão com o banco de dados usando o mysql2
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '123@abc',
    database: 'banco01'
};
```
##. Estrutura de rotas

A API possui as seguintes rotas para interagir com os recursos de usuários, jogos e configurações:

## /user
Gerencia os usuários do sistema.

GET /user - Lista todos os usuários.
POST /user - Cria um novo usuário.
GET /user/:id - Obtém detalhes de um usuário específico.
PUT /user/:id - Atualiza as informações de um usuário.
DELETE /user/:id - Deleta um usuário.

## /game
Gerencia os jogos no sistema.

GET /game - Lista todos os jogos.
POST /game - Cria um novo jogo.
GET /game/:id - Obtém detalhes de um jogo específico.
PUT /game/:id - Atualiza as informações de um jogo.
DELETE /game/:id - Deleta um jogo.

## /config
Gerencia as configurações de hardware dos usuários.

GET /config - Lista todas as configurações.
POST /config - Cria uma nova configuração de usuário.
GET /config/:id - Obtém a configuração de um usuário específico.
PUT /config/:id - Atualiza as configurações de um usuário.
DELETE /config/:id - Deleta a configuração de um usuário.

## /comparasion
Compara a configuração do usuário com as exigências do jogo para determinar se o jogo pode ser executado no sistema do usuário.

POST /comparasion - Compara a configuração de um usuário com as exigências de um jogo.

##Exemplos de Requisição

1. Criar um Usuário
```bash
POST /user
{
  "name": "João",
  "email": "joao@example.com",
  "age": 25
}
```
2. Criar um Jogo

```bash
POST /game
{
  "title": "The Witcher 3",
  "requiredRAM": 8,
  "requiredCPU": "Intel i5",
  "requiredGPU": "NVIDIA GTX 1060"
}
```

4. Criar uma Configuração de Usuário

```bash
POST /config
{
  "userId": 1,
  "RAM": 16,
  "CPU": "Intel i7",
  "GPU": "NVIDIA RTX 3070"
}
```
5. Comparar Configuração de Usuário com Jogo

```bash
POST /comparasion
{
  "userId": 1,
  "gameId": 2
}
Resposta Esperada (Caso o Jogo Seja Compatível):
```
```bash
json
{
  "message": "O jogo pode ser executado no sistema do usuário."
}
Resposta Esperada (Caso o Jogo Não Seja Compatível):
```bash
json
{
  "message": "O jogo não pode ser executado no sistema do usuário."
}
```

## Tecnologias Utilizadas

## Node.js - Ambiente de execução JavaScript no servidor.
## Express.js - Framework web para Node.js.
## MongoDB (ou outro banco de dados de sua escolha) - Banco de dados NoSQL para armazenar dados de usuários, jogos e configurações.
## Mongoose - Biblioteca para modelagem de dados e integração com MongoDB.

## Fluxo de Comparação
O fluxo de comparação permite ao usuário saber se um jogo pode ser executado em sua máquina com base na configuração fornecida. A sequência é a seguinte:

O usuário cria seu perfil com suas configurações de hardware (RAM, CPU, GPU, etc.).
O usuário adiciona um jogo ao sistema, incluindo os requisitos mínimos (RAM, CPU, GPU).
Quando o usuário deseja verificar a compatibilidade do jogo com o seu sistema, ele envia uma requisição para a rota /comparasion, passando o userId e o gameId.
A API realiza a comparação entre as configurações do usuário e os requisitos do jogo.
A resposta é retornada, informando se o jogo pode ou não ser executado no sistema do usuário.
