const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./models/Pergunta');
const Resposta = require('./models/Resposta');

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados!');
    })
    .catch((erro) => {
        console.log(`Ocorreu um erro: ${erro}`);
    });

// Configurando o view template HTML: EJS. O EJS será responsável por renderizar / desenhar o HTML na tela.
app.set('view engine', 'ejs');
app.use(express.static('public')); // configurando pasta para arquivos estáticos (css, imagens...). use: Utilizando alguma coisa.

// CONFIGURANDO O BODY-PARSER: Responsável por traduzir os dados do formulário para o Backend do JavaScript.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // raw: true. Traz apenas os dados da tabela e descarta outros dados.
    Pergunta.findAll({
        raw: true,
        // Ordena os valores do select de acordo com uma coluna, de forma crescente ou decrescente.
        order: [
            ['id', 'desc']
        ]
    }).then((perguntas) => {
        res.render("index", {perguntas});
    });
});

app.get('/pergunta', (req, res) => {
    res.render('formPergunta');
});

app.post('/salvar-pergunta', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.pergunta;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        raw: true,
        where: {
            id: id
        }
    }).then((pergunta) => {
        if(pergunta != undefined) { // pergunta encontrada

            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id
                },
                order: [
                    ['id', 'desc']
                ]
            }).then((respostas) => {
                res.render('pergunta', { pergunta, respostas });
            });
            
        } else { // pergunta não encontrada
            res.redirect('/');
        }
    });
});

app.post('/resposta', (req, res) => {
    const corpo = req.body.corpo;
    const idPergunta = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: idPergunta
    }).then(() => {
        res.redirect(`/pergunta/${idPergunta}`); // redireciona para a página de pergunta que o usuario respondeu
    });
});

app.listen(5000, (erro) => {
    console.log('App rodando!');
});