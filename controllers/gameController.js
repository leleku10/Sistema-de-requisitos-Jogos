const mysql = require('mysql2/promise');
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '123@abc',
    database: 'banco01'
};

const gameController = {
    getAllGames: async (req, res) => {
        let connection;
        try {
            connection = await mysql.createConnection(connectionConfig);
            const [games] = await connection.execute('SELECT * FROM games');
            res.json(games);
        } catch (error) {
            console.error('Erro ao buscar os jogos', error);
            res.status(500).json({ error: 'Erro ao buscar jogos' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    getGameById: async (req, res) => {
        const { id } = req.params; // Obtém o ID do jogo a partir dos parâmetros da requisição
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM games WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Jogo não encontrado' });
            }

            res.json(rows[0]); // Retorna o jogo encontrado
        } catch (error) {
            console.error('Erro ao buscar o jogo:', error);
            res.status(500).json({ error: 'Erro ao buscar o jogo' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    createGame: async (req, res) => {
        const { nome, processador, memoria, armazenamento, placaVideo } = req.body;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [result] = await connection.execute(
                'INSERT INTO games (nome, processador, memoria, armazenamento, placaVideo) VALUES (?, ?, ?, ?, ?)',
                [nome, processador, memoria, armazenamento, placaVideo]
            );
            const newGame = { id: result.insertId, nome, processador, memoria, armazenamento, placaVideo };
            res.status(201).json(newGame);
        } catch (error) {
            console.error("Erro ao criar jogo", error);
            res.status(500).json({ error: 'Erro ao criar jogo' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    updateGame: async (req, res) => {
        const { id } = req.params;
        const { nome, processador, memoria, armazenamento, placaVideo } = req.body;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM games WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Jogo não encontrado' });
            }

            const updatedGame = {
                nome: nome || rows[0].nome,
                processador: processador || rows[0].processador,
                memoria: memoria || rows[0].memoria,
                armazenamento: armazenamento || rows[0].armazenamento,
                placaVideo: placaVideo || rows[0].placaVideo,
            };

            await connection.execute(
                'UPDATE games SET nome = ?, processador = ?, memoria = ?, armazenamento = ?, placaVideo = ? WHERE id = ?',
                [updatedGame.nome, updatedGame.processador, updatedGame.memoria, updatedGame.armazenamento, updatedGame.placaVideo, id]
            );

            res.json({ id, ...updatedGame });

        } catch (error) {
            console.error('Erro ao atualizar o jogo:', error);
            res.status(500).json({ error: 'Erro ao atualizar o jogo' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    deleteGame: async (req, res) => {
        const { id } = req.params;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM games WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Jogo não encontrado' });
            }

            await connection.execute('DELETE FROM games WHERE id = ?', [id]);
            res.status(204).send();

        } catch (error) {
            console.error('Erro ao deletar jogo', error);
            res.status(500).json({ error: 'Erro ao deletar jogo' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
};

module.exports = gameController;
