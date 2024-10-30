const Game = require('../models/Game');

const gameController = {
    getAllGames: async (req, res) => {
        try {
            const games = await Game.findAll();
            res.json(games);
        } catch (error) {
            console.error('Erro ao buscar os jogos', error);
            res.status(500).json({ error: 'Erro ao buscar jogos' });
        }
    },

    createGame: async (req, res) => {
        const { nome, processador, memoria, armazenamento, placaVideo } = req.body;

        try {
            const newGame = await Game.create({ nome, processador, memoria, armazenamento, placaVideo });
            res.status(201).json(newGame);
        } catch (error) {
            console.log("Erro ao criar jogo", error);
            res.status(500).json({ error: 'Erro ao criar jogo' });
        }
    },

    updateGame: async (req, res) => {
        const { id } = req.params;
        const { nome, processador, memoria, armazenamento, placaVideo } = req.body;

        try {
            const gameToUpdate = await Game.findByPk(id);
            if (!gameToUpdate) {
                return res.status(404).json({ error: 'Jogo não encontrado' });
            }

            gameToUpdate.nome = nome || gameToUpdate.nome;
            gameToUpdate.processador = processador || gameToUpdate.processador;
            gameToUpdate.memoria = memoria || gameToUpdate.memoria;
            gameToUpdate.armazenamento = armazenamento || gameToUpdate.armazenamento;
            gameToUpdate.placaVideo = placaVideo || gameToUpdate.placaVideo;

            await gameToUpdate.save(); // Salva as alterações
            res.json(gameToUpdate);

        } catch (error) {
            console.log('Erro ao atualizar o jogo:', error);
            res.status(500).json({ error: 'Erro ao atualizar o jogo' });
        }
    },

    deleteGame: async (req, res) => {
        const { id } = req.params;

        try {
            const gameToDelete = await Game.findByPk(id);
            if (!gameToDelete) {
                return res.status(404).json({ error: 'Jogo não encontrado' });
            }

            await gameToDelete.destroy(); 
            res.status(204).send();

        } catch (error) {
            console.error('Erro ao deletar jogo', error);
            res.status(500).json({ error: 'Erro ao deletar jogo' });
        }
    }
};

module.exports = gameController;
