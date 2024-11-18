const mysql = require('mysql2/promise');

// Crie a conexão com o banco de dados usando o mysql2
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '123@abc',
    database: 'banco01',
    charset: 'utf8mb4'
};

const createTables = async (connection) => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;

    const createGamesTable = `
        CREATE TABLE IF NOT EXISTS games (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            urlImg VARCHAR(255) NOT NULL,
            processador VARCHAR(255) NOT NULL,
            memoria VARCHAR(255) NOT NULL,
            armazenamento VARCHAR(255) NOT NULL,
            placaVideo VARCHAR(255) NOT NULL
        )
    `;

    const createConfigsTable = `
        CREATE TABLE IF NOT EXISTS configs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            processador VARCHAR(255) NOT NULL,
            memoria VARCHAR(255) NOT NULL,
            armazenamento VARCHAR(255) NOT NULL,
            placaVideo VARCHAR(255) NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `;

    await connection.execute(createUsersTable);
    await connection.execute(createGamesTable);
    await connection.execute(createConfigsTable);
    console.log('Tabelas criadas com sucesso!');
};


// Função para criar usuários padrão
const createDefaultUsers = async (connection) => {
    const defaultUsers = [{nome: 'Leonardo', email: 'leonardo@teste.com', password: 'senha123'}];

    for (const userData of defaultUsers) {
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [userData.email]);

        if (rows.length === 0) {
            await connection.execute('INSERT INTO users (nome, email, password) VALUES (?, ?, ?)', 
                [userData.nome, userData.email, userData.password]);
            console.log(`Usuário ${userData.nome} criado com sucesso!`);
        } else {
            console.log("O usuário já existe.");
        }
    }
};

// Função para criar jogos padrão
const createDefaultGames = async (connection) => {
    const defaultGames = [
        {nome: 'Red Dead Redemption 2', urlImg:'https://res.cloudinary.com/ddwpsulcv/image/upload/v1731900385/rdr_du3fiw.png' , processador: 'Ryzen 5', memoria: '8Gb', armazenamento: '500Gb', placaVideo: 'Nvidia Rtx 4060'},
        {nome: 'Battlegrounds', urlImg:'https://res.cloudinary.com/ddwpsulcv/image/upload/v1731900389/pubg_jzvowd.jpg' , processador: 'Ryzen 5', memoria: '8Gb', armazenamento: '500Gb', placaVideo: 'Nvidia Rtx 4060'},
        {nome: 'DragonAge The Veilguard', urlImg:'https://res.cloudinary.com/ddwpsulcv/image/upload/v1731900384/dragon-age_juerk4.jpg' , processador: 'Ryzen 5', memoria: '8Gb', armazenamento: '500Gb', placaVideo: 'Nvidia Rtx 4060'},
        {nome: 'Apex Legends', urlImg:'https://res.cloudinary.com/ddwpsulcv/image/upload/v1731900390/apex_eo2dvc.png' , processador: 'Ryzen 5', memoria: '8Gb', armazenamento: '500Gb', placaVideo: 'Nvidia Rtx 4060'},
        {nome: 'Ark Survival Evolved', urlImg:'https://res.cloudinary.com/ddwpsulcv/image/upload/v1731900390/apex_eo2dvc.png' , processador: 'Ryzen 5', memoria: '8Gb', armazenamento: '500Gb', placaVideo: 'Nvidia Rtx 4060'},
    ];

    for (const gameData of defaultGames) {
        const [rows] = await connection.execute('SELECT * FROM games WHERE nome = ?', [gameData.nome]);

        if (rows.length === 0) {
            await connection.execute('INSERT INTO games (nome, urlImg, processador, memoria, armazenamento, placaVideo) VALUES (?, ?, ?, ?, ?, ?)', 
                [gameData.nome, gameData.urlImg, gameData.processador, gameData.memoria, gameData.armazenamento, gameData.placaVideo]);
            console.log(`Jogo ${gameData.nome} criado com sucesso!`);
        } else {
            console.log("O jogo já existe.");
        }
    }
};

// Função para criar configurações de usuários padrão
const createConfigUser = async (connection) => {
    const defaultConfigs = [{userId: 1, processador: 'Ryzen 5', memoria: '8Gb', armazenamento: '500Gb', placaVideo: 'Nvidia Rtx 4060'}];

    for (const configData of defaultConfigs) {
        const [rows] = await connection.execute('SELECT * FROM configs WHERE userId = ?', [configData.userId]);

        if (rows.length === 0) {
            await connection.execute('INSERT INTO configs (userId, processador, memoria, armazenamento, placaVideo) VALUES (?, ?, ?, ?, ?)', 
                [configData.userId, configData.processador, configData.memoria, configData.armazenamento, configData.placaVideo]);
            console.log(`Configuração para o usuário ${configData.userId} criada com sucesso!`);
        } else {
            console.log(`Configuração para o usuário ${configData.userId} já existe.`);
        }
    }
};

// Função principal para conectar ao banco de dados
const connectDB = async () => {
    let connection;

    try {
        connection = await mysql.createConnection(connectionConfig);
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await createTables(connection);
        // Chame as funções para criar dados padrão
        await createDefaultUsers(connection);
        await createDefaultGames(connection);
        await createConfigUser(connection);
    } catch (error) {
        console.log('Erro ao conectar no banco de dados:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

// Executa a função de conexão ao banco de dados
module.exports = {connectDB};
