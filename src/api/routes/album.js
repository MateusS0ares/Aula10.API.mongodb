const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conectando ao banco de dados MongoDB chamado "teste"
mongoose.connect('mongodb://127.0.0.1:27017/album', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexão com o banco de dados "album" estabelecida com sucesso!');
    // Faça aqui as operações no banco de dados "teste"
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados "album":', error);
  });

// Definindo o Schema
const albumSchema = new mongoose.Schema({
    nome: String,
    artista: String,
    ano: Number,
    generos: Array,
    faixas: Array,
    lancamento: Date
  });
  
  // Criando o modelo baseado no Schema
  const Album = mongoose.model('Album', albumSchema);


  //Retornar todos os albuns
  //GET //album
  router.get('/', async (req, res) => {
    try {
      const albums = await Album.find().exec();
      res.json(albums);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  });
  

  //Retornar um album especifico
  //GET /album/:id
  router.get('/:id', async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: 'Álbum não encontrado' });
      }
      res.json(album);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  });

  //Inserir um novo Album
  //POST /album
  router.post('/', async (req, res) => {
    try {
      const { nome, artista, ano, generos, faixas, lancamento } = req.body;
      
      const album = new Album({
        nome,
        artista,
        ano,
        generos,
        faixas,
        lancamento
      });
      
      const savedAlbum = await album.save();
      
      res.status(201).json(savedAlbum);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  });
  

module.exports = router
