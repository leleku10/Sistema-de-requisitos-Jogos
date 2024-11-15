const mysql = require('mysql2/promise');

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '123@abc',
    database: 'banco01'
};

const configController = {
    getAllConfigs: async (req, res) => {
        let connection;
        try {
            connection = await mysql.createConnection(connectionConfig);
            const [configs] = await connection.execute('SELECT * FROM configs');
            res.json(configs);
        } catch (error) {
            console.error('Erro ao buscar configurações', error);
            res.status(500).json({ error: 'Erro ao buscar configurações' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    getConfigById: async (req, res) => {
        const { id } = req.params; 
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM configs WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Configuração não encontrada' });
            }

            res.json(rows[0]); 
        } catch (error) {
            console.error('Erro ao buscar a configuração:', error);
            res.status(500).json({ error: 'Erro ao buscar a configuração' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    createConfig: async (req, res) => {
        const { userId, processador, memoria, armazenamento, placaVideo } = req.body;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [result] = await connection.execute(
                'INSERT INTO configs (userId, processador, memoria, armazenamento, placaVideo) VALUES (?, ?, ?, ?, ?)',
                [userId, processador, memoria, armazenamento, placaVideo]
            );
            const newConfig = { id: result.insertId, userId, processador, memoria, armazenamento, placaVideo };
            res.status(201).json(newConfig);
        } catch (error) {
            console.error("Erro ao criar configuração", error);
            res.status(500).json({ error: 'Erro ao criar configuração' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    updateConfig: async (req, res) => {
        const { id } = req.params;
        const { userId, processador, memoria, armazenamento, placaVideo } = req.body;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM configs WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Configuração não encontrada' });
            }

            const updatedConfig = {
                userId: userId || rows[0].userId,
                processador: processador || rows[0].processador,
                memoria: memoria || rows[0].memoria,
                armazenamento: armazenamento || rows[0].armazenamento,
                placaVideo: placaVideo || rows[0].placaVideo,
            };

            await connection.execute(
                'UPDATE configs SET userId = ?, processador = ?, memoria = ?, armazenamento = ?, placaVideo = ? WHERE id = ?',
                [updatedConfig.userId, updatedConfig.processador, updatedConfig.memoria, updatedConfig.armazenamento, updatedConfig.placaVideo, id]
            );

            res.json({ id, ...updatedConfig });

        } catch (error) {
            console.error('Erro ao atualizar configuração:', error);
            res.status(500).json({ error: 'Erro ao atualizar configuração' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    deleteConfig: async (req, res) => {
        const { id } = req.params;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM configs WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Configuração não encontrada' });
            }

            await connection.execute('DELETE FROM config WHERE id = ?', [id]);
            res.status(204).send();

        } catch (error) {
            console.error('Erro ao deletar configuração', error);
            res.status(500).json({ error: 'Erro ao deletar configuração' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
};

module.exports = configController;
