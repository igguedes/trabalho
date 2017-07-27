var express = require('express');
//Importando o controller de usuários
var UsuarioCtrl = require('./controllers/Usuario.controller');
var AutenticacaoCtrl = require('./controllers/Autenticacao.controller');
var bodyParser = require('body-parser');

var routes = express();

routes.use(bodyParser.json());

//Definindo as rotas

//routes.get('/usuarios', AutenticacaoCtrl.verificarCredenciais, UsuarioCtrl.getAll);
routes.get('/usuarios', AutenticacaoCtrl.verificarCredenciais, function(req, res){
	res.send('teste');
});
routes.get('/usuario/:id', UsuarioCtrl.get);
routes.post('/usuario', UsuarioCtrl.criaUsuario);
routes.post('/login',UsuarioCtrl.login);
routes.put('/usuario/:id', UsuarioCtrl.put);
routes.delete('/usuario/:id', UsuarioCtrl.delete);

module.exports = routes;