const sequelize = require('sequelize');
const connection = require('../database/database');

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

// sincroniza os dados (cria a tabela de fato) no banco de dados. force: Força ou não a criação da tabela, caso ela já exista.
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;