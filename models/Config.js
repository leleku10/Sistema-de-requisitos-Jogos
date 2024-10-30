/*const {DataTypes} = require('sequelize');
const database = require('../db');
const User = require('../models/User');

const Config = database.define('config', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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


})*/