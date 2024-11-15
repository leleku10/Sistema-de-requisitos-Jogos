// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const jwtConfig = require('../config/jwtConfig');
const dbConfig = require('../config/dbConfig');

// Função para criar a conexão com o banco de dados
const getConnection = async () => {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
};

// Função para encontrar usuário pelo email no banco de dados
const findUserByEmail = async (email) => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  connection.end();

  // Retorna o usuário ou null se não encontrado
  return rows[0] || null;
};

// Função para verificar se a senha fornecida é válida
const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

// Função para gerar o token JWT
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, jwtConfig, { expiresIn: '1h' });
  return token;
};

// Função de autenticação: verifica as credenciais do usuário e retorna o token
const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Senha incorreta');
  }

  const token = generateToken(user);
  return token;
};

// Função de registro: cria um novo usuário com email e senha
const registerUser = async (email, password) => {
  // Verifica se o email já está registrado
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email já registrado');
  }

  // Criptografa a senha antes de armazená-la
  const hashedPassword = bcrypt.hashSync(password, 10);

  const connection = await getConnection();

  // Insere o novo usuário no banco de dados
  const [result] = await connection.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)', 
    [email, hashedPassword]
  );

  connection.end();

  // Retorna o usuário recém-criado
  return { id: result.insertId, email };
};

module.exports = {
  authenticateUser,
  registerUser
};
