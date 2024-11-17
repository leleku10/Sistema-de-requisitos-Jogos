const { Router } = require("express");
const gameController = require('../controllers/gameController');
const express = require('express');
const router = express.Router();

router.get("/game", gameController.getAllGames);
router.post("/game", gameController.createGame);
router.put("/game/:id", gameController.updateGame);
router.delete("/game/:id", gameController.deleteGame);

module.exports = router;
