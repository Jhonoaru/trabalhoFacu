const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  autor: String,
  preco: Number,
  categoria: String
});

module.exports = mongoose.model('Manga', MangaSchema);