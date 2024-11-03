const mysql = require('mysql2/promise');
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '123@abc',
    database: 'banco01'
};

const userController = {

    getAllUsers: async (req, res) => {
        let connection;
        try {
            connection = await mysql.createConnection(connectionConfig);
            const [users] = await connection.execute('SELECT * FROM users');
            res.json(users);
        } catch (error) {
            console.log('Erro ao buscar usuários', error);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params; 
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json(rows[0]); 
        } catch (error) {
            console.log('Erro ao buscar o usuário:', error);
            res.status(500).json({ error: 'Erro ao buscar o usuário' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    createUser: async (req, res) => {
        const { nome, email, password } = req.body;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [result] = await connection.execute(
                'INSERT INTO users (nome, email, password) VALUES (?, ?, ?)',
                [nome, email, password]
            );
            const newUser = { id: result.insertId, nome, email, password };
            res.status(201).json(newUser);
        } catch (error) {
            console.log("Erro ao criar usuário", error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { nome, email, password } = req.body;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const updatedUser = {
                nome: nome || rows[0].nome,
                email: email || rows[0].email,
                password: password || rows[0].password,
            };

            await connection.execute(
                'UPDATE users SET nome = ?, email = ?, password = ? WHERE id = ?',
                [updatedUser.nome, updatedUser.email, updatedUser.password, id]
            );

            res.json({ id, ...updatedUser });

        } catch (error) {
            console.log('Erro ao atualizar o usuário:', error);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        let connection;

        try {
            connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            res.status(204).send();

        } catch (error) {
            console.log('Erro ao deletar o usuário:', error);
            res.status(500).json({ error: 'Erro ao deletar o usuário' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
};

module.exports = userController;
