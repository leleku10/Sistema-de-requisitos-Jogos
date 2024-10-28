const sequelize = require('sequelize');
const database = require('../db');

const Config = database.define('config', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    userId: {
        type: sequelize.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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