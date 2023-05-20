const express = require('express');
const routes = require('./api/routes');

const app = express();
const PORTA = 8080;

app.use(function(req, res, next){ //
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
   }); //

app.use('/api', routes)


app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
})