const { Sequelize } = require('sequelize');
const User = require('./models/User');
const Game = require('./models/Game');
const Config = require('./models/Config');

const sequelize = new Sequelize('banco01','postgres','123@abc',{
    host:'localhost',
    port: 5432,
    dialect: 'postgres',
});



/*const createDefaultUsers = async () => {
    const defaultUsers = [{nome: 'Leonardo', email: 'leonardo@teste.com', password: 'senha123'}];

    for (const userData of defaultUsers) {

        const userExists = await User.findOne({ where: {email: userData.email}});

        if (!userExists) {
            await User.create(userData);
            console.log(`Usuário ${userData.nome} criado com sucesso!`);
        }else {
            console.log("O usuario já existe.");
        }
    };
};*/

const createDefaultGames = async () => {
    const defaultGames = [{nome: 'RedDead Redemption 2', processador:'Ryzen 5', memoria:'8Gb', armazenamento:'500Gb', placaVideo:'Nvidia Rtx 4060' }, 
    {nome: 'RedDead Redemption 2',processador:'Ryzen 5', memoria:'8Gb', armazenamento:'500Gb', placaVideo:'Nvidia Rtx 4060' }, 
    {nome: 'RedDead Redemption 2', processador:'Ryzen 5', memoria:'8Gb', armazenamento:'500Gb', placaVideo:'Nvidia Rtx 4060' },
    {nome: 'RedDead Redemption 2', processador:'Ryzen 5', memoria:'8Gb', armazenamento:'500Gb', placaVideo:'Nvidia Rtx 4060' },
    {nome: 'RedDead Redemption 2', processador:'Ryzen 5', memoria:'8Gb', armazenamento:'500Gb', placaVideo:'Nvidia Rtx 4060' }
    ];  

    for (const gameData of defaultGames) {
        const gameExists = await Game.findOne({ where: {nome: gameData.nome}});

        if(!gameExists) {
        await Game.create(gameData);
        console.log(`Usuário ${gameData.nome} criado com sucesso!`);
        } else {
            console.log("O usuário já existe.");
        }
    };
    
};

/*const createConfigUser = async () => {
    const defaultConfigs = [{userId:1, processador:'Ryzen 5', memoria:'8Gb', armazenamento:'500Gb', placaVideo:'Nvidia Rtx 4060' }];

    for (const configData of defaultConfigs) {
        const configExists = await Config.findOne({ where: { userId: configData.userId } });

        if (!configExists) {
            await Config.create(configData);
            console.log(`Configuração para o usuário ${configData.userId} criada com sucesso!`);
        } else {
            console.log(`Configuração para o usuário ${configData.userId} já existe.`);
        }
    };
};*/

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await sequelize.sync();
        /*await createDefaultUsers();*/
        await createDefaultGames();
        /*await createConfigUser();*/
    } catch(error){
        console.log('Erro ao conectar no banco de dados:', error);
    }
};

module.exports = {connectDB, sequelize};
