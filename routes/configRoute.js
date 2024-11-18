const express = require('express');
const configController = require('../controllers/configController');
const express = require('express');
const router = express.Router();

router.get('/configs', configController.getAllConfigs);
router.get('configs/:id', configController.getConfigById);
router.post('/configs', configController.createConfig);
router.put('/configs/:id', configController.updateConfig);
router.delete('/configs/:id', configController.deleteConfig);

module.exports = router;
