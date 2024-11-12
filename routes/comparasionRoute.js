const express = require('express');
const router = express.Router();
const comparisonController = require('../controllers/comparasionController');

// Rota para comparar requisitos
router.post('/comparar', comparisonController.compare);

module.exports = router;
