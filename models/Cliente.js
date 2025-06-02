const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: String,
  email: String
});

module.exports = mongoose.model('Cliente', clienteSchema);
