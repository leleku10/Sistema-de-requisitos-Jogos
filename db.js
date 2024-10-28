const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('banco01','root','123@abc',{
    host:'localhost',
    port: 3306,
    dialect: 'mysql',
});

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch(error){
        console.log('Erro ao conectar no banco de dados:', error);
    }
};

//Injetar dados de jogos e configurações;


module.exports = connectDB;