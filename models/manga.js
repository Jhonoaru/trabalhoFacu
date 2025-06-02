const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  preco: Number,
  categoria: String
});

module.exports = mongoose.model('Manga', mangaSchema);
