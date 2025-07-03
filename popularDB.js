const conectarBanco = require('./db');
const Manga = require('./models/manga');
const Cliente = require('./models/Cliente');
const Categoria = require('./models/Categoria');
const { logarErro } = require('./logger');

async function executar() {
  await conectarBanco();

  try {
    await Manga.deleteMany({});
    // Inserir categoria
    const cat = new Categoria({ nome: 'Shounen', descricao: 'Ação e aventura para jovens' });
    await cat.save();

    // Inserir cliente
    const cliente = new Cliente({ nome: 'João', email: 'joao@example.com' });
    await cliente.save();

    // Inserir mangás
    await Manga.create([
      {
        titulo: 'One Piece',
        descricao: 'A jornada de Luffy em busca do tesouro One Piece.',
        categoria: 'Shounen',
        autor: 'Eiichiro Oda',
        preco: 45.0
      },
      {
        titulo: 'Naruto',
        descricao: 'A história do ninja que queria ser Hokage.',
        categoria: 'Shounen',
        autor: 'Masashi Kishimoto',
        preco: 39.9
      }
    ]);

    const mangas = await Manga.find();
    console.log('\n✅ Mangás inseridos com sucesso:');
    mangas.forEach(m => console.log(`- ${m.titulo} por ${m.autor}`));

  } catch (erro) {
    logarErro('Erro na execução: ' + erro.message);
  }
  
}

executar();
