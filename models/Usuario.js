const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    usuario: String,
    senha: String // deve ser hash com bcrypt
});

module.exports = mongoose.model('Usuario', UsuarioSchema);