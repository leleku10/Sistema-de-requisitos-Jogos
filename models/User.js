/*const { DataTypes } = require('sequelize');
const database  = require('../db'); 

console.log("erro:", database);

const User = database.define('user', {
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
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
})

module.exports = User;*/
