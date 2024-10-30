let User;

const userController = {

    getAllUsers: async (req, res) => {

        try{
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.log('Erro ao buscar jogos', error);
            res.status(401).json({error: 'Erro ao buscar usuários'});
        }
    },

    createUser: async (req, res) => {

        const {nome, email, password } = req.body;
        try {
            const newUser = await User.create({nome, email, password });
            res.status(201).json(newUser);

        } catch(error) {
            console.log("Erro ao criar usuário", error);
            res.status(500).json({error: 'Erro ao criar usuário'});
        }

    },

    updateUser: async (req, res) => {

        const {id} = req.params;
        const {nome, email, password} = req.body;

        try {
            const userToUpdate = await User.findByPk(id);

            if(!userToUpdate){
               return res.status(404).json(userToUpdate);
            }

            userToUpdate.nome = nome || userToUpdate.nome;
            userToUpdate.email = email || userToUpdate.email;
            userToUpdate.password = password || userToUpdate.password;

            await userToUpdate.save();
            res.json(userToUpdate);
           
        } catch (error) {
            console.log('Erro ao criar o Usuário', error);
            res.status(500).json({error: 'Erro ao atualizar usuário'});
        }
    },

    deleteUser: async (req, res) => {
        const {id} = req.params;
        
        try {
            const deleteToUser = await User.findByPk(id);

            if(!deleteToUser) {
                return res.status(404).json(userToUpdate);
            }
            await deleteToUser.destroy();
            res.status(204).send();

        } catch (error) {
            console.log('Erro ao deletar o usuário:', error);
            res.status(500).json({error: 'Erro ao deletar o usuário'});
        }
    }

};
    module.exports = userController;
