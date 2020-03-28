const sequelize = require('sequelize');

const connection = new sequelize('guia_perguntas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // tipo de banco
});

module.exports = connection;