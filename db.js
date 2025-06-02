const mongoose = require('mongoose');
require('dotenv').config(); // <-- carrega o .env
const { logarErro } = require('./logger');

async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // <-- usa a variável do .env
    console.log('✅ Conectado ao MongoDB');
  } catch (erro) {
    logarErro('Erro ao conectar ao MongoDB: ' + erro.message);
  }
}

module.exports = conectarBanco;
