const conectarBanco = require('./db');
const Manga = require('./models/Manga');
const Cliente = require('./models/Cliente');
const Categoria = require('./models/Categoria');
const { logarErro } = require('./logger');

async function executar() {
  await conectarBanco();

  try {
    const cat = new Categoria({ nome: 'Shounen', descricao: 'Ação e aventura para jovens' });
    await cat.save();

    const cliente = new Cliente({ nome: 'João', email: 'joao@example.com' });
    await cliente.save();

    const manga = new Manga({
      titulo: 'One Piece',
      autor: 'Eiichiro Oda',
      preco: 45.0,
      categoria: 'Shounen'
    });
    await manga.save();

    const mangas = await Manga.find();
    console.log('Mangás:');
    mangas.forEach(m => console.log(m.titulo, '-', m.autor));

    await Manga.deleteOne({ titulo: 'One Piece' });
    console.log('\n Manga "One Piece" deletado.');

  } catch (erro) {
    logarErro('Erro na execução: ' + erro.message);
  }
}

executar();
