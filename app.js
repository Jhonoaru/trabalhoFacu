const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const conectarBanco = require('./db');
const rotas = require('./routes/index');

const app = express();

// Conectar ao banco
conectarBanco();

// Configurar view engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

// Rotas
app.use('/', rotas);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});