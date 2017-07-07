var express = require('express');
//Importando o controller de usuários
var UsuarioCtrl = require('./controllers/Usuario.controller');
var bodyParser = require('body-parser');

var routes = express();

routes.use(bodyParser.json());

//Definindo as rotas

routes.get('/usuarios', UsuarioCtrl.getAll);
routes.get('/usuario/:id', UsuarioCtrl.get);
routes.post('/usuario', UsuarioCtrl.post);
routes.put('/usuario/:id', UsuarioCtrl.put);
routes.delete('/usuario/:id', UsuarioCtrl.delete);

module.exports = routes;