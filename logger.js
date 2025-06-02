const fs = require('fs');

function logarErro(mensagem) {
  const log = `[${new Date().toLocaleString()}] ERRO: ${mensagem}\n`;
  fs.appendFileSync('log.txt', log);
}

module.exports = { logarErro };
