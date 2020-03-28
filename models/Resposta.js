const sequelize = require('sequelize');
const connection = require('../database/database');

const Resposta = connection.define('resposta', {
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

// sincroniza os dados (cria a tabela de fato) no banco de dados. force: Força ou não a criação da tabela, caso ela já exista.
Resposta.sync({force: false});

module.exports = Resposta;