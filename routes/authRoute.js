const express = require('express');
const Authenticate = require('../controllers/authController');


const router = express.Router();

router.post("/login", Authenticate.login);
router.post("/register", Authenticate.register);

module.exports = router;
