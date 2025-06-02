const conectarBanco = require('./db');
const Manga = require('./models/Manga');
const Cliente = require('./models/Cliente');
const Categoria = require('./models/Categoria');
const { logarErro } = require('./logger');

async function executar() {
  await conectarBanco();

  try {
    // Inserir categoria
    const cat = new Categoria({ nome: 'Shounen', descricao: 'Ação e aventura para jovens' });
    await cat.save();

    // Inserir cliente
    const cliente = new Cliente({ nome: 'João Otaku', email: 'joao@example.com' });
    await cliente.save();

    // Inserir manga
    const manga = new Manga({
      titulo: 'One Piece',
      autor: 'Eiichiro Oda',
      preco: 45.0,
      categoria: 'Shounen'
    });
    await manga.save();

    // Listar todos os mangás
    const mangas = await Manga.find();
    console.log('📚 Mangás:');
    mangas.forEach(m => console.log(m.titulo, '-', m.autor));

    // Deletar um manga por título
    await Manga.deleteOne({ titulo: 'One Piece' });
    console.log('\n🗑️ Manga "One Piece" deletado.');

  } catch (erro) {
    logarErro('Erro na execução: ' + erro.message);
  }
}

executar();
