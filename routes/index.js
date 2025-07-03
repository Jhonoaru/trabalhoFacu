const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const checkLogin = require('../middleware/checkLogin');
const Manga = require('../models/manga');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

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

router.get('/', checkLogin, async (req, res) => {
    const mangas = await Manga.find().lean();
    res.render('index', { mangas });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;