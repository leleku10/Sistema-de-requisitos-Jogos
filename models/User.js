const sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user', {
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

    email: {
        type: sequelize.STRING(150),
        allowNull: false,
    },

    password: {
        type: sequelize.STRING(45)
    }

});

module.exports = User;