const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mangasPath = path.join(__dirname, '../data/mangas.json');

//Todas as rotas /mangas irão vir a partir daqui
//GET "/mangas"
//Retornar todos os mangás
router.get('/', (req, res) => {
    let dadosManga = fs.readFileSync(mangasPath);
    res.json(JSON.parse(dadosManga));
})

//Adicionar um novo mangá inserindo os parâmetros
//POST "/mangas/"
router.post('/', (req, res) => {
    const manga = req.body;
    console.log(manga);
  
    if (!manga.nome) {
      return res.status(400).json({
        "Erro": "Insira um nome para o mangá"
      });
    }
    if (!manga.genero) {
      return res.status(400).json({
        "Erro": "Insira um gênero para o mangá"
      });
    }
    if (!manga.ano) {
      return res.status(400).json({
        "Erro": "Informe o ano de lançamento do mangá"
      });
    }
    if (!manga.autor) {
      return res.status(400).json({
        "Erro": "Indique o autor da obra"
      });
    }
  
    fs.readFile(mangasPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Erro ao ler o arquivo de mangás.');
      }
  
      let mangas = JSON.parse(data);
      mangas.push(manga);
  
      fs.writeFile(mangasPath, JSON.stringify(mangas, null, 2), 'utf8', (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Erro ao salvar o novo mangá.');
        }
  
        console.log("Arquivo salvo com sucesso!");
        res.status(200).send(manga);
      });
    });
  });

//Substitui os dados de um mangá (PUT)
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const novosDados = req.body;
  
    fs.readFile(mangasPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Erro ao ler o arquivo de mangás.');
      }
  
      let mangas = JSON.parse(data);
  
      if (id < 0 || id >= mangas.length) {
        return res.status(404).json({
          "Erro 404": "O mangá não foi encontrado."
        });
      }
  
      const mangaDesejado = mangas[id];
  
      if (!novosDados.nome) {
        return res.status(400).json({
          "Erro": "O mangá precisa ter um 'nome'."
        });
      }
      if (!novosDados.genero) {
        return res.status(400).json({
          "Erro": "Especifique o gênero do mangá!"
        });
      }
      if (!novosDados.ano) {
        return res.status(400).json({
          "Erro": "Informe o ano de lançamento do mangá!"
        });
      }
      if (!novosDados.autor) {
        return res.status(400).json({
          "Erro": "Indique o autor da obra!"
        });
      }
  
      mangas[id] = novosDados;
  
      fs.writeFile(mangasPath, JSON.stringify(mangas, null, 2), 'utf8', (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Erro ao salvar as alterações do mangá.');
        }
  
        return res.json(novosDados);
      });
    });
  });


//Deletar um mangá (DELETE)
router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    fs.readFile(mangasPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Erro ao ler o arquivo de mangás.');
      }
  
      let mangas = JSON.parse(data);
  
      if (id < 0 || id >= mangas.length) {
        return res.status(404).json({
          "Erro 404": "O mangá não foi encontrado!"
        });
      }
  
      const mangaDeletado = mangas.splice(id, 1);
  
      fs.writeFile(mangasPath, JSON.stringify(mangas, null, 2), 'utf8', (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Erro ao salvar as alterações do mangá.');
        }
  
        console.log("Deletado com sucesso!");
        return res.json(mangaDeletado);
      });
    });
  });
  

module.exports = router