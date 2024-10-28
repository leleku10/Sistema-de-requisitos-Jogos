const sequelize = require('sequelize');
const database = require('../db');

const Game = database.define('games', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: sequelize.STRING(150),
        allowNull: false,
    },

    processador: {
        type: sequelize.STRING(150),
        allowNull: false,
    },

    memoria: {
        type: sequelize.STRING(150),
        allowNull: false,
    },

    armazenamento: {
        type: sequelize.STRING(150),
        allowNull: false,
    },

    placaVideo: {
        type: sequelize.STRING(150),
        allowNull: false,
    }


})