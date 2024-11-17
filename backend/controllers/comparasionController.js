// controllers/comparasionController.js

const { compareRequirements } = require('../services/compareService');
const mysql = require('mysql2/promise');
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'banco01'
};

const comparisonController = {
    compare: async (req, res) => {
        const { userId, gameId } = req.body; // Recebe userId e gameId do corpo da requisição

        if (!userId || !gameId) {
            return res.status(400).json({ error: 'userId e gameId são necessários.' });
        }

        let connection;
        try {
            connection = await mysql.createConnection(connectionConfig);

            // Busca os requisitos do PC do usuário
            const [pcRequirementsRows] = await connection.execute('SELECT * FROM configs WHERE userId = ?', [userId]);
            if (pcRequirementsRows.length === 0) {
                return res.status(404).json({ error: 'Requisitos do PC não encontrados.' });
            }
            const pcRequirements = pcRequirementsRows[0];

            // Busca os requisitos do jogo
            const [gameRequirementsRows] = await connection.execute('SELECT * FROM games WHERE id = ?', [gameId]);
            if (gameRequirementsRows.length === 0) {
                return res.status(404).json({ error: 'Jogo não encontrado.' });
            }
            const gameRequirements = gameRequirementsRows[0];

            // Compara os requisitos
            const comparisonResult = compareRequirements(pcRequirements, gameRequirements);
            res.json(comparisonResult);

        } catch (error) {
            console.error('Erro ao comparar requisitos:', error);
            res.status(500).json({ error: 'Erro ao comparar requisitos' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
};

module.exports = comparisonController;
