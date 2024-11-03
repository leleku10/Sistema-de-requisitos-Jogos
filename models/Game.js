const {DataTypes} = require('sequelize');
const database = require('../db');

console.log('Importando sequelize:', database);

const Game = database.define('games', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    processador: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    memoria: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    armazenamento: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    placaVideo: {
        type: DataTypes.STRING(150),
        allowNull: false,
    }


});

module.exports = Game;