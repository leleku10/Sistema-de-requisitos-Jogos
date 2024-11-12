const authService = require('../services/authService');

const Authenticate = {

     login: async(req, res) => {
        const {email, password } = req.body;

        try {
            const token = await authService.authenticateUser(email, password);
            res.json({token});
            
        } catch (error) {
            res.status(401).json({message: error.message});
        }
    },

    register: async (req, res) => {

        const {email, password } = req.body;

        try {
            const newUser = await authService.registerUser(email, password);
            res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }
};

module.exports = Authenticate;