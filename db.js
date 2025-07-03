const mongoose = require('mongoose');
require('dotenv').config();
const { logarErro } = require('./logger');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario');

async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');

    // Criar usuário admin se não existir
    const existe = await Usuario.findOne({ usuario: 'admin' });
    if (!existe) {
      const senhaHash = await bcrypt.hash('123', 10);
      await Usuario.create({ usuario: 'admin', senha: senhaHash });
      console.log('Usuário admin criado com senha 123');
    }

  } catch (erro) {
    logarErro('Erro ao conectar ao MongoDB: ' + erro.message);
  }
}

module.exports = conectarBanco;