const {Router} = require("express");
const router = Router();
const game = require('../models/Game');

router.get("/game", async (req, res) => {
    try{
        const games = await game.findAll();
        res.json(games);
    } catch (error) {
        console.error('Erro ao buscar os usuários', error)
        res.status(500).json({error: 'Erro ao busca usuários'});
    }
});


router.post("/game", async (req, res) => {

    const {nome, processador, memoria, armazenamento, placaVideo} = req.body;

    try{
        const newGame = await game.create({nome, processador, memoria, armazenamento, placaVideo});
        res.status(201).json(newGame)
    } catch (error) {
        console.log("Erro ao criar usuário", error);
        res.status(500).json({error: 'Erro ao criar usuário'});
    }

});


router.put("/game/:id", async (req, res) => {
    const {id} = req.params;
    const {nome, processador, memoria, armazenamento, placaVideo} = req.body;

    try{
        const game = await game.findByPk(id);
        if (!game) {
            return res.status(404).json({error: 'Usuário não encontrado'});
        }
    
    game.nome = nome || game.nome;
    game.processador = processador || game.processador;
    game.memoria = memoria || game.memoria;
    game.armazenamento = armazenamento || game.armazenamento;
    game.placaVideo = placaVideo || game.placaVideo;

    }catch (error) {
        console.log('Erro ao atualizar o usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar o usuário'});
    }
});

router.delete("/game/:id", async (req, res) => {

    const {id} = req.params;

    try {
        const gameDelete = await gameDelete.findByPk(id);
        
        if(!game) {
            return res.status(404).json({error: 'Usuário não encontrado'});
        }
    

        await userInfo.destroy();
        res.status(204).send();
    
    } catch (error) {
        console.error('Erro ao deletar usuário', error);
        res.status(500).json({ error: 'Erro ao deletar usuário'});
    }
});

module.exports = router;