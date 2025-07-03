const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    usuario: String,
    senha: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);