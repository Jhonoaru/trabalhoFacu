const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const checkLogin = require('../middleware/checkLogin');

const router = express.Router();

// Página de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Processar login
router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;
    const user = await Usuario.findOne({ usuario });

    if (user && await bcrypt.compare(senha, user.senha)) {
        req.session.logado = true;
        res.redirect('/');
    } else {
        res.send('Login inválido. <a href="/login">Tentar novamente</a>');
    }
});

// Página protegida
router.get('/', checkLogin, (req, res) => {
    res.render('index');
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;